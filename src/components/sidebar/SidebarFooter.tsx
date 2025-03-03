import React from 'react';
import { ArrowPathIcon, QuestionMarkCircleIcon, Cog6ToothIcon } from '@heroicons/react/24/outline';

interface SidebarFooterProps {
    onRefresh?: () => void;
    onHelp?: () => void;
    onSettings?: () => void;
}

export const SidebarFooter: React.FC<SidebarFooterProps> = ({
                                                                onRefresh,
                                                                onHelp,
                                                                onSettings
                                                            }) => {
    return (
        <div className="p-4 border-t flex-shrink-0">
            <div className="flex space-x-4 justify-center">
                <button
                    className="p-2 hover:bg-gray-100 rounded"
                    aria-label="Refresh"
                    onClick={onRefresh}
                >
                    <ArrowPathIcon className="h-5 w-5 text-gray-500" />
                </button>
                <button
                    className="p-2 hover:bg-gray-100 rounded"
                    aria-label="Help"
                    onClick={onHelp}
                >
                    <QuestionMarkCircleIcon className="h-5 w-5 text-gray-500" />
                </button>
                <button
                    className="p-2 hover:bg-gray-100 rounded"
                    aria-label="Settings"
                    onClick={onSettings}
                >
                    <Cog6ToothIcon className="h-5 w-5 text-gray-500" />
                </button>
            </div>
        </div>
    );
};