import React, {useState, useRef, useEffect} from 'react';
import {chatService} from "../services/chatService.ts";
import {Message} from "./Message/Message.tsx";
import {ChatInput} from "./ChatInput.tsx";
import { ChatPayload } from '../types/chat';
import {useNotification} from "../context/NotificationContext.tsx";

interface ModelSettings {
    temperature: number;
    maxTokens: number;
    topP: number;
    topK: number;
}

interface ChatMessage {
    content: string;
    isUser: boolean;
}

interface ChatContainerProps {
    selectedTools: string[];
    modelSettings: ModelSettings;
    selectedChatId?: string; // Add this prop
}


export const ChatContainer: React.FC<ChatContainerProps> = ({
                                                                modelSettings,
                                                                selectedChatId
                                                            }) => {
    const { addNotification } = useNotification();
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const [chatUuid, setChatUuid] = useState<string | null>(null);
    const [selectedTools, setSelectedTools] = useState<string[]>([]);
    const [selectedProvider, setSelectedProvider] = useState<string | null>(null);
    const [selectedModelId, setSelectedModelId] = useState<string | null>(null);

    const handleProviderChange = (provider: string, modelId: string) => {
        setSelectedProvider(provider);
        setSelectedModelId(modelId);
    };



    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isLoading]);

    useEffect(() => {
        const loadChatHistory = async () => {
            if (!selectedChatId) {
                setMessages([]); // Clear messages for new chat
                setChatUuid(null);
                return;
            }

            try {
                const data = await chatService.loadChatHistory(selectedChatId);
                const formattedMessages = data.messages.map((msg: any) => ({
                    content: msg.Text,
                    isUser: msg.IsUser
                }));

                setMessages(formattedMessages);
                setChatUuid(selectedChatId);
            } catch (error) {
                console.error('Error loading chat history:', error);
            }
        };

        loadChatHistory();
    }, [selectedChatId]);

    const handleMessageSubmit = async (message: string) => {
        setIsLoading(true);

        const newMessage: ChatMessage = {
            content: message,
            isUser: true
        };

        setMessages(prev => [...prev, newMessage]);

        try {
            const payload: ChatPayload = {
                question: message,
                selectedTools,
                modelSettings,
                ...(chatUuid && { chat_uuid: chatUuid }),
                ...(selectedProvider && selectedModelId && {
                    llmProvider: {
                        provider: selectedProvider,
                        modelId: selectedModelId
                    }
                })
            };

            const data = await chatService.sendMessage(payload);

            if (data.chat_uuid && !chatUuid) {
                setChatUuid(data.chat_uuid);
            }

            setMessages(prev => [...prev, { content: data.answer, isUser: false }]);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Sorry, there was an error processing your request.";
            addNotification('error', errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-6xl mx-auto chat-container overflow-hidden flex flex-col h-full">
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 hover:scrollbar-thumb-gray-400">
            {messages.map((message, index) => (
                    <Message
                        key={index}
                        content={message.content}
                        isUser={message.isUser}
                    />
                ))}
                {isLoading && (
                    <div className="flex items-center justify-center p-4">
                        <div className="animate-pulse text-gray-500">
                            Processing...
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>
            <ChatInput
                onSubmit={handleMessageSubmit}
                isLoading={isLoading}
                selectedTools={selectedTools}
                onToolsChange={setSelectedTools}
                selectedProvider={selectedProvider}
                selectedModelId={selectedModelId}
                onProviderChange={handleProviderChange}
            />

        </div>
    );
};
