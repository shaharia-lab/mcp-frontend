import {ChatHistory} from "../types";
import {APIClient, APIResponse} from "./APIClient.ts";

export class ChatService extends APIClient {
    constructor(token: string = '') {
        super(import.meta.env.VITE_MCP_BACKEND_API_ENDPOINT, token);
    }

    async getChatHistories(): Promise<APIResponse<ChatHistory[]>> {
        return this.fetchWithError<ChatHistory[]>('/chats');
    }
}