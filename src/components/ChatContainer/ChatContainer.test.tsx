import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ChatContainer } from './ChatContainer';
import { useAuth0 } from '@auth0/auth0-react';
import { ChatService } from '../../services/ChatService';
import { act } from '@testing-library/react';


// Mock the api module
jest.mock('../../api', () => ({
    fetchChatHistories: jest.fn(),
    fetchLLMProviders: jest.fn(),
    fetchTools: jest.fn()
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

    const mockGetAccessTokenSilently = jest.fn();

    beforeEach(() => {
        // Reset all mocks before each test
        jest.clearAllMocks();

        // Default auth0 mock implementation
        (useAuth0 as jest.Mock).mockReturnValue({
            isAuthenticated: true,
            loginWithRedirect: jest.fn(),
            getAccessTokenSilently: mockGetAccessTokenSilently,
        });
    });

    it('should render login prompt when user is not authenticated', () => {
        const mockLoginWithRedirect = jest.fn();
        (useAuth0 as jest.Mock).mockReturnValue({
            isAuthenticated: false,
            loginWithRedirect: mockLoginWithRedirect
        });

        render(
            <ChatContainer
                selectedTools={[]}
                modelSettings={mockModelSettings}
            />
        );

        expect(screen.getByText('Please log in to use the chat')).toBeInTheDocument();

        const loginButton = screen.getByText('Log In');
        fireEvent.click(loginButton);
        expect(mockLoginWithRedirect).toHaveBeenCalled();
    });

    it('should load chat history when selectedChatId is provided', async () => {
        const mockChatHistory = {
            data: {
                messages: [
                    { Text: 'Hello', IsUser: true },
                    { Text: 'Hi there!', IsUser: false }
                ]
            }
        };

        mockGetAccessTokenSilently.mockResolvedValue('mock-token');
        (ChatService as jest.Mock).mockImplementation(() => ({
            loadChatHistory: jest.fn().mockResolvedValue(mockChatHistory)
        }));

        render(
            <ChatContainer
                selectedTools={[]}
                modelSettings={mockModelSettings}
                selectedChatId="test-chat-id"
            />
        );

        await waitFor(() => {
            expect(screen.getByText('Hello')).toBeInTheDocument();
            expect(screen.getByText('Hi there!')).toBeInTheDocument();
        });
    });

    it('should handle chat history loading error gracefully', async () => {
        mockGetAccessTokenSilently.mockResolvedValue('mock-token');
        (ChatService as jest.Mock).mockImplementation(() => ({
            loadChatHistory: jest.fn().mockRejectedValue(new Error('Failed to load'))
        }));

        const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

        render(
            <ChatContainer
                selectedTools={[]}
                modelSettings={mockModelSettings}
                selectedChatId="test-chat-id"
            />
        );

        await waitFor(() => {
            expect(consoleSpy).toHaveBeenCalledWith('Error loading chat history:', expect.any(Error));
        });

        consoleSpy.mockRestore();
    });

    it('should clear messages when selectedChatId becomes null', async () => {
        const { rerender } = render(
            <ChatContainer
                selectedTools={[]}
                modelSettings={mockModelSettings}
                selectedChatId="test-chat-id"
            />
        );

        rerender(
            <ChatContainer
                selectedTools={[]}
                modelSettings={mockModelSettings}
                selectedChatId={undefined}
            />
        );

        // Verify that messages are cleared
        expect(screen.queryByRole('list')).not.toBeInTheDocument();
    });
    it('should handle provider and model selection', async () => {
        // Mock authentication
        (useAuth0 as jest.Mock).mockReturnValue({
            isAuthenticated: true,
            getAccessTokenSilently: jest.fn().mockResolvedValue('mock-token'),
            user: {
                name: 'Test User',
                email: 'test@example.com'
            }
        });

        await act(async () => {
            render(
                <ChatContainer
                    selectedTools={[]}
                    modelSettings={mockModelSettings}
                />
            );
        });

        // Find and click the LLMProviderToggle button
        const providerToggle = screen.getByTestId('llm-provider-toggle');
        expect(providerToggle).toBeInTheDocument();

        await act(async () => {
            fireEvent.click(providerToggle);
        });
    });
});