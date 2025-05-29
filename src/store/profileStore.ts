import { create } from 'zustand'

interface ProfileData {
  createdAt: string | null
  bookItems: any[]
  totPagesRead: number
  uniqueAuthors?: string[] 
  categoryMoreRead: string
  reviews: number
}

interface ProfileState extends ProfileData {
  hasFetched: boolean
  setProfileData: (data: ProfileData) => void
  setHasFetched: (value: boolean) => void
}

export const useProfileStore = create<ProfileState>((set) => ({
  createdAt: null,
  bookItems: [],
  totPagesRead: 0,
  uniqueAuthors: [],
  categoryMoreRead: '',
  hasFetched: false,
  reviews: 0,

  setProfileData: (data) => set(() => ({
    ...data
  })),

  setHasFetched: (value) => set({ hasFetched: value })
}))
