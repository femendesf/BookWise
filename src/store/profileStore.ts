// src/store/profileStore.ts
import { create } from 'zustand';

type Book = {
  title: string;
  author: string | string[];
  cover: string;
  rating: number;
  description: string;
  dateLastReading: string;
  pages: number;
  categories: string[];
};

type ProfileState = {
  hasFetched: boolean;
  createdAt: Date | null;
  bookItems: Book[];
  totPagesRead: number;
  uniqueAuthors: string[];
  categoryMoreRead: string | null;
  setProfileData: (data: Omit<ProfileState, 'hasFetched' | 'setProfileData'>) => void;
  setHasFetched: () => void;
};

export const useProfileStore = create<ProfileState>((set) => ({
  hasFetched: false,
  createdAt: null,
  bookItems: [],
  totPagesRead: 0,
  uniqueAuthors: [],
  categoryMoreRead: null,
  setProfileData: (data) => set({ ...data }),
  setHasFetched: () => set({ hasFetched: true }),
}));
