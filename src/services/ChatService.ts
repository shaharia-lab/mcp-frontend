import {ChatHistory} from "../types";
import {APIClient, APIResponse} from "./APIClient.ts";
import {ChatPayload} from "../types/chat.ts";

export interface ChatResponse {
    chat_uuid: string;
    answer: string;
    input_token: number;
    output_token: number;
}

export interface ApiChatMessage {
    Text: string;
    IsUser: boolean;
}

export interface ClientChatMessage {
    content: string;
    isUser: boolean;
}

interface StreamChunk {
    content: string;
    meta_key?: string;
    done?: boolean;
}

interface ChatHistoriesResponse {
    chats: ChatHistory[];
}

// Updated ChatService
export class ChatService extends APIClient {
    constructor(token: string = '') {
        super(import.meta.env.VITE_MCP_BACKEND_API_ENDPOINT, token);
    }

    async getChatHistories(): Promise<APIResponse<ChatHistoriesResponse>> {
        return this.fetchWithError<ChatHistoriesResponse>('/api/v1/chats');
    }

    async sendMessage(payload: ChatPayload): Promise<APIResponse<ChatResponse>> {
        return this.fetchWithError<ChatResponse>('/api/v1/chats', {
            method: 'POST',
            body: JSON.stringify(payload),
        });
    }

    async loadChatHistory(chatId: string): Promise<APIResponse<{ messages: ApiChatMessage[] }>> {
        return this.fetchWithError<{ messages: ApiChatMessage[] }>(`/api/v1/chats/${chatId}`);
    }

    async sendStreamMessage(
        payload: ChatPayload,
        onChunk: (chunk: StreamChunk) => void,
        onHeaderChatUuid?: (chatUuid: string) => void
    ): Promise<void> {
        try {
            const response = await this.fetchStream('/api/v1/chats/stream', {
                method: 'POST',
                body: JSON.stringify(payload),
            });

            //const chatUuid = response.headers.get('X-Chat-Uuid');
            // Debug: Log all available headers
            console.log('All response headers:');
            response.headers.forEach((value, name) => {
                console.log(`${name}: ${value}`);
            });

            // Try both casing variants
            const chatUuid = response.headers.get('X-MKit-Chat-UUID');

            if (chatUuid && onHeaderChatUuid) {
                onHeaderChatUuid(chatUuid);
            }


            const reader = response.body?.getReader();
            if (!reader) {
                throw new Error('Response body is not readable');
            }

            const decoder = new TextDecoder();
            let buffer = '';

            try {
                while (true) {
                    const { done, value } = await reader.read();
                    if (done) break;

                    buffer += decoder.decode(value, { stream: true });

                    const lines = buffer.split('\n');
                    buffer = lines.pop() || '';

                    for (const line of lines) {
                        if (line.trim()) {
                            try {
                                const parsed = JSON.parse(line) as StreamChunk;
                                onChunk(parsed);
                                if (parsed.done) {
                                    return; // Exit early if we receive done flag
                                }
                            } catch (e) {
                                console.error('Failed to parse chunk:', e);
                            }
                        }
                    }
                }

                // Handle any remaining data
                const remaining = decoder.decode();
                if (buffer + remaining) {
                    const finalLine = (buffer + remaining).trim();
                    if (finalLine) {
                        try {
                            const parsed = JSON.parse(finalLine) as StreamChunk;
                            onChunk(parsed);
                        } catch (e) {
                            console.error('Failed to parse final chunk:', e);
                        }
                    }
                }
            } finally {
                reader.releaseLock();
            }
        } catch (error) {
            throw new Error(error instanceof Error ? error.message : 'Unknown error occurred');
        }
    }
}
