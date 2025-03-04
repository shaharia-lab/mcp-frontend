// components/ToolItem.tsx
import React from 'react';
import {Tool} from '../../types/tools';

interface ToolItemProps {
    tool: Tool;
    isSelected: boolean;
    onToggle: (toolName: string) => void;
}

export const ToolItem: React.FC<ToolItemProps> = ({ tool, isSelected, onToggle }) => {
    return (
        <div className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
            <input
                type="checkbox"
                id={tool.name}
                checked={isSelected}
                onChange={() => onToggle(tool.name)}
                className="mt-1 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor={tool.name} className="flex-1 cursor-pointer">
                <div className="font-medium text-gray-900">{tool.name}</div>
                <div className="text-sm text-gray-500">{tool.description}</div>
            </label>
        </div>
    );
};