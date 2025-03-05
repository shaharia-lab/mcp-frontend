import React, {useEffect, useMemo, useState} from 'react';
import {XMarkIcon} from "@heroicons/react/24/outline";
import {Tool, ToolsModalProps} from "../../types/tools.ts";
import {SearchBar} from "../SearchBar.tsx";
import {fetchTools} from "../../api";
import {ToolItem} from "../ToolItem/ToolItem.tsx";

export const ToolsModal: React.FC<ToolsModalProps> = ({
                                                          isOpen,
                                                          onClose,
                                                          onSave,
                                                          initialSelectedTools
                                                      }) => {
    const [tools, setTools] = useState<Tool[]>([]);
    const [selectedTools, setSelectedTools] = useState<string[]>(initialSelectedTools);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const loadTools = async () => {
            try {
                const data = await fetchTools();
                setTools(data);
            } catch (error) {
                console.error('Error fetching tools:', error);
            }
        };

        if (isOpen) {
            loadTools();
        }
    }, [isOpen]);


    const handleToolToggle = (toolName: string) => {
        setSelectedTools(prev =>
            prev.includes(toolName)
                ? prev.filter(name => name !== toolName)
                : [...prev, toolName]
        );
    };

    const filteredAndSortedTools = useMemo(() => {
        return tools
            .filter(tool =>
                tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                tool.description.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .sort((a, b) => a.name.localeCompare(b.name));
    }, [tools, searchQuery]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-5xl p-6"> {/* Increased max width */}
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold text-gray-800">Available Tools</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 transition-colors"
                    >
                        <XMarkIcon className="h-6 w-6" />
                    </button>
                </div>

                <SearchBar value={searchQuery} onChange={setSearchQuery} />

                <div className="max-h-[50vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
                    <div className="grid grid-cols-3 gap-4"> {/* New grid layout */}
                        {filteredAndSortedTools.map((tool) => (
                            <ToolItem
                                key={tool.name}
                                tool={tool}
                                isSelected={selectedTools.includes(tool.name)}
                                onToggle={handleToolToggle}
                            />
                        ))}
                    </div>
                </div>

                <div className="mt-6 flex justify-end space-x-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => {
                            onSave(selectedTools);
                            onClose();
                        }}
                        className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};