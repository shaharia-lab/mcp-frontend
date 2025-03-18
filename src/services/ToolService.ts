import {Tool} from "../types/tools.ts";
import {APIClient, APIResponse} from "./APIClient.ts";

export class ToolService extends APIClient {
    constructor(token: string = '') {
        super('http://localhost:8081', token);
    }

    async getTools(): Promise<APIResponse<Tool[]>> {
        return this.fetchWithError<Tool[]>('/api/v1/tools');
    }
}
