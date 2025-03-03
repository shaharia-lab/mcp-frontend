export interface Message {
    role: string;
    Text: string;
    generated_at: string;
}

export interface ChatHistory {
    uuid: string;
    messages: Message[];
    created_at: string;
}
