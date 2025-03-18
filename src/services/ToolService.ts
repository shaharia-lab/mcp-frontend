import {Tool} from "../types/tools.ts";
import {APIClient, APIResponse} from "./APIClient.ts";

export class ToolService extends APIClient {
    constructor(token: string = '') {
        super(import.meta.env.VITE_MCP_BACKEND_API_ENDPOINT, token);
    }

    async getTools(): Promise<APIResponse<Tool[]>> {
        return this.fetchWithError<Tool[]>('/api/v1/tools');
    }
}
