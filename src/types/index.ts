export interface ApiResponse<T> {
  data?: T;
  error?: string;
  success: boolean;
}

export type AuthState = 'unauthenticated' | 'authenticated' | 'onboarding_required' | 'active_membership' | 'expired_membership';

export interface UserProfile {
  id: string;
  name: string;
  age: number;
  height: string; // e.g. "5'9"
  location: string;
  education: string;
  occupation: string;
  about: string;
  profilePhotoUrl: string;
  membershipStatus: 'active' | 'expired' | 'none';
  contactNumber?: string; // Requires active membership to view in API
  isVerified?: boolean;
  isOnline?: boolean;
  partnerPreferences: PartnerPreferences;
}

export interface PartnerPreferences {
  minAge: number;
  maxAge: number;
  minHeight: string;
  location: string[];
}

export interface Interest {
  id: string;
  fromUserId: string;
  toUserId: string;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: string;
  userProfile?: UserProfile; // Joined data
}

export interface Notification {
  id: string;
  title: string;
  body: string;
  read: boolean;
  createdAt: string;
}
