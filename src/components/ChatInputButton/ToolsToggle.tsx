import React, { useState } from 'react';
import { WrenchScrewdriverIcon } from "@heroicons/react/16/solid";
import { ToolsModal } from "./ToolsModal.tsx";
import { toolIconMappings } from './toolIcons';

interface ToolsToggleButtonProps {
    selectedTools: string[];
    onToolsChange: (tools: string[]) => void;
    availableTools?: string[]; // Add this prop to know all available tools
}

export const ToolsToggle: React.FC<ToolsToggleButtonProps> = ({
                                                                  selectedTools = [],
                                                                  onToolsChange,
                                                                  availableTools = []
                                                              }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleSaveTools = (tools: string[]) => {
        onToolsChange(tools);
    };

    const handleQuickToolToggle = (pattern: string) => {
        // Find the tool mapping for the current pattern
        const toolMapping = toolIconMappings.find(mapping => mapping.pattern === pattern);

        const relatedTools = availableTools.filter(tool => {
            const toolLower = tool.toLowerCase();

            // Use the regex pattern from toolMapping if it exists
            if (toolMapping?.regex) {
                return toolMapping.regex.test(toolLower);
            }

            // Fallback to simple pattern matching if no regex is defined
            const regex = new RegExp(`^${pattern}`, 'i');
            return regex.test(toolLower);
        });

        const allSelected = relatedTools.every(tool => selectedTools.includes(tool));
        if (allSelected) {
            onToolsChange(selectedTools.filter(tool => !relatedTools.includes(tool)));
        } else {
            const newTools = [...new Set([...selectedTools, ...relatedTools])];
            onToolsChange(newTools);
        }
    };


    return (
        <div className="flex items-center gap-2">
            {/* Main tools configuration button */}
            <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                title={selectedTools.length > 0 ? `Selected Tools (${selectedTools.length})` : 'Configure Tools'}
                className={`px-2 py-1 text-sm rounded-lg transition-colors duration-200 w-fit flex items-center gap-2 ${
                    selectedTools.length > 0
                        ? 'bg-gray-800 text-white hover:bg-gray-700'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
            >
                <WrenchScrewdriverIcon className="h-4 w-4" />
            </button>

            <ToolsModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSaveTools}
                initialSelectedTools={selectedTools}
            />

            {/* Quick access tool icons */}
            {toolIconMappings.map(({ pattern, icon: Icon, title, colors }) => {
                // Check if there are any available tools matching this pattern
                const hasMatchingTools = availableTools.some(tool =>
                    tool.toLowerCase().includes(pattern.toLowerCase())
                );

                // Only render the button if matching tools are available
                return hasMatchingTools ? (
                    <button
                        key={pattern}
                        type="button"
                        onClick={() => handleQuickToolToggle(pattern)}
                        title={title}
                        className={`p-1.5 rounded-lg transition-colors duration-200 ${
                            selectedTools.some(tool =>
                                tool.toLowerCase().includes(pattern.toLowerCase())
                            )
                                ? `${colors.bg} ${colors.text} ${colors.hoverBg}`
                                : `bg-gray-400 ${colors.text} ${colors.hoverBg}`
                        }`}
                    >
                        <Icon className="h-4 w-4" />
                    </button>
                ) : null;
            })}
        </div>
    );
};