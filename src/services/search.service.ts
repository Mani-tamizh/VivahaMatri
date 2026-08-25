import { apiClient } from './api';
import { ApiResponse, UserProfile } from '../types';
import { mockProfiles } from '../lib/mockData';

export const searchService = {
  searchProfiles: async (filters?: any): Promise<ApiResponse<UserProfile[]>> => {
    // MOCK IMPLEMENTATION
    return new Promise((resolve) => setTimeout(() => resolve({ success: true, data: mockProfiles }), 800));
  },

  getProfileById: async (id: string): Promise<ApiResponse<UserProfile>> => {
    // MOCK IMPLEMENTATION
    const profile = mockProfiles.find(p => p.id === id);
    return new Promise((resolve) => setTimeout(() => {
      if (profile) {
        resolve({ success: true, data: profile });
      } else {
        resolve({ success: false, error: 'Profile not found' });
      }
    }, 500));
  }
};
