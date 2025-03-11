import {SiGmail} from "react-icons/si";
import {MdOutlineHttp} from "react-icons/md";
import {IconType} from "react-icons";
import {FaDatabase, FaDocker, FaGithub, FaGitSquare, FaRegFolderOpen} from "react-icons/fa";

interface ToolIconMapping {
    pattern: string;
    icon: IconType;
    title: string;
    regex: RegExp;
    colors: {
        bg: string;
        hoverBg: string;
        text: string;
    };
}

export const toolIconMappings: ToolIconMapping[] = [
    {
        pattern: 'gmail',
        icon: SiGmail,
        title: 'Access Gmail',
        regex: /^gmail\w*/,
        colors: {
            bg: 'bg-red-600',
            hoverBg: 'hover:bg-red-700',
            text: 'text-white'
        }
    },
    {
        pattern: 'curl',
        icon: MdOutlineHttp,
        title: 'HTTP Tools using cURL',
        regex: /^curl\w*/,
        colors: {
            bg: 'bg-purple-600',
            hoverBg: 'hover:bg-purple-700',
            text: 'text-white'
        }
    },
    {
        pattern: 'postgresql',
        icon: FaDatabase,
        title: 'PostgreSQL Tools',
        regex: /^postgresql\w*/,
        colors: {
            bg: 'bg-blue-600',
            hoverBg: 'hover:bg-blue-700',
            text: 'text-white'
        }
    },
    {
        pattern: 'git',
        icon: FaGitSquare,
        title: 'Git Tools',
        regex: /^git(?!hub)\w*/,
        colors: {
            bg: 'bg-orange-600',
            hoverBg: 'hover:bg-orange-700',
            text: 'text-white'
        }
    },
    {
        pattern: 'github',
        icon: FaGithub,
        title: 'GitHub Tools',
        regex: /^github\w*/,
        colors: {
            bg: 'bg-gray-800',
            hoverBg: 'hover:bg-gray-900',
            text: 'text-white'
        }
    },
    {
        pattern: 'docker',
        icon: FaDocker,
        title: 'Docker Tools',
        regex: /^docker\w*/,
        colors: {
            bg: 'bg-sky-600',
            hoverBg: 'hover:bg-sky-700',
            text: 'text-white'
        }
    },
    {
        pattern: 'filesystem',
        icon: FaRegFolderOpen,
        title: 'Manage Filesystem',
        regex: /^filesystem\w*/,
        colors: {
            bg: 'bg-amber-500',
            hoverBg: 'hover:bg-amber-600',
            text: 'text-white'
        }
    }
];