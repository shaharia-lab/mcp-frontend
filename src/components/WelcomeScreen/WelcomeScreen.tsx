import React from 'react';

interface WelcomeScreenProps {
    onStart: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart }) => {
    return (
        <div className="welcome-container flex items-center justify-center">
            <div className="text-center p-8">
                <h1 className="text-3xl font-bold mb-4">Welcome to MCP Kit</h1>
                <p className="text-gray-600 mb-6">
                    Start a conversation with the AI assistant
                </p>
                <button
                    onClick={onStart}
                    className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                >
                    Start Chat
                </button>
            </div>
        </div>
    );
};