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

interface StreamSettings {
    chunk_size: number;
    delay_ms: number;
}

export interface ChatPayload {
    question: string;
    selectedTools: string[];
    modelSettings: ModelSettings;
    chat_uuid?: string;
    llmProvider?: LLMProvider;
    stream_settings?: StreamSettings;
}
