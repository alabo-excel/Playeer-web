import { atomWithStorage } from 'jotai/utils';

export interface User {
  fullName: string;
  email: string;
  username?: string;
  dateOfBirth?: Date;
  profilePicture?: string;
  country?: string;
  city?: string;
  gender?: 'male' | 'female' | 'other';
  height?: string;
  weight?: string;
  currentTeam?: string;
  previousClub?: string;
  yearsOfExperience?: string;
  mainPosition?: string;
  secondaryPosition?: string;
  dominantFoot?: 'left' | 'right' | 'both';
  jerseyNumber?: string;
  plan: 'free' | 'monthly' | 'yearly';
  renewalDate?: Date;
  profileViews?: string[];
  highlightPlays?: number;
  footballJourney?: FootballJourneyEntry[];
  achievements?: Achievement[];
  certificates?: Certificate[];
  welcome: boolean;
  isActive: boolean;
  isVerified: boolean;
  isDeleted: boolean;
  role: 'user' | 'admin' | 'moderator';
  lastLogin?: Date;
  createdAt: Date;
  updatedAt: Date;
  _id: string;
  visibility: 'public' | 'private'
  address?: string; // New field for address
  phone?: string; // New field for phone number
  [key: string]: any; // Allow additional properties
}

export interface FootballJourneyEntry {
  teamName: string;
  position: string;
  from: Date;
  to: Date;
  keyHighlights?: string;
  [key: string]: any; // Allow additional properties
}

export interface Achievement {
  title: string;
  competitionName: string;
  organizer: string;
  date: Date;
  description?: string;
  photo?: string;
  [key: string]: any; // Allow additional properties
}

export interface Certificate {
  certificateTitle: string;
  issuedBy: string;
  dateIssued: Date;
  description?: string;
  photo?: string;
  [key: string]: any; // Allow additional properties
}


// This will persist the user atom in localStorage under the key 'user'
export const userAtom = atomWithStorage<User | null>('user', null); 