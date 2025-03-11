import { IconType } from 'react-icons';
import { SiGmail } from 'react-icons/si';
import {FaDatabase, FaDocker, FaGithub, FaGitSquare, FaRegFolderOpen} from 'react-icons/fa';
import {MdOutlineHttp} from "react-icons/md";

interface ToolIconMapping {
    pattern: string;
    icon: IconType;
    title: string;
    regex: RegExp;  // Make regex required since we're using it for all
}

export const toolIconMappings: ToolIconMapping[] = [
    {
        pattern: 'gmail',
        icon: SiGmail,
        title: 'Access Gmail',
        regex: /^gmail\w*/
    },
    {
        pattern: 'curl',
        icon: MdOutlineHttp,
        title: 'HTTP Tools using cURL',
        regex: /^curl\w*/
    },
    {
        pattern: 'sql',
        icon: FaDatabase,
        title: 'Database Tools',
        regex: /^sql\w*/
    },
    {
        pattern: 'git',
        icon: FaGitSquare,
        title: 'Git Tools',
        regex: /^git(?!hub)\w*/
    },
    {
        pattern: 'github',
        icon: FaGithub,
        title: 'GitHub Tools',
        regex: /^github\w*/
    },
    {
        pattern: 'docker',
        icon: FaDocker,
        title: 'Docker Tools',
        regex: /^docker\w*/
    },
    {
        pattern: 'filesystem',
        icon: FaRegFolderOpen,
        title: 'Manage Filesystem',
        regex: /^filesystem\w*/
    }
];