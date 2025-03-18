import React, {useEffect, useRef, useState} from 'react';
import {useAuth0} from '@auth0/auth0-react';
import {ChatContainerProps, ChatPayload, MessageHandlerConfig} from "../../types/chat.ts";
import {ApiChatMessage, ChatService, ClientChatMessage} from "../../services/ChatService.ts";
import {useNotification} from "../../context/useNotification.ts";
import {Message} from "../Message/Message.tsx";
import {ChatInput} from "../ChatInput/ChatInput.tsx";
import {ToolService} from "../../services/ToolService.ts";

export const ChatContainer: React.FC<ChatContainerProps> = ({
                                                                modelSettings,
                                                                selectedChatId
                                                            }) => {
    const { addNotification } = useNotification();
    const [messages, setMessages] = useState<ClientChatMessage[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const [chatUuid, setChatUuid] = useState<string | null>(null);
    const [selectedTools, setSelectedTools] = useState<string[]>([]);
    const [selectedProvider, setSelectedProvider] = useState<string | null>(null);
    const [selectedModelId, setSelectedModelId] = useState<string | null>(null);
    const { isAuthenticated, loginWithRedirect } = useAuth0();
    const { getAccessTokenSilently } = useAuth0();
    const [useStreaming, setUseStreaming] = useState(true);
    const [availableTools, setAvailableTools] = useState<string[]>([]);

    const handleStreamingChange = (value: boolean) => {
        setUseStreaming(value);
    };

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
        const loadTools = async () => {
            try {
                const token = await getAccessTokenSilently();
                const toolService = new ToolService(token);
                const response = await toolService.getTools();

                if (response.error) {
                    console.error('Error loading tools:', response.error);
                    addNotification(
                        'error',
                        typeof response.error === 'object' && true && 'message' in response.error
                            ? response.error
                            : 'Failed to send message'
                    );
                    return;
                }

                if (response.data) {
                    setAvailableTools(response.data.map(tool => tool.name));
                }
            } catch (error) {
                console.error('Error fetching tools:', error);
                addNotification(
                    'error',
                    error instanceof Error ? error.message : 'Failed to send message'
                );
            }
        };

        loadTools();
    }, [getAccessTokenSilently]);


    useEffect(() => {
        const loadChatHistory = async () => {
            if (!selectedChatId) {
                setMessages([]); // Clear messages for new chat
                setChatUuid(null);
                return;
            }

            try {
                const token = await getAccessTokenSilently();
                const chatService = new ChatService(token);
                const response = await chatService.loadChatHistory(selectedChatId);

                if (response.error) {
                    console.error('Error loading chat history:', response.error);
                    return;
                }

                if (response.data) {
                    const formattedMessages = response.data.messages.map((msg: ApiChatMessage): ClientChatMessage => ({
                        content: msg.Text,
                        isUser: msg.IsUser
                    }));

                    setMessages(formattedMessages);
                    setChatUuid(selectedChatId);
                }
            } catch (error) {
                console.error('Error loading chat history:', error);
            }
        };

        loadChatHistory();
    }, [selectedChatId, getAccessTokenSilently]);


    if (!isAuthenticated) {
        return (
            <div className="flex flex-col items-center justify-center h-full">
                <h2 className="text-xl mb-4">Please log in to use the chat</h2>
                <button
                    onClick={() => loginWithRedirect()}
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                >
                    Log In
                </button>
            </div>
        );
    }

    const handleMessageSubmit = async (
        message: string,
        config: MessageHandlerConfig
    ) => {
        setIsLoading(true);

        // Add user message
        const newMessage: ClientChatMessage = {
            content: message,
            isUser: true
        };
        setMessages(prev => [...prev, newMessage]);

        try {
            const token = await getAccessTokenSilently();
            const chatService = new ChatService(token);

            const payload: ChatPayload = {
                question: message,
                selectedTools,
                modelSettings,
                ...(config.streamResponse && config.streamSettings && {
                    stream_settings: {
                        chunk_size: config.streamSettings.chunkSize,
                        delay_ms: config.streamSettings.delayMs
                    }
                }),
                ...(chatUuid && { chat_uuid: chatUuid }),
                ...(selectedProvider && selectedModelId && {
                    llmProvider: {
                        provider: selectedProvider,
                        modelId: selectedModelId
                    }
                })
            };

            if (config.streamResponse) {
                await handleStreamingResponse(chatService, payload);
            } else {
                await handleSyncResponse(chatService, payload);
            }
        } catch (error) {
            addNotification(
                'error',
                error instanceof Error ? error.message : 'Failed to send message'
            );
        } finally {
            setIsLoading(false);
        }
    };

    const handleStreamingResponse = async (
        chatService: ChatService,
        payload: ChatPayload
    ) => {
        // Initialize empty assistant message
        const assistantMessage: ClientChatMessage = {
            content: '',
            isUser: false
        };
        setMessages(prev => [...prev, assistantMessage]);

        let accumulatedContent = '';

        await chatService.sendStreamMessage(
            payload,
            (chunk) => {
                if (!chunk.done) {
                    accumulatedContent += chunk.content;
                    setMessages(prev => {
                        const newMessages = [...prev];
                        const lastMessage = newMessages[newMessages.length - 1];
                        if (!lastMessage.isUser) {
                            newMessages[newMessages.length - 1] = {
                                ...lastMessage,
                                content: accumulatedContent
                            };
                        }
                        return newMessages;
                    });
                }
            }
        );
    };

    const handleSyncResponse = async (
        chatService: ChatService,
        payload: ChatPayload
    ) => {
        const data = await chatService.sendMessage(payload);

        if (data.data.chat_uuid && !chatUuid) {
            setChatUuid(data.data.chat_uuid);
        }

        setMessages(prev => [...prev, {
            content: data.data.answer,
            isUser: false
        }]);
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
                useStreaming={useStreaming}
                onStreamingChange={handleStreamingChange}
                availableTools={availableTools}
            />
        </div>
    );
};
