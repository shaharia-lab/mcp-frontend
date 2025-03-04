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


// Updated ChatService
export class ChatService extends APIClient {
    constructor(token: string = '') {
        super(import.meta.env.VITE_MCP_BACKEND_API_ENDPOINT, token);
    }

    async getChatHistories(): Promise<APIResponse<ChatHistory[]>> {
        return this.fetchWithError<ChatHistory[]>('/chats');
    }

    async sendMessage(payload: ChatPayload): Promise<APIResponse<ChatResponse>> {
        return this.fetchWithError<ChatResponse>('/ask', {
            method: 'POST',
            body: JSON.stringify(payload),
        });
    }

    async loadChatHistory(chatId: string): Promise<APIResponse<{ messages: ApiChatMessage[] }>> {
        return this.fetchWithError<{ messages: ApiChatMessage[] }>(`/chats/${chatId}`);
    }
}
