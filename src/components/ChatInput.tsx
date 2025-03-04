import React, {KeyboardEvent, useState} from 'react';
import {ToolsToggle} from './ChatInputButton/ToolsToggle.tsx';
import {LLMProviderToggle} from "./LLMProviderToggle.tsx";

interface ChatInputProps {
    onSubmit: (message: string) => Promise<void>;
    isLoading: boolean;
    selectedTools: string[];
    onToolsChange: (tools: string[]) => void;
    selectedProvider: string | null;
    selectedModelId: string | null;
    onProviderChange: (provider: string, modelId: string) => void;
}

export const ChatInput: React.FC<ChatInputProps> = ({
                                                        onSubmit,
                                                        isLoading,
                                                        selectedTools,
                                                        onToolsChange,
                                                        selectedProvider,    // Add this
                                                        selectedModelId,     // Add this
                                                        onProviderChange    // Add this
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

        await onSubmit(inputValue);
        setInputValue('');
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200">
            <div className="flex flex-col gap-2">
                <div className="flex gap-2">
                    <ToolsToggle
                        selectedTools={selectedTools}
                        onToolsChange={onToolsChange}
                    />

                    <LLMProviderToggle
                        selectedProvider={selectedProvider}
                        selectedModelId={selectedModelId}
                        onProviderChange={onProviderChange}
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