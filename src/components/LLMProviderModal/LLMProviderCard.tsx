import React from 'react';
import {Provider} from '../../types/llm';

interface LLMProviderCardProps {
    provider: Provider;
    selectedModelId: string | null;
    onModelSelect: (modelId: string) => void;
}

export const LLMProviderCard: React.FC<LLMProviderCardProps> = ({
                                                                    provider,
                                                                    selectedModelId,
                                                                    onModelSelect,
                                                                }) => {
    return (
        <div className="bg-white shadow-sm rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-3 text-gray-800">{provider.name}</h3>
            <div className="space-y-2">
                {provider.models.map((model) => (
                    <div
                        key={model.modelId}
                        className={`p-3 rounded-lg cursor-pointer transition-all ${
                            selectedModelId === model.modelId
                                ? 'bg-blue-50 ring-2 ring-blue-500'
                                : 'hover:bg-gray-50'
                        }`}
                        onClick={() => onModelSelect(model.modelId)}
                    >
                        <div className="flex items-center justify-between">
                            <h4 className="font-medium text-gray-900">{model.name}</h4>
                            <div className={`w-4 h-4 rounded-full ${
                                selectedModelId === model.modelId
                                    ? 'bg-blue-500'
                                    : 'border-2 border-gray-300'
                            }`} />
                        </div>
                        {model.description && (
                            <p className="mt-1 text-sm text-gray-600">{model.description}</p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};