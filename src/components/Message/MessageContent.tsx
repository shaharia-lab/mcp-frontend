// components/message/MessageContent.tsx
import React, {useEffect, useState} from 'react';
import {ContentParser} from "../../utils/contentParser";

interface MessageContentProps {
    content: string;
}

export const MessageContent: React.FC<MessageContentProps> = ({ content }) => {
    const [sanitizedContent, setSanitizedContent] = useState<string>('');

    useEffect(() => {
        const parseContent = async () => {
            const parsed = await ContentParser.parse(content);
            setSanitizedContent(parsed);
        };

        parseContent();
    }, [content]);

    return (
        <div className="message-content">
            <div
                className="prose max-w-none"
                dangerouslySetInnerHTML={{ __html: sanitizedContent }}
            />
        </div>
    );
};