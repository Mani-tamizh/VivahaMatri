import { apiClient } from './api';
import { ApiResponse, UserProfile } from '../types';
import { mockCurrentUser } from '../lib/mockData';

export const profileService = {
  getMyProfile: async (): Promise<ApiResponse<UserProfile>> => {
    // return apiClient.get('/profile/me').then(res => res.data);
    
    // MOCK IMPLEMENTATION
    return new Promise((resolve) => setTimeout(() => resolve({ success: true, data: mockCurrentUser }), 800));
  },

  updateProfile: async (data: Partial<UserProfile>): Promise<ApiResponse<UserProfile>> => {
    // return apiClient.put('/profile/me', data).then(res => res.data);
    
    // MOCK IMPLEMENTATION
    return new Promise((resolve) => setTimeout(() => resolve({ success: true, data: { ...mockCurrentUser, ...data } as UserProfile }), 800));
  },

  uploadProfilePhoto: async (uri: string): Promise<ApiResponse<{ url: string }>> => {
    // const formData = new FormData();
    // formData.append('photo', { uri, name: 'photo.jpg', type: 'image/jpeg' } as any);
    // return apiClient.post('/profile/me/photo', formData, {
    //   headers: { 'Content-Type': 'multipart/form-data' }
    // }).then(res => res.data);

    // MOCK IMPLEMENTATION
    return new Promise((resolve) => setTimeout(() => resolve({ success: true, data: { url: uri } }), 1000));
  }
};
