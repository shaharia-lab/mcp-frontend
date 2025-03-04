import React from 'react';
import {CopyButton} from './CopyButton';

interface HeaderProps {
    isUser: boolean;
    content: string; // Changed from onCopy to content
}

export const MessageHeader: React.FC<HeaderProps> = ({
                                                  isUser,
                                                  content
                                              }) => {
    return (
        <div className="flex justify-between items-start mb-2">
            <div className="font-medium">
                {isUser ? 'You' : 'Assistant'}
            </div>
            {!isUser && <CopyButton textToCopy={content} />}
        </div>
    );
};