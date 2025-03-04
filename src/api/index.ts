export const fetchChatHistories = async (token: string) => {
    try {
        const response = await fetch('http://localhost:8081/chats', {
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