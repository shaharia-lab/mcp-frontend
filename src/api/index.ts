export const fetchChatHistories = async (token: string) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_MCP_BACKEND_API_ENDPOINT}/chats`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            throw new Error('Failed to fetch chat histories');
        }
        return await response.json();
    } catch (error) {
        throw error;
    }
};

export const fetchLLMProviders = async () => {
    try {
        const response = await fetch(`${import.meta.env.VITE_MCP_BACKEND_API_ENDPOINT}/llm-providers`);
        if (!response.ok) {
            throw new Error('Failed to fetch LLM providers');
        }
        return await response.json();
    } catch (error) {
        throw error;
    }
};

export const fetchTools = async () => {
    try {
        const response = await fetch('http://localhost:8081/api/tools');
        if (!response.ok) {
            throw new Error('Failed to fetch tools');
        }
        return await response.json();
    } catch (error) {
        throw error;
    }
};
