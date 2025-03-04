// components/sidebar/ChatHistoryList.tsx
import React from 'react';
import {ChatHistory} from "../../types";

interface ChatHistoryListProps {
    isLoading: boolean;
    error: string | null;
    chatHistories: ChatHistory[];
    selectedChatId?: string;
    onChatSelect?: (chatId: string) => void;
    getFirstMessage: (chat: ChatHistory) => string;
    formatDate: (dateString: string) => string;
}

export const ChatHistoryList: React.FC<ChatHistoryListProps> = ({
                                                                    isLoading,
                                                                    error,
                                                                    chatHistories = [],
                                                                    selectedChatId,
                                                                    onChatSelect,
                                                                    getFirstMessage,
                                                                    formatDate
                                                                }) => {
    return (
        <div className="flex-1 min-h-0 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            <div className="p-4">
                <h3 className="text-sm font-semibold text-gray-500 mb-2">Saved Chats</h3>
                {isLoading ? (
                    <div className="text-sm text-gray-400 italic p-2">
                        Loading...
                    </div>
                ) : error ? (
                    <div className="text-sm text-red-500 italic p-2">
                        {error}
                    </div>
                ) : (
                    <ul className="space-y-2">
                        {chatHistories.map((chat) => (
                            <li
                                key={chat.uuid}
                                className={`p-2 rounded cursor-pointer ${
                                    selectedChatId === chat.uuid
                                        ? 'hover:bg-blue-100'
                                        : 'hover:bg-gray-50'
                                }`}
                                onClick={() => onChatSelect?.(chat.uuid)}
                            >
                                <div className="text-sm font-medium">
                                    {getFirstMessage(chat)}
                                </div>
                                <div className="text-xs text-gray-500">
                                    {formatDate(chat.created_at)}
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};