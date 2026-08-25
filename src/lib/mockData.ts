import { UserProfile } from "../types";

export const mockProfiles: UserProfile[] = [
  // Recommended
  {
    id: "1",
    name: "Priya Sharma",
    age: 26,
    height: "5'5\"",
    location: "Chennai, Tamil Nadu",
    education: "B.Tech",
    occupation: "Software Engineer",
    about:
      "I am a fun-loving and ambitious person. I enjoy traveling, trying new cuisines, and reading fiction.",
    profilePhotoUrl:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&q=80",
    membershipStatus: "none",
    isVerified: true,
    isOnline: true,
    partnerPreferences: {
      minAge: 26,
      maxAge: 30,
      minHeight: "5'8\"",
      location: ["Chennai"],
    },
  },
  {
    id: "2",
    name: "Ananya Nair",
    age: 27,
    height: "5'6\"",
    location: "Bengaluru, Karnataka",
    education: "MBBS, MD",
    occupation: "Doctor",
    about:
      "Passionate about healthcare. I value honesty, family traditions, and a good sense of humor.",
    profilePhotoUrl:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&q=80",
    membershipStatus: "active",
    isVerified: true,
    isOnline: true,
    partnerPreferences: {
      minAge: 27,
      maxAge: 32,
      minHeight: "5'9\"",
      location: ["Bengaluru"],
    },
  },
  {
    id: "3",
    name: "Sneha Iyer",
    age: 25,
    height: "5'4\"",
    location: "Hyderabad, Telangana",
    education: "B.Des",
    occupation: "Product Designer",
    about: "Creative, empathetic, and organized.",
    profilePhotoUrl:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&q=80",
    membershipStatus: "none",
    isVerified: true,
    isOnline: true,
    partnerPreferences: {
      minAge: 25,
      maxAge: 29,
      minHeight: "5'7\"",
      location: ["Hyderabad"],
    },
  },

  // Recently Joined
  {
    id: "4",
    name: "Meena K",
    age: 24,
    height: "5'3\"",
    location: "Coimbatore",
    education: "B.Sc",
    occupation: "Analyst",
    about: "Simple and sweet.",
    profilePhotoUrl:
      "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?w=800&q=80",
    membershipStatus: "none",
    isVerified: false,
    isOnline: true,
    partnerPreferences: {
      minAge: 24,
      maxAge: 28,
      minHeight: "5'5\"",
      location: ["Coimbatore"],
    },
  },
  {
    id: "5",
    name: "Kavya R",
    age: 25,
    height: "5'5\"",
    location: "Madurai",
    education: "M.Com",
    occupation: "Accountant",
    about: "Traditional values with a modern outlook.",
    profilePhotoUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&q=80",
    membershipStatus: "none",
    isVerified: false,
    isOnline: true,
    partnerPreferences: {
      minAge: 25,
      maxAge: 30,
      minHeight: "5'7\"",
      location: ["Madurai"],
    },
  },
  {
    id: "6",
    name: "Harini S",
    age: 27,
    height: "5'6\"",
    location: "Trichy",
    education: "B.E",
    occupation: "Quality Analyst",
    about: "Looking for an understanding partner.",
    profilePhotoUrl:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=800&q=80",
    membershipStatus: "none",
    isVerified: false,
    isOnline: true,
    partnerPreferences: {
      minAge: 27,
      maxAge: 32,
      minHeight: "5'8\"",
      location: ["Trichy"],
    },
  },
  {
    id: "7",
    name: "Divya M",
    age: 26,
    height: "5'4\"",
    location: "Salem",
    education: "MCA",
    occupation: "Software Engineer",
    about: "Techie by profession, foodie by heart.",
    profilePhotoUrl:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&q=80",
    membershipStatus: "none",
    isVerified: false,
    isOnline: true,
    partnerPreferences: {
      minAge: 26,
      maxAge: 31,
      minHeight: "5'6\"",
      location: ["Salem"],
    },
  },
];

export const mockCurrentUser: UserProfile = {
  id: "me_123",
  name: "Manikandan",
  age: 28,
  height: "5'10\"",
  location: "Chennai, Tamil Nadu",
  education: "M.Sc Computer Science",
  occupation: "Product Manager",
  about: "Looking for a meaningful connection.",
  profilePhotoUrl:
    "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=800&q=80",
  membershipStatus: "active", // Set to active to match design "Premium Member"
  partnerPreferences: {
    minAge: 24,
    maxAge: 29,
    minHeight: "5'4\"",
    location: ["Chennai"],
  },
};
