import React from 'react';

interface NewChatSectionProps {
    onChatSelect: (chatId: string) => void;
}

export const NewChatSection: React.FC<NewChatSectionProps> = ({ onChatSelect }) => {
    return (
        <div className="p-4 flex-shrink-0">
            <div className="border-b pb-4">
                <h3 className="text-sm font-semibold text-gray-500 mb-2">Recent Chats</h3>
                <ul className="space-y-2">
                    <li
                        className="hover:bg-gray-50 p-2 rounded cursor-pointer"
                        onClick={() => onChatSelect('')}
                    >
                        <div className="text-sm font-medium">New Chat</div>
                        <div className="text-xs text-gray-500">Start a new conversation</div>
                    </li>
                </ul>
            </div>
        </div>
    );
};