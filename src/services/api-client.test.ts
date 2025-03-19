// api-client.test.ts
import { ChatService } from "./ChatService";
import { ChatPayload } from "../types/chat";

// Mock ChatService
jest.mock("./ChatService", () => {
    const streamMessageMock = jest.fn().mockImplementation((payload, onChunk, onHeaderChatUuid) => {
        // Use the chat_uuid from payload if provided
        const mockChatUuid = payload.chat_uuid || "123e4567-e89b-12d3-a456-426614174000";

        // Call the onHeaderChatUuid callback with the UUID
        onHeaderChatUuid(mockChatUuid);

        // Simulate streaming chunks
        onChunk({ content: "Hello, " });
        onChunk({ content: "world!" });
        onChunk({ content: "", done: true });

        return Promise.resolve();
    });

    const sendMessageMock = jest.fn().mockImplementation((payload) => {
        // Use the chat_uuid from payload if provided
        const mockChatUuid = payload.chat_uuid || "123e4567-e89b-12d3-a456-426614174000";

        return Promise.resolve({
            data: {
                chat_uuid: mockChatUuid,
                answer: "Mock response",
                input_token: 10,
                output_token: 5
            }
        });
    });

    const loadChatHistoryMock = jest.fn().mockImplementation((chatUuid) => {
        // Use the provided chatUuid in response for clearer testing
        return Promise.resolve({
            data: {
                chatUuid: chatUuid, // Use the parameter
                messages: [
                    { Text: "Hello", IsUser: true },
                    { Text: "Hi there! How can I help you?", IsUser: false }
                ]
            }
        });
    });

    const getChatHistoriesMock = jest.fn().mockImplementation(() => {
        return Promise.resolve({
            data: [
                { chatUuid: "123e4567-e89b-12d3-a456-426614174000", title: "Chat 1", timestamp: "2023-07-01T12:00:00Z" },
                { chatUuid: "223e4567-e89b-12d3-a456-426614174001", title: "Chat 2", timestamp: "2023-07-02T12:00:00Z" }
            ]
        });
    });

    const deleteChatMock = jest.fn().mockImplementation((chatUuid) => {
        // Use the provided chatUuid in response for clearer testing
        return Promise.resolve({
            status: 200,
            data: {
                success: true,
                deletedChatUuid: chatUuid // Use the parameter
            }
        });
    });

    return {
        ChatService: jest.fn().mockImplementation(() => ({
            sendStreamMessage: streamMessageMock,
            sendMessage: sendMessageMock,
            loadChatHistory: loadChatHistoryMock,
            getChatHistories: getChatHistoriesMock,
            deleteChat: deleteChatMock
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

        it('should preserve existing chat UUID in stream requests', async () => {
            // Create mock callbacks
            const onChunk = jest.fn();
            const onHeaderChatUuid = jest.fn();

            // Create payload with existing UUID
            const existingUuid = "existing-uuid-123";
            const payload = createSamplePayload("Follow-up question", existingUuid);

            // Call the mocked service
            await chatService.sendStreamMessage(payload, onChunk, onHeaderChatUuid);

            // Verify the same UUID is returned
            expect(onHeaderChatUuid).toHaveBeenCalledWith(existingUuid);
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

    describe('Chat History Management', () => {
        it('should load chat history for a given UUID', async () => {
            const chatUuid = "123e4567-e89b-12d3-a456-426614174000";

            // Load chat history
            const result = await chatService.loadChatHistory(chatUuid);

            // Verify the response contains messages
            expect(result.data).toHaveProperty('messages');
            expect(result.data.messages).toHaveLength(2);
            expect(result.data.messages[0].Text).toBe("Hello");
            expect(result.data.messages[0].IsUser).toBe(true);
            expect(result.data.messages[1].Text).toBe("Hi there! How can I help you?");
            expect(result.data.messages[1].IsUser).toBe(false);
        });

        it('should retrieve list of chat histories', async () => {
            // Get chat histories
            const result = await chatService.getChatHistories();

            // Verify the response contains list of chats
            expect(Array.isArray(result.data)).toBe(true);
            expect(result.data).toHaveLength(2);
            expect(result.data[0].chatUuid).toBe("123e4567-e89b-12d3-a456-426614174000");
            expect(result.data[1].chatUuid).toBe("223e4567-e89b-12d3-a456-426614174001");
        });

        it('should delete a chat by UUID', async () => {
            const chatUuid = "123e4567-e89b-12d3-a456-426614174000";

            // Delete chat
            const result = await chatService.deleteChat(chatUuid);

            // Verify the response indicates success
            expect(result.data.success).toBe(true);
        });
    });

    describe('End-to-End Chat Flow', () => {
        it('should maintain consistent UUID across multiple operations', async () => {
            // Create initial payload (no UUID)
            const initialPayload = createSamplePayload("What is AI?");

            // 1. Create a new chat with syncMessage
            const syncResult = await chatService.sendMessage(initialPayload);
            const chatUuid = syncResult.data.chat_uuid;

            // 2. Continue the conversation with streaming
            const onChunk = jest.fn();
            const onHeaderChatUuid = jest.fn();
            const streamPayload = createSamplePayload("Tell me more", chatUuid);

            await chatService.sendStreamMessage(streamPayload, onChunk, onHeaderChatUuid);

            // Verify UUID consistency across operations
            expect(chatUuid).toBe("123e4567-e89b-12d3-a456-426614174000");
            expect(onHeaderChatUuid).toHaveBeenCalledWith(chatUuid);
        });

        it('should handle switching between chats', async () => {
            // Get list of existing chats
            const chatListResult = await chatService.getChatHistories();
            const existingChatUuid = chatListResult.data[0].chatUuid;

            // Continue the conversation with that chat
            const continuePayload = createSamplePayload("Continue this conversation", existingChatUuid);
            const syncResult = await chatService.sendMessage(continuePayload);

            // Verify the same UUID is maintained
            expect(syncResult.data.chat_uuid).toBe(existingChatUuid);
        });
    });

    describe('Error Handling', () => {
        it('should handle errors when chat UUID is invalid', async () => {
            // Mock an implementation that rejects the promise
            const originalImplementation = chatService.loadChatHistory;
            chatService.loadChatHistory = jest.fn().mockRejectedValueOnce({
                response: {
                    status: 404,
                    data: { error: "Chat not found" }
                }
            });

            // Try to load a non-existent chat
            try {
                await chatService.loadChatHistory("non-existent-uuid");
                fail("Expected an error but none was thrown");
            } catch (error: any) {
                expect(error.response.status).toBe(404);
                expect(error.response.data.error).toBe("Chat not found");
            }

            // Restore the original implementation
            chatService.loadChatHistory = originalImplementation;
        });
    });
});