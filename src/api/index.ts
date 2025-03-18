export const fetchTools = async () => {
    const response = await fetch('http://localhost:8081/api/tools');
    if (!response.ok) {
        throw new Error('Failed to fetch tools');
    }
    return await response.json();
};