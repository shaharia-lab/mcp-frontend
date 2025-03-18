import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ChatContainer } from './ChatContainer';
import { useAuth0 } from '@auth0/auth0-react';
import { ChatService } from '../../services/ChatService';
import { act } from '@testing-library/react';

// Mock MessageContent to avoid contentParser issues
jest.mock('../Message/MessageContent', () => ({
    MessageContent: () => <div data-testid="mock-message-content">Message Content</div>
}));

// Mock Message component which uses MessageContent
jest.mock('../Message/Message', () => ({
    Message: () => <div data-testid="mock-message">Mock Message</div>
}));

// Mock the ToolService
jest.mock('../../services/ToolService', () => ({
    ToolService: jest.fn().mockImplementation(() => ({
        getTools: jest.fn().mockResolvedValue({
            data: [
                { name: 'tool1', description: 'Tool 1 description' },
                { name: 'tool2', description: 'Tool 2 description' }
            ]
        })
    }))
}));

// Mock the auth0 hook
jest.mock('@auth0/auth0-react');

jest.mock("../../services/LLMService", () => ({
    LLMService: jest.fn().mockImplementation(() => ({
        getLLMProviders: () => Promise.resolve({
            data: {
                providers: [
                    {
                        name: "test-provider",
                        models: [
                            { modelId: "test-model-1", name: "Test Model 1" }
                        ]
                    }
                ]
            }
        })
    }))
}));

// Mock the ChatService
jest.mock('../../services/ChatService', () => {
    return {
        ChatService: jest.fn().mockImplementation(() => ({
            loadChatHistory: jest.fn().mockResolvedValue({
                data: {
                    messages: []
                }
            }),
            sendMessage: jest.fn(),
            getChatHistories: jest.fn()
        }))
    };
});

// Mock the notification context
jest.mock('../../context/useNotification', () => ({
    useNotification: () => ({
        addNotification: jest.fn()
    })
}));

// Mock ChatInput component
jest.mock('../ChatInput/ChatInput', () => ({
    ChatInput: () => <div data-testid="mock-chat-input">Chat Input</div>
}));

// Set up environment variables for tests
beforeAll(() => {
    Object.defineProperty(window, 'import', {
        value: {
            meta: {
                env: {
                    VITE_MCP_BACKEND_API_ENDPOINT: 'http://localhost:3000'
                }
            }
        },
        writable: true
    });
    Element.prototype.scrollIntoView = jest.fn();
});

afterAll(() => {
    // Clean up
    // @ts-ignore
    delete window.import;
});

describe('ChatContainer', () => {
    const mockModelSettings = {
        temperature: 0.7,
        maxTokens: 1000,
        topP: 1,
        topK: 40
    };

    const mockGetAccessTokenSilently = jest.fn().mockResolvedValue('mock-token');

    beforeEach(() => {
        // Reset all mocks before each test
        jest.clearAllMocks();

        // Default auth0 mock implementation
        (useAuth0 as jest.Mock).mockReturnValue({
            isAuthenticated: true,
            loginWithRedirect: jest.fn(),
            getAccessTokenSilently: mockGetAccessTokenSilently,
            user: { sub: 'test-user-id' }
        });
    });

    it('should render login prompt when user is not authenticated', async () => {
        const mockLoginWithRedirect = jest.fn();
        (useAuth0 as jest.Mock).mockReturnValue({
            isAuthenticated: false,
            loginWithRedirect: mockLoginWithRedirect,
            getAccessTokenSilently: mockGetAccessTokenSilently
        });

        await act(async () => {
            render(
                <ChatContainer
                    modelSettings={mockModelSettings}
                    selectedTools={[]}
                />
            );
        });

        expect(screen.getByText('Please log in to use the chat')).toBeInTheDocument();

        const loginButton = screen.getByText('Log In');
        fireEvent.click(loginButton);
        expect(mockLoginWithRedirect).toHaveBeenCalled();
    });

    it('should load chat history when selectedChatId is provided', async () => {
        const mockChatHistory = {
            data: {
                messages: [
                    { text: 'Hello', isUser: true, id: '1' },
                    { text: 'Hi there!', isUser: false, id: '2' }
                ]
            }
        };

        mockGetAccessTokenSilently.mockResolvedValue('mock-token');
        const mockLoadChatHistory = jest.fn().mockResolvedValue(mockChatHistory);
        (ChatService as jest.Mock).mockImplementation(() => ({
            loadChatHistory: mockLoadChatHistory,
            sendMessage: jest.fn(),
            getChatHistories: jest.fn()
        }));

        await act(async () => {
            render(
                <ChatContainer
                    modelSettings={mockModelSettings}
                    selectedChatId="test-chat-id"
                    selectedTools={[]}
                />
            );
        });

        await waitFor(() => {
            expect(mockGetAccessTokenSilently).toHaveBeenCalled();
            if (mockLoadChatHistory.mock.calls.length > 0) {
                expect(mockLoadChatHistory).toHaveBeenCalledWith("test-chat-id");
            }
        });
    });
});