import { apiClient } from './api';
import { ApiResponse, Interest } from '../types';

export const interestsService = {
  sendInterest: async (toUserId: string): Promise<ApiResponse<void>> => {
    return new Promise((resolve) => setTimeout(() => resolve({ success: true }), 500));
  },

  getReceivedInterests: async (): Promise<ApiResponse<Interest[]>> => {
    return new Promise((resolve) => setTimeout(() => resolve({ success: true, data: [] }), 800));
  },

  getSentInterests: async (): Promise<ApiResponse<Interest[]>> => {
    return new Promise((resolve) => setTimeout(() => resolve({ success: true, data: [] }), 800));
  },

  updateInterest: async (interestId: string, status: 'accepted' | 'rejected'): Promise<ApiResponse<void>> => {
    return new Promise((resolve) => setTimeout(() => resolve({ success: true }), 500));
  }
};
