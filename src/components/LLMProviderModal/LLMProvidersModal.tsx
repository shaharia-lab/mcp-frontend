import React, {useEffect, useState} from 'react';
import {XMarkIcon} from "@heroicons/react/24/outline";
import {LLMProvidersModalProps, Provider} from '../../types/llm';
import {LLMProviderCard} from './LLMProviderCard';
import {useAuth0} from "@auth0/auth0-react";
import {LLMService} from "../../services/LLMService.ts";

export const LLMProvidersModal: React.FC<LLMProvidersModalProps> = ({
                                                                        isOpen,
                                                                        onClose,
                                                                        onSave,
                                                                        initialModelId,
                                                                    }) => {
    const { getAccessTokenSilently } = useAuth0();
    const [providers, setProviders] = useState<Provider[]>([]);
    const [selectedModelId, setSelectedModelId] = useState<string | null>(initialModelId || null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProviders = async () => {
            if (!isOpen) return;

            setIsLoading(true);
            setError(null);
            try {
                const token = await getAccessTokenSilently();
                const llmService = new LLMService(token);

                const response = await llmService.getLLMProviders();

                if (response.error) {
                    setError(response.error);
                    setProviders([]);
                    return;
                }

                if (!response.data) {
                    setError('No LLM provider found server');
                    setProviders([]);
                    return;
                }

                setProviders(response.data.providers);
            } catch (err) {
                const errorMessage = err instanceof Error ? err.message : 'Failed to load LLM providers';
                setError(errorMessage);
                console.error('Error fetching providers:', err);
                setProviders([]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProviders();
    }, [isOpen, getAccessTokenSilently]);

    const handleSave = () => {
        if (!selectedModelId) return;

        const selectedProvider = providers.find(provider =>
            provider.models.some(model => model.modelId === selectedModelId)
        );

        if (selectedProvider) {
            onSave(selectedProvider.name, selectedModelId);
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-gray-50 rounded-xl shadow-xl w-full max-w-6xl p-6 max-h-[90vh] overflow-hidden flex flex-col">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h2 className="text-2xl font-semibold text-gray-800">Select LLM Provider</h2>
                        <p className="text-gray-600 mt-1">Choose a provider and model for your chat</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 transition-colors"
                    >
                        <XMarkIcon className="h-6 w-6" />
                    </button>
                </div>

                {isLoading ? (
                    <div className="flex items-center justify-center py-8">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
                    </div>
                ) : error ? (
                    <div className="text-red-500 text-center py-8">{error}</div>
                ) : (
                    <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
                        <div className="grid grid-cols-2 gap-6 p-2">
                            {providers.map((provider) => (
                                <LLMProviderCard
                                    key={provider.name}
                                    provider={provider}
                                    selectedModelId={selectedModelId}
                                    onModelSelect={setSelectedModelId}
                                />
                            ))}
                        </div>
                    </div>
                )}

                <div className="mt-6 flex justify-end space-x-4">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-gray-600 hover:text-gray-800"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={!selectedModelId}
                        className={`px-4 py-2 rounded-md ${
                            selectedModelId
                                ? 'bg-blue-600 text-white hover:bg-blue-700'
                                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};