import { z } from 'zod';

// Step 2: About You
export const aboutYouSchema = z.object({
  name: z.string().min(2, 'Name is required').max(50),
  gender: z.enum(['Male', 'Female'], { required_error: 'Gender is required' }),
  dob: z.string().min(1, 'Date of Birth is required'),
  marital_status: z.enum(['Unmarried', 'Divorced', 'Widowed', 'Separated'], { required_error: 'Marital status is required' }),
  no_of_kids: z.string().optional(), // We'll handle conditional logic in the component
  mother_tongue: z.string().min(1, 'Mother tongue is required'),
});

// Step 3: Personal Details
export const personalDetailsSchema = z.object({
  height_cm: z.string().min(1, 'Height is required'),
  weight_kg: z.string().optional(),
  body_type: z.string().optional(),
  blood_group: z.string().optional(),
  complexion: z.string().optional(),
  physical_status: z.string().optional(),
  diet: z.string().optional(),
  smoke: z.string().optional(),
  drink: z.string().optional(),
});

// Step 4: Community
export const communitySchema = z.object({
  caste: z.string().optional(),
  sub_caste: z.string().optional(),
  gothram: z.string().optional(),
  star: z.string().optional(),
  rasi: z.string().optional(),
});

// Step 5: Education & Career
export const educationCareerSchema = z.object({
  education: z.string().min(1, 'Highest education is required'),
  occupation: z.string().min(1, 'Occupation is required'),
  annual_income: z.string().optional(),
});

// Step 6: Location
export const locationSchema = z.object({
  country: z.string().min(1, 'Country is required'),
  state: z.string().min(1, 'State is required'),
  city: z.string().min(1, 'City is required'),
});

// Step 7: Family
export const familySchema = z.object({
  father_name: z.string().optional(),
  mother_name: z.string().optional(),
  family_status: z.string().optional(),
  family_type: z.string().optional(),
  family_location: z.string().optional(),
  siblings_details: z.string().optional(),
});

// Step 8: About & Expectations
export const aboutExpectationsSchema = z.object({
  about: z.string().max(500, 'Maximum 500 characters allowed').optional(),
  expectations: z.string().max(500, 'Maximum 500 characters allowed').optional(),
});

// Step 9: Contact & Consent
export const contactConsentSchema = z.object({
  whatsapp_number: z.string().optional(),
  email: z.string().email('Invalid email address').optional().or(z.literal('')),
  declare_truth: z.literal(true, {
    errorMap: () => ({ message: 'You must confirm the information is true' }),
  }),
  declare_share_consent: z.literal(true, {
    errorMap: () => ({ message: 'You must agree to share your profile' }),
  }),
});

// Types inferred from schemas
export type AboutYouForm = z.infer<typeof aboutYouSchema>;
export type PersonalDetailsForm = z.infer<typeof personalDetailsSchema>;
export type CommunityForm = z.infer<typeof communitySchema>;
export type EducationCareerForm = z.infer<typeof educationCareerSchema>;
export type LocationForm = z.infer<typeof locationSchema>;
export type FamilyForm = z.infer<typeof familySchema>;
export type AboutExpectationsForm = z.infer<typeof aboutExpectationsSchema>;
export type ContactConsentForm = z.infer<typeof contactConsentSchema>;
