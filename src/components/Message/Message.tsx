// components/Message.tsx
import React from 'react';
import {MessageHeader} from "./MessageHeader.tsx";
import {MessageContent} from "./MessageContent.tsx";

interface MessageProps {
    content: string;
    isUser: boolean;
}

export const Message: React.FC<MessageProps> = ({ content, isUser }) => {
    return (
        <div
            className={`message p-4 rounded-lg ${
                isUser ? 'bg-lime-100' : 'bg-gray-100'
            }`}
            data-message-user={isUser}
            data-message-assistant={!isUser}
        >
            <MessageHeader
                isUser={isUser}
                content={content}
            />
            <MessageContent content={content} />
        </div>
    );
};