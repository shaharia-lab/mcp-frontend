import React from 'react';

interface AIIconProps {
    size?: number;
    color?: string;
}

const AIIcon: React.FC<AIIconProps> = ({
                                           size = 200,
                                           color = '#4285f4'
                                       }) => {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 200 200"
            xmlns="http://www.w3.org/2000/svg"
        >
            <circle cx="100" cy="100" r="80" fill={color} opacity="0.1"/>
            <g stroke={color} stroke-width="2">
                <circle cx="100" cy="100" r="8" fill={color}/>
                <circle cx="60" cy="70" r="6" fill="white"/>
                <circle cx="140" cy="70" r="6" fill="white"/>
                <circle cx="60" cy="130" r="6" fill="white"/>
                <circle cx="140" cy="130" r="6" fill="white"/>
                <circle cx="100" cy="50" r="6" fill="white"/>
                <circle cx="100" cy="150" r="6" fill="white"/>

                <line x1="100" y1="100" x2="60" y2="70"/>
                <line x1="100" y1="100" x2="140" y2="70"/>
                <line x1="100" y1="100" x2="60" y2="130"/>
                <line x1="100" y1="100" x2="140" y2="130"/>
                <line x1="100" y1="100" x2="100" y2="50"/>
                <line x1="100" y1="100" x2="100" y2="150"/>

                <path d="M60 70 Q 100 85 140 70" fill="none"/>
                <path d="M60 130 Q 100 115 140 130" fill="none"/>
            </g>
            <circle cx="100" cy="100" r="20" fill="none" stroke={color} opacity="0.5">
                <animate
                    attributeName="r"
                    from="20"
                    to="40"
                    dur="1.5s"
                    begin="0s"
                    repeatCount="indefinite"
                />
                <animate
                    attributeName="opacity"
                    from="0.5"
                    to="0"
                    dur="1.5s"
                    begin="0s"
                    repeatCount="indefinite"
                />
            </circle>
        </svg>
    );
};

export default AIIcon;