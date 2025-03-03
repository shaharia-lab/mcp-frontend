export interface ModelSettings {
    temperature: number;
    maxTokens: number;
    topP: number;
    topK: number;
}

export interface LLMProvider {
    provider: string;
    modelId: string;
}

export interface ChatPayload {
    question: string;
    selectedTools: string[];
    modelSettings: ModelSettings;
    chat_uuid?: string;
    llmProvider?: LLMProvider;
}
