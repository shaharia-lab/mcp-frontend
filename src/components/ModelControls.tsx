import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

interface ModelSettings {
    temperature: number;
    maxTokens: number;
    topP: number;
    topK: number;
}

const defaultSettings: ModelSettings = {
    temperature: 0.7,
    maxTokens: 2000,
    topP: 0.5,
    topK: 40
};

interface ModelControlsProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (settings: ModelSettings) => void;
    initialSettings: ModelSettings;
}

export const ModelControls: React.FC<ModelControlsProps> = ({
                                                                isOpen,
                                                                onClose,
                                                                onSave,
                                                                initialSettings = defaultSettings
                                                            }) => {
    const { isAuthenticated } = useAuth0();
    const [temperature, setTemperature] = useState(initialSettings.temperature);
    const [maxTokens, setMaxTokens] = useState(initialSettings.maxTokens);
    const [topP, setTopP] = useState(initialSettings.topP);
    const [topK, setTopK] = useState(initialSettings.topK);

    const handleSave = () => {
        onSave({
            temperature,
            maxTokens,
            topP,
            topK
        });
    };

    return (
        <div
            className={`fixed top-0 right-0 h-full w-[260px] bg-white shadow-lg z-40 transition-transform duration-300 ${
                isOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
        >
            <div className="p-4">
                <button
                    onClick={onClose}
                    className="float-right p-2 hover:bg-gray-100 rounded"
                >
                    ✕
                </button>
                <h2 className="text-lg font-bold mb-4">Model Controls</h2>

                {isAuthenticated ? (
                    <>
                        {/* Temperature Control */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Temperature: {temperature}
                            </label>
                            <input
                                type="range"
                                min="0"
                                max="2"
                                step="0.1"
                                value={temperature}
                                onChange={(e) => setTemperature(parseFloat(e.target.value))}
                                className="w-full"
                            />
                            <div className="flex justify-between text-xs text-gray-500">
                                <span>Precise</span>
                                <span>Balanced</span>
                                <span>Creative</span>
                            </div>
                        </div>

                        {/* Max Tokens Control */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Max Tokens: {maxTokens}
                            </label>
                            <input
                                type="range"
                                min="50"
                                max="50000"
                                step="50"
                                value={maxTokens}
                                onChange={(e) => setMaxTokens(parseInt(e.target.value))}
                                className="w-full"
                            />
                        </div>

                        {/* TopP Control */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                TopP: {topP}
                            </label>
                            <input
                                type="range"
                                min="0"
                                max="1"
                                step="0.1"
                                value={topP}
                                onChange={(e) => setTopP(parseFloat(e.target.value))}
                                className="w-full"
                            />
                        </div>

                        {/* TopK Control */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                TopK: {topK}
                            </label>
                            <input
                                type="range"
                                min="1"
                                max="100"
                                step="1"
                                value={topK}
                                onChange={(e) => setTopK(parseInt(e.target.value))}
                                className="w-full"
                            />
                        </div>

                        {/* Save Button */}
                        <button
                            onClick={handleSave}
                            className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
                        >
                            Save Settings
                        </button>
                    </>
                ) : (
                    <div className="flex-1 flex items-center justify-center p-4 text-center text-gray-500">
                        Please log in to access model controls
                    </div>
                )}
            </div>
        </div>
    );
};