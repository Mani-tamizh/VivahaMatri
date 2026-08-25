import { User } from '../store/authStore';

export interface VerifyOtpResponse {
  success: boolean;
  isExistingUser: boolean;
  user?: User;
  accessToken: string;
  refreshToken: string;
}

class AuthService {
  async sendOtp(phone: string): Promise<boolean> {
    console.log(`[API Mock] Sending OTP to ${phone}`);
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    return true;
  }

  async verifyOtp(phone: string, otp: string): Promise<VerifyOtpResponse> {
    console.log(`[API Mock] Verifying OTP ${otp} for ${phone}`);
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Mock logic based on user request:
    // Normalize phone to remove spaces or formatting
    const normalizedPhone = phone.replace(/[^0-9]/g, '');
    
    // If phone is 9999999999 or 9715062195, pretend they are an existing user
    const isExistingUser = normalizedPhone.includes('9999999999') || normalizedPhone.includes('9715062195');

    return {
      success: true,
      isExistingUser,
      user: {
        id: isExistingUser ? 'user-123' : 'user-new',
        phone,
        profileCompleted: isExistingUser,
      },
      accessToken: 'mock-access-token-123',
      refreshToken: 'mock-refresh-token-456',
    };
  }
}

export const authService = new AuthService();
