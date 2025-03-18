import { render, screen, act, fireEvent } from '@testing-library/react';
import { ToolsModal } from './ToolsModal';
import { ToolService } from '../../services/ToolService';
import { Tool } from '../../types/tools';

// Create mock data
const mockTools = [
    { name: 'Tool1', description: 'Description 1' },
    { name: 'Tool2', description: 'Description 2' },
    { name: 'Tool3', description: 'Description 3' },
];

jest.mock('@auth0/auth0-react', () => ({
    useAuth0: () => ({
        getAccessTokenSilently: jest.fn().mockResolvedValue('mock-token')
    })
}));


// Mock the ToolItem component
jest.mock('../ToolItem/ToolItem', () => ({
    ToolItem: ({ tool, onToggle }: {
        tool: Tool;
        isSelected: boolean;
        onToggle: (name: string) => void;
    }) => (
        <div
            data-testid={`tool-item-${tool.name}`}
            onClick={() => onToggle(tool.name)}
        >
            {tool.name}
        </div>
    )
}));

// Mock SearchBar component
jest.mock('../SearchBar', () => ({
    SearchBar: ({ value, onChange }: {
        value: string;
        onChange: (value: string) => void;
    }) => (
        <input
            data-testid="search-bar"
            placeholder="Search tools"
            value={value}
            onChange={(e) => onChange(e.target.value)}
        />
    )
}));

// Mock the ToolService
jest.mock('../../services/ToolService', () => ({
    ToolService: jest.fn().mockImplementation(() => ({
        getTools: jest.fn().mockResolvedValue({
            data: mockTools
        })
    }))
}));


// Mock the ToolItem component
jest.mock('../ToolItem/ToolItem', () => ({
    ToolItem: ({ tool, isSelected, onToggle }: {
        tool: Tool;
        isSelected: boolean;
        onToggle: (name: string) => void;
    }) => (
        <div
            data-testid={`tool-item-${tool.name}`}
            onClick={() => onToggle(tool.name)}
        >
            {tool.name}
            {isSelected && ' (Selected)'}
        </div>
    )
}));


describe('ToolsModal', () => {
    const mockOnClose = jest.fn();
    const mockOnSave = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
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
        expect(ToolService).toHaveBeenCalledTimes(2);

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
