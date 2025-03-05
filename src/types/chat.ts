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

export interface ModelSettings {
    temperature: number;
    maxTokens: number;
    topP: number;
    topK: number;
}

export interface ChatContainerProps {
    selectedTools: string[];
    modelSettings: ModelSettings;
    selectedChatId?: string; // Add this prop
}

export interface MessageHandlerConfig {
    streamResponse: boolean;
    streamSettings?: {
        chunkSize: number;
        delayMs: number;
    };
}
