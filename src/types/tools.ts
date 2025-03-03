export interface Tool {
    name: string;
    description: string;
}

export interface ToolsModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (selectedTools: string[]) => void;
    initialSelectedTools: string[];
}
