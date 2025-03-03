// src/api/index.ts
import { ChatHistory } from '../types';

export const fetchChatHistories = async (): Promise<ChatHistory[]> => {
    const response = await fetch('http://localhost:8081/chats');
    if (!response.ok) {
        throw new Error('Failed to fetch chat histories');
    }
    const data = await response.json();
    return data.chats;
};