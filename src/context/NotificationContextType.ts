import { createContext } from 'react';
import { Notification, NotificationType } from '../types/notification';

export interface NotificationContextType {
    notifications: Notification[];
    addNotification: (type: NotificationType, message: string, duration?: number) => void;
    removeNotification: (id: string) => void;
}

export const NotificationContext = createContext<NotificationContextType | undefined>(undefined);