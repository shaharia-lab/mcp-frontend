// src/components/NotificationContainer.tsx
import React from 'react';
import {NotificationToast} from './NotificationToast';
import {useNotification} from "../../context/useNotification.ts";

export const NotificationContainer: React.FC = () => {
    const { notifications, removeNotification } = useNotification();

    return (
        <div className="fixed top-4 right-4 z-50 space-y-2 max-w-md">
            {notifications.map(notification => (
                <NotificationToast
                    key={notification.id}
                    notification={notification}
                    onClose={removeNotification}
                />
            ))}
        </div>
    );
};