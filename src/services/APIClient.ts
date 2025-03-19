export interface APIResponse<T> {
    data: T;
    error?: string;
}

export class APIClient {
    private baseUrl: string;
    private token: string;

    constructor(baseUrl: string, token: string = '') {
        this.baseUrl = baseUrl;
        this.token = token;
    }

    private getHeaders(): HeadersInit {
        const headers: HeadersInit = {
            'Content-Type': 'application/json',
        };

        if (this.token) {
            headers['Authorization'] = `Bearer ${this.token}`;
        }

        return headers;
    }

    protected async fetchWithError<T>(
        endpoint: string,
        options: RequestInit = {}
    ): Promise<APIResponse<T>> {
        try {
            const response = await fetch(`${this.baseUrl}${endpoint}`, {
                ...options,
                headers: this.getHeaders(),
            });

            if (!response.ok) {
                throw new Error(`API Error: ${response.statusText}`);
            }

            const data = await response.json();
            return { data };
        } catch (error) {
            return {
                data: null as T,
                error: error instanceof Error ? error.message : 'Unknown error occurred'
            };
        }
    }

    protected async fetchStream(
        endpoint: string,
        options: RequestInit = {}
    ): Promise<Response> {
        const response = await fetch(`${this.baseUrl}${endpoint}`, {
            ...options,
            headers: {
                ...this.getHeaders(),
                ...options.headers
            },
            mode: 'cors',
        });

        if (!response.ok) {
            throw new Error(`API Error: ${response.statusText}`);
        }

        return response;
    }
}
