export interface Message {
    role: string;
    Text: string;
    generated_at: string;
}

export interface ChatHistory {
    uuid: string;
    messages: Array<{
        Role: string;
        Text: string;
        generated_at: string;
    }>;
    created_at: string;
}
