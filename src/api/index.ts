export const fetchChatHistories = async (token: string) => {
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
};

export const fetchTools = async () => {
    const response = await fetch('http://localhost:8081/api/tools');
    if (!response.ok) {
        throw new Error('Failed to fetch tools');
    }
    return await response.json();
};