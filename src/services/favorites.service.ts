import { apiClient } from './api';
import { ApiResponse, UserProfile } from '../types';
import { mockProfiles } from '../lib/mockData';

export const favoritesService = {
  getFavorites: async (): Promise<ApiResponse<UserProfile[]>> => {
    // MOCK IMPLEMENTATION
    return new Promise((resolve) => setTimeout(() => resolve({ success: true, data: [mockProfiles[0]] }), 600));
  },

  addFavorite: async (profileId: string): Promise<ApiResponse<void>> => {
    // MOCK IMPLEMENTATION
    return new Promise((resolve) => setTimeout(() => resolve({ success: true }), 300));
  },

  removeFavorite: async (profileId: string): Promise<ApiResponse<void>> => {
    // MOCK IMPLEMENTATION
    return new Promise((resolve) => setTimeout(() => resolve({ success: true }), 300));
  }
};
