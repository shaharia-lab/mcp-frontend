// components/SearchBar.tsx
import React from 'react';

interface SearchBarProps {
    value: string;
    onChange: (value: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => {
    return (
        <div className="mb-4">
            <input
                type="text"
                placeholder="Search tools..."
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
        </div>
    );
};