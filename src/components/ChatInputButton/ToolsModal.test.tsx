import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import {fetchTools} from "../../api";
import {act} from "react";
import {ToolsModal} from "./ToolsModal.tsx";

// Mock the entire api module
jest.mock('../../api', () => ({
    fetchTools: jest.fn()
}));

// Mock the XMarkIcon component
jest.mock('@heroicons/react/24/outline', () => ({
    XMarkIcon: () => <div data-testid="close-icon">X</div>
}));

// Mock SearchBar component
jest.mock('../SearchBar.tsx', () => ({
    SearchBar: ({ value, onChange }: { value: string; onChange: (value: string) => void }) => (
        <input
            data-testid="search-bar"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Search tools"
        />
    )
}));

// Mock ToolItem component
jest.mock('../ToolItem/ToolItem', () => ({
    ToolItem: ({ tool, isSelected, onToggle }: { tool: any; isSelected: boolean; onToggle: (name: string) => void }) => (
        <div
            data-testid={`tool-item-${tool.name}`}
            onClick={() => onToggle(tool.name)}
        >
            {tool.name} {isSelected ? '(Selected)' : ''}
        </div>
    )
}));

const mockTools = [
    { name: 'Tool1', description: 'Description 1' },
    { name: 'Tool2', description: 'Description 2' },
    { name: 'Tool3', description: 'Description 3' },
];

describe('ToolsModal', () => {
    const mockOnClose = jest.fn();
    const mockOnSave = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
        (fetchTools as jest.Mock).mockResolvedValue(mockTools);
    });

    it('should render and fetch tools when opened', async () => {
        await act(async () => {
            render(
                <ToolsModal
                    isOpen={true}
                    onClose={mockOnClose}
                    onSave={mockOnSave}
                    initialSelectedTools={[]}
                />
            );
        });

        expect(screen.getByText('Available Tools')).toBeInTheDocument();
        expect(fetchTools).toHaveBeenCalledTimes(1);

        expect(screen.getByTestId('tool-item-Tool1')).toBeInTheDocument();
        expect(screen.getByTestId('tool-item-Tool2')).toBeInTheDocument();
        expect(screen.getByTestId('tool-item-Tool3')).toBeInTheDocument();
    });

    it('should filter tools based on search query', async () => {
        await act(async () => {
            render(
                <ToolsModal
                    isOpen={true}
                    onClose={mockOnClose}
                    onSave={mockOnSave}
                    initialSelectedTools={[]}
                />
            );
        });

        const searchInput = screen.getByTestId('search-bar');
        await act(async () => {
            fireEvent.change(searchInput, { target: { value: 'Tool1' } });
        });

        expect(screen.getByTestId('tool-item-Tool1')).toBeInTheDocument();
        expect(screen.queryByTestId('tool-item-Tool2')).not.toBeInTheDocument();
    });

    it('should handle tool selection and deselection', async () => {
        await act(async () => {
            render(
                <ToolsModal
                    isOpen={true}
                    onClose={mockOnClose}
                    onSave={mockOnSave}
                    initialSelectedTools={[]}
                />
            );
        });

        await act(async () => {
            fireEvent.click(screen.getByTestId('tool-item-Tool1'));
        });

        await act(async () => {
            fireEvent.click(screen.getByText('Save'));
        });

        expect(mockOnSave).toHaveBeenCalledWith(['Tool1']);
        expect(mockOnClose).toHaveBeenCalled();
    });

    it('should close without saving when clicking cancel', async () => {
        await act(async () => {
            render(
                <ToolsModal
                    isOpen={true}
                    onClose={mockOnClose}
                    onSave={mockOnSave}
                    initialSelectedTools={[]}
                />
            );
        });

        await act(async () => {
            fireEvent.click(screen.getByText('Cancel'));
        });

        expect(mockOnSave).not.toHaveBeenCalled();
        expect(mockOnClose).toHaveBeenCalled();
    });

    it('should initialize with provided selected tools', async () => {
        await act(async () => {
            render(
                <ToolsModal
                    isOpen={true}
                    onClose={mockOnClose}
                    onSave={mockOnSave}
                    initialSelectedTools={['Tool1']}
                />
            );
        });

        expect(screen.getByTestId('tool-item-Tool1').textContent).toContain('(Selected)');
    });
});
