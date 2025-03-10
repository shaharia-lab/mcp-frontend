import React, {KeyboardEvent, useState} from 'react';
import {ToolsToggle} from "../ChatInputButton/ToolsToggle.tsx";
import {LLMProviderToggle} from "../ChatInputButton/LLMProviderToggle.tsx";
import {StreamingToggle} from "../ChatInputButton/StreamingToggle.tsx";

interface MessageHandlerConfig {
    streamResponse: boolean;
    streamSettings?: {
        chunkSize: number;
        delayMs: number;
    };
}

interface ChatInputProps {
    onSubmit: (message: string, config: MessageHandlerConfig) => Promise<void>;
    isLoading: boolean;
    selectedTools: string[];
    onToolsChange: (tools: string[]) => void;
    selectedProvider: string | null;
    selectedModelId: string | null;
    onProviderChange: (provider: string, modelId: string) => void;
    useStreaming?: boolean;
    onStreamingChange: (value: boolean) => void;
    availableTools?: string[];
}


export const ChatInput: React.FC<ChatInputProps> = ({
                                                        onSubmit,
                                                        isLoading,
                                                        selectedTools,
                                                        onToolsChange,
                                                        selectedProvider,
                                                        selectedModelId,
                                                        onProviderChange,
                                                        useStreaming = true,
                                                        onStreamingChange,
                                                        availableTools = []
                                                    }) => {
    const [inputValue, setInputValue] = useState('');

    const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputValue.trim() || isLoading) return;

        const config: MessageHandlerConfig = {
            streamResponse: useStreaming,
            ...(useStreaming && {
                streamSettings: {
                    chunkSize: 1,
                    delayMs: 10
                }
            })
        };

        await onSubmit(inputValue, config);
        setInputValue('');
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200">
            <div className="flex flex-col gap-2">
                <div className="flex gap-2 items-center">
                    <LLMProviderToggle
                        selectedProvider={selectedProvider}
                        selectedModelId={selectedModelId}
                        onProviderChange={onProviderChange}
                    />
                    <StreamingToggle
                        isStreaming={useStreaming}
                        onToggle={onStreamingChange}
                    />
                    <div className="w-4" />
                    <ToolsToggle
                        selectedTools={selectedTools}
                        onToolsChange={onToolsChange}
                        availableTools={availableTools}
                    />
                </div>

                <textarea
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Type your message... (Press Enter to send, Shift+Enter for new line)"
                    className="w-full min-h-[80px] p-3 rounded-lg border border-gray-300 focus:border-gray-400 focus:ring-1 focus:ring-gray-400 outline-none resize-none"
                />
            </div>
        </form>
    );
};
