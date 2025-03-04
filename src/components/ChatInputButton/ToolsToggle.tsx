import React, {useState} from 'react';
import {WrenchScrewdriverIcon} from "@heroicons/react/16/solid";
import {ToolsModal} from "./ToolsModal.tsx";

interface ToolsToggleButtonProps {
    selectedTools: string[];
    onToolsChange: (tools: string[]) => void;
}

export const ToolsToggle: React.FC<ToolsToggleButtonProps> = ({
                                                                  selectedTools = [], // Provide default empty array
                                                                  onToolsChange
                                                              }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleSaveTools = (tools: string[]) => {
        onToolsChange(tools);
    };

    return (
        <>
            <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className={`px-3 py-1.5 text-sm rounded-lg transition-colors duration-200 w-fit flex items-center gap-2 ${
                    selectedTools.length > 0
                        ? 'bg-gray-800 text-white hover:bg-gray-700'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
            >
                <WrenchScrewdriverIcon className="h-4 w-4" />
                Tools {selectedTools.length > 0 ? `(${selectedTools.length})` : 'Disabled'}
            </button>

            <ToolsModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSaveTools}
                initialSelectedTools={selectedTools}
            />
        </>
    );
};