import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import {ToolsToggle} from "./ToolsToggle.tsx";

// Define the interface for ToolsModal props
interface MockToolsModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (tools: string[]) => void;
    initialSelectedTools: string[];
}

// Mock the ToolsModal component with proper typing
jest.mock('./ToolsModal', () => ({
    ToolsModal: ({ isOpen, onClose, onSave, initialSelectedTools }: MockToolsModalProps) =>
        isOpen ? (
            <div data-testid="tools-modal">
                <button onClick={() => {
                    onSave(initialSelectedTools);
                    onClose(); // Make sure we call onClose after onSave
                }}>Save</button>
                <button onClick={onClose}>Close</button>
            </div>
        ) : null
}));



describe('ToolsToggle', () => {
    const mockOnToolsChange = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('opens modal when clicked', () => {
        render(<ToolsToggle selectedTools={[]} onToolsChange={mockOnToolsChange} />);

        const button = screen.getByRole('button');
        fireEvent.click(button);

        expect(screen.getByTestId('tools-modal')).toBeInTheDocument();
    });

    it('closes modal and calls onToolsChange when saving', () => {
        const selectedTools = ['tool1', 'tool2'];
        render(
            <ToolsToggle
                selectedTools={selectedTools}
                onToolsChange={mockOnToolsChange}
            />
        );

        // Open modal
        fireEvent.click(screen.getByRole('button'));

        // Click save in modal
        fireEvent.click(screen.getByText('Save'));

        expect(mockOnToolsChange).toHaveBeenCalledWith(selectedTools);
        expect(screen.queryByTestId('tools-modal')).not.toBeInTheDocument();
    });

    it('closes modal without calling onToolsChange when clicking close', () => {
        render(
            <ToolsToggle
                selectedTools={[]}
                onToolsChange={mockOnToolsChange}
            />
        );

        // Open modal
        fireEvent.click(screen.getByRole('button'));

        // Click close in modal
        fireEvent.click(screen.getByText('Close'));

        expect(mockOnToolsChange).not.toHaveBeenCalled();
        expect(screen.queryByTestId('tools-modal')).not.toBeInTheDocument();
    });
});