import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import {ToolItem} from "./ToolItem.tsx";
import {Tool} from "../../types/tools.ts";

describe('ToolItem', () => {
    const mockTool: Tool = {
        name: 'Test Tool',
        description: 'This is a test tool description'
    };

    const mockOnToggle = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders tool information correctly', () => {
        render(
            <ToolItem
                tool={mockTool}
                isSelected={false}
                onToggle={mockOnToggle}
            />
        );

        // Check if tool name and description are rendered
        expect(screen.getByText('Test Tool')).toBeInTheDocument();
        expect(screen.getByText('This is a test tool description')).toBeInTheDocument();

        // Check if checkbox exists and is not checked
        const checkbox = screen.getByRole('checkbox') as HTMLInputElement;
        expect(checkbox).toBeInTheDocument();
        expect(checkbox).not.toBeChecked();
    });

    it('renders with correct checked state when selected', () => {
        render(
            <ToolItem
                tool={mockTool}
                isSelected={true}
                onToggle={mockOnToggle}
            />
        );

        const checkbox = screen.getByRole('checkbox') as HTMLInputElement;
        expect(checkbox).toBeChecked();
    });

    it('calls onToggle with correct tool name when checkbox is clicked', () => {
        render(
            <ToolItem
                tool={mockTool}
                isSelected={false}
                onToggle={mockOnToggle}
            />
        );

        const checkbox = screen.getByRole('checkbox');
        fireEvent.click(checkbox);

        expect(mockOnToggle).toHaveBeenCalledTimes(1);
        expect(mockOnToggle).toHaveBeenCalledWith('Test Tool');
    });

    it('calls onToggle when clicking the label', () => {
        render(
            <ToolItem
                tool={mockTool}
                isSelected={false}
                onToggle={mockOnToggle}
            />
        );

        const label = screen.getByText('Test Tool');
        fireEvent.click(label);

        expect(mockOnToggle).toHaveBeenCalledTimes(1);
        expect(mockOnToggle).toHaveBeenCalledWith('Test Tool');
    });

    it('has correct accessibility attributes', () => {
        render(
            <ToolItem
                tool={mockTool}
                isSelected={false}
                onToggle={mockOnToggle}
            />
        );

        const checkbox = screen.getByRole('checkbox');
        expect(checkbox).toHaveAttribute('id', 'Test Tool');

        const label = screen.getByText('Test Tool').closest('label');
        expect(label).toHaveAttribute('for', 'Test Tool');
    });

    it('applies hover styles class', () => {
        render(
            <ToolItem
                tool={mockTool}
                isSelected={false}
                onToggle={mockOnToggle}
            />
        );

        const container = screen.getByRole('checkbox').closest('div');
        expect(container).toHaveClass('hover:bg-gray-50');
    });
});