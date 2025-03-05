import React from 'react';
import { CiStreamOn, CiStreamOff } from "react-icons/ci";

// or alternatively:
// import { TbPlugConnected, TbPlugConnectedX } from 'react-icons/tb';

interface StreamingToggleProps {
    isStreaming: boolean;
    onToggle: (value: boolean) => void;
}

export const StreamingToggle: React.FC<StreamingToggleProps> = ({ isStreaming, onToggle }) => {
    return (
        <button
            onClick={() => onToggle(!isStreaming)}
            className={`p-2 rounded-lg transition-colors duration-200 ${
                isStreaming ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'
            } hover:bg-blue-50`}
            title={isStreaming ? "Streaming responses enabled" : "Streaming responses disabled"}
        >
            {isStreaming ? (
                <CiStreamOn size={24} />
            ) : (
                <CiStreamOff size={24} />
            )}
        </button>
    );
};