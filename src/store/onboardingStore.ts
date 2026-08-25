import { create } from 'zustand';

export interface OnboardingState {
  profilePhotoUri?: string;
  name?: string;
  gender?: string;
  dob?: string;
  marital_status?: string;
  no_of_kids?: string;
  mother_tongue?: string;
  height_cm?: string;
  weight_kg?: string;
  body_type?: string;
  blood_group?: string;
  complexion?: string;
  physical_status?: string;
  diet?: string;
  smoke?: string;
  drink?: string;
  caste?: string;
  sub_caste?: string;
  gothram?: string;
  star?: string;
  rasi?: string;
  education?: string;
  occupation?: string;
  annual_income?: string;
  country?: string;
  state?: string;
  city?: string;
  father_name?: string;
  mother_name?: string;
  family_status?: string;
  family_type?: string;
  family_location?: string;
  siblings_details?: string;
  about?: string;
  expectations?: string;
  phone?: string;
  whatsapp_number?: string;
  email?: string;
  declare_truth?: boolean;
  declare_share_consent?: boolean;
}

interface OnboardingStore {
  data: OnboardingState;
  updateData: (newData: Partial<OnboardingState>) => void;
  resetOnboarding: () => void;
}

const initialState: OnboardingState = {
  country: 'India', // Default as per requirements
};

export const useOnboardingStore = create<OnboardingStore>((set) => ({
  data: initialState,
  updateData: (newData) =>
    set((state) => ({
      data: { ...state.data, ...newData },
    })),
  resetOnboarding: () => set({ data: initialState }),
}));
