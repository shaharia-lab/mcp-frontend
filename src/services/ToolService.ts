import {Tool} from "../types/tools.ts";
import {APIClient, APIResponse} from "./APIClient.ts";

export class ToolService extends APIClient {
    constructor(token: string = '') {
        super('http://localhost:8081/api', token);
    }

    async getTools(): Promise<APIResponse<Tool[]>> {
        return this.fetchWithError<Tool[]>('/tools');
    }
}
