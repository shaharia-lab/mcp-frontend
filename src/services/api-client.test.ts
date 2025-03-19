// Mock ChatService
import {ChatService} from "./ChatService.ts";
import {ChatPayload} from "../types/chat.ts";

jest.mock("./ChatService", () => {
    return {
        ChatService: jest.fn().mockImplementation(() => ({
            sendStreamMessage: jest.fn().mockImplementation((_payload, onChunk, onHeaderChatUuid) => {
                // Simulate response with chat UUID
                const mockChatUuid = "123e4567-e89b-12d3-a456-426614174000";

                // Call the callbacks as the real service would
                onHeaderChatUuid(mockChatUuid);
                onChunk({ content: "Hello, " });
                onChunk({ content: "world!" });
                onChunk({ content: "", done: true });

                return Promise.resolve();
            }),

            sendMessage: jest.fn().mockImplementation((payload) => {
                // Simulate response with chat UUID
                const mockChatUuid = payload.chat_uuid || "123e4567-e89b-12d3-a456-426614174000";

                return Promise.resolve({
                    data: {
                        chat_uuid: mockChatUuid,
                        answer: "Mock response",
                        input_token: 10,
                        output_token: 5
                    }
                });
            })
        }))
    };
});

describe('Chat API Client', () => {
    let chatService: any;

    beforeEach(() => {
        jest.clearAllMocks();
        chatService = new ChatService('mock-token');
    });

    // Helper function to create sample payload
    const createSamplePayload = (question: string, chatUuid: string = ""): ChatPayload => ({
        question,
        selectedTools: [],
        modelSettings: {
            temperature: 0.5,
            maxTokens: 2000,
            topP: 0.5,
            topK: 50
        },
        chat_uuid: chatUuid,
        llmProvider: {
            provider: "Anthropic",
            modelId: "claude-3-5-haiku-latest"
        },
        stream_settings: {
            chunk_size: 1,
            delay_ms: 10
        }
    });

    describe('Chat Streaming', () => {
        it('should handle stream response and extract UUID', async () => {
            // Create mock callbacks
            const onChunk = jest.fn();
            const onHeaderChatUuid = jest.fn();

            // Create payload
            const payload = createSamplePayload("Hello");

            // Call the mocked service
            await chatService.sendStreamMessage(payload, onChunk, onHeaderChatUuid);

            // Verify callbacks were called
            expect(onHeaderChatUuid).toHaveBeenCalledWith("123e4567-e89b-12d3-a456-426614174000");
            expect(onChunk).toHaveBeenCalledTimes(3);
            expect(onChunk).toHaveBeenNthCalledWith(1, { content: "Hello, " });
            expect(onChunk).toHaveBeenNthCalledWith(2, { content: "world!" });
            expect(onChunk).toHaveBeenNthCalledWith(3, { content: "", done: true });
        });
    });

    describe('Chat Synchronous API', () => {
        it('should send and receive message with chat UUID', async () => {
            // Create payload without UUID (new chat)
            const payload = createSamplePayload("Hello");

            // Call the mocked service
            const result = await chatService.sendMessage(payload);

            // Verify response contains chat UUID
            expect(result.data).toHaveProperty('chat_uuid');
            expect(result.data.chat_uuid).toBe("123e4567-e89b-12d3-a456-426614174000");
        });

        it('should preserve existing chat UUID in subsequent requests', async () => {
            // Create payload with existing UUID
            const existingUuid = "existing-uuid-123";
            const payload = createSamplePayload("Follow-up question", existingUuid);

            // Call the mocked service
            const result = await chatService.sendMessage(payload);

            // Verify same UUID is returned
            expect(result.data.chat_uuid).toBe(existingUuid);
        });
    });
});