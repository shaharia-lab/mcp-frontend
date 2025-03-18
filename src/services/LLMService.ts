import {LLMProvidersResponse} from "../types/llm.ts";
import {APIClient, APIResponse} from "./APIClient.ts";

export class LLMService extends APIClient {
    constructor(token: string = '') {
        super(import.meta.env.VITE_MCP_BACKEND_API_ENDPOINT, token);
    }

    async getLLMProviders(): Promise<APIResponse<LLMProvidersResponse>> {
        return this.fetchWithError<LLMProvidersResponse>('/api/v1/llm-providers');
    }
}