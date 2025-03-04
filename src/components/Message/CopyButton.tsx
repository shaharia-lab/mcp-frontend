// components/CopyButton.tsx
import React, {useState} from 'react';
import {ClipboardDocumentIcon} from "@heroicons/react/16/solid";
import {CopyService} from "../../utils/copyService.ts";

interface CopyButtonProps {
    textToCopy: string;
    // Optional callback for parent components to handle copy success/failure
    onCopyComplete?: (success: boolean) => void;
}

export const CopyButton: React.FC<CopyButtonProps> = ({
                                                          textToCopy,
                                                          onCopyComplete
                                                      }) => {
    const [isCopying, setIsCopying] = useState(false);

    const handleCopy = async () => {
        if (isCopying) return;

        setIsCopying(true);
        const success = await CopyService.copyToClipboard(textToCopy);

        if (onCopyComplete) {
            onCopyComplete(success);
        }

        setIsCopying(false);
    };

    return (
        <button
            onClick={handleCopy}
            disabled={isCopying}
            className={`copy-button text-gray-500 hover:text-gray-700 ${
                isCopying ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            title="Copy message"
        >
            <ClipboardDocumentIcon className="h-5 w-5" />
        </button>
    );
};