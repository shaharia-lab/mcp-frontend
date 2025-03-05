import {Tool} from "../types/tools.ts";
import {APIClient, APIResponse} from "./APIClient.ts";

export class ToolService extends APIClient {
    constructor(token: string = '', baseUrl?: string) {
        super(baseUrl || import.meta.env.VITE_MCP_BACKEND_API_ENDPOINT, token);
    }

    async getTools(): Promise<APIResponse<Tool[]>> {
        return this.fetchWithError<Tool[]>('/tools');
    }
}