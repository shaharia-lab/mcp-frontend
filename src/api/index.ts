export const fetchChatHistories = async (token: string) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_API_ENDPOINT}/chats`, {
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