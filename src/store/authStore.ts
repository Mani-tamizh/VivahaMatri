import { create } from 'zustand';
import * as SecureStore from 'expo-secure-store';

export interface User {
  id?: string;
  phone?: string;
  profileCompleted?: boolean;
}

interface AuthStoreState {
  isAuthenticated: boolean;
  isNewUser: boolean;
  isOnboardingComplete: boolean;
  user: User | null;
  accessToken: string | null;
  
  // Actions
  setAuthSession: (session: {
    user: User | null;
    accessToken: string;
    refreshToken: string;
    isExistingUser: boolean;
  }) => Promise<void>;
  setOnboardingComplete: () => void;
  logout: () => Promise<void>;
  restoreSession: (accessToken: string, user?: User) => void;
}

export const useAuthStore = create<AuthStoreState>((set) => ({
  isAuthenticated: false,
  isNewUser: false,
  isOnboardingComplete: false,
  user: null,
  accessToken: null,

  setAuthSession: async (session) => {
    // Persist securely
    await SecureStore.setItemAsync('accessToken', session.accessToken);
    await SecureStore.setItemAsync('refreshToken', session.refreshToken);
    
    // Update State
    set({
      isAuthenticated: true,
      accessToken: session.accessToken,
      user: session.user,
      isNewUser: !session.isExistingUser,
      isOnboardingComplete: session.user?.profileCompleted || false,
    });
  },

  setOnboardingComplete: () => set({ isOnboardingComplete: true }),

  logout: async () => {
    await SecureStore.deleteItemAsync('accessToken');
    await SecureStore.deleteItemAsync('refreshToken');
    set({
      isAuthenticated: false,
      isNewUser: false,
      isOnboardingComplete: false,
      user: null,
      accessToken: null,
    });
  },

  restoreSession: (accessToken, user) => set({
    isAuthenticated: true,
    accessToken,
    user: user || null,
    isOnboardingComplete: user?.profileCompleted || false,
  }),
}));
