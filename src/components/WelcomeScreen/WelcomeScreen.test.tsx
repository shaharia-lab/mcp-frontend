import { render, screen, fireEvent } from '@testing-library/react';
import { WelcomeScreen } from './WelcomeScreen';

describe('WelcomeScreen', () => {
    it('renders welcome message', () => {
        render(<WelcomeScreen onStart={() => {}} />);

        expect(screen.getByText('Welcome to MCP Kit')).toBeInTheDocument();
        expect(screen.getByText('Start a conversation with the AI assistant')).toBeInTheDocument();
    });

    it('calls onStart when the button is clicked', () => {
        const mockOnStart = jest.fn();
        render(<WelcomeScreen onStart={mockOnStart} />);

        const startButton = screen.getByText('Start Chat');
        fireEvent.click(startButton);

        expect(mockOnStart).toHaveBeenCalledTimes(1);
    });

    it('has the correct button styles', () => {
        render(<WelcomeScreen onStart={() => {}} />);

        const button = screen.getByText('Start Chat');
        expect(button).toHaveClass('bg-blue-500', 'text-white', 'rounded-lg');
    });
});