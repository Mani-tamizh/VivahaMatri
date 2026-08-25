import { apiClient } from './api';
import { ApiResponse, Notification } from '../types';

export const notificationsService = {
  getNotifications: async (): Promise<ApiResponse<Notification[]>> => {
    return new Promise((resolve) => setTimeout(() => resolve({ success: true, data: [] }), 600));
  },

  markNotificationRead: async (notificationId: string): Promise<ApiResponse<void>> => {
    return new Promise((resolve) => setTimeout(() => resolve({ success: true }), 300));
  }
};
