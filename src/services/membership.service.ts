import { apiClient } from './api';
import { ApiResponse } from '../types';

export const membershipService = {
  getMembership: async (): Promise<ApiResponse<{ status: 'active' | 'expired' | 'none', expiresAt?: string }>> => {
    // MOCK IMPLEMENTATION
    return new Promise((resolve) => setTimeout(() => resolve({ success: true, data: { status: 'none' } }), 500));
  },

  createPaymentOrder: async (planId: string): Promise<ApiResponse<{ orderId: string, amount: number }>> => {
    // MOCK IMPLEMENTATION
    return new Promise((resolve) => setTimeout(() => resolve({ success: true, data: { orderId: 'order_123', amount: 1000 } }), 1000));
  },

  verifyPayment: async (paymentId: string, signature: string): Promise<ApiResponse<{ success: boolean }>> => {
    // MOCK IMPLEMENTATION
    return new Promise((resolve) => setTimeout(() => resolve({ success: true, data: { success: true } }), 1000));
  }
};
