import React from 'react';
import {XMarkIcon} from '@heroicons/react/24/outline';
import {Notification} from '../../types/notification';

interface NotificationToastProps {
    notification: Notification;
    onClose: (id: string) => void;
}

const getNotificationStyles = (type: Notification['type']) => {
    switch (type) {
        case 'error':
            return 'bg-red-100 border-red-400 text-red-700';
        case 'success':
            return 'bg-green-100 border-green-400 text-green-700';
        case 'warning':
            return 'bg-yellow-100 border-yellow-400 text-yellow-700';
        case 'info':
            return 'bg-blue-100 border-blue-400 text-blue-700';
        default:
            return 'bg-gray-100 border-gray-400 text-gray-700';
    }
};

export const NotificationToast: React.FC<NotificationToastProps> = ({ notification, onClose }) => {
    return (
        <div className={`${getNotificationStyles(notification.type)} px-4 py-3 rounded border flex items-center justify-between`}>
            <span>{notification.message}</span>
            <button
                onClick={() => onClose(notification.id)}
                className="ml-4 text-gray-500 hover:text-gray-700"
            >
                <XMarkIcon className="h-5 w-5" />
            </button>
        </div>
    );
};