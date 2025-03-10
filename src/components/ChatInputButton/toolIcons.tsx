import { IconType } from 'react-icons';
import { SiGmail } from 'react-icons/si';
import { TbApi } from 'react-icons/tb';
import { FaDatabase } from 'react-icons/fa';
// Import other icons as needed

interface ToolIconMapping {
    pattern: string;
    icon: IconType;
    title: string;
}

export const toolIconMappings: ToolIconMapping[] = [
    {
        pattern: 'gmail',
        icon: SiGmail,
        title: 'Gmail Tools'
    },
    {
        pattern: 'curl',
        icon: TbApi,
        title: 'API Tools'
    },
    {
        pattern: 'sql',
        icon: FaDatabase,
        title: 'Database Tools'
    }
    // Add more mappings as needed
];