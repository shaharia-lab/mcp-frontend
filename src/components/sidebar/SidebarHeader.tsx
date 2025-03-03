import React from 'react';

interface SidebarHeaderProps {
    onClose: () => void;
}

export const SidebarHeader: React.FC<SidebarHeaderProps> = ({ onClose }) => {
    return (
        <div className="p-4 flex-shrink-0">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">Chat History</h2>
                <button
                    onClick={onClose}
                    className="p-2 hover:bg-gray-100 rounded"
                    aria-label="Close sidebar"
                >
                    ✕
                </button>
            </div>
        </div>
    );
};