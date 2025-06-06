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
  hasFetched: number
  setProfileData: (data: ProfileData) => void
  setHasFetched: () => void
}

export const useProfileStore = create<ProfileState>((set) => ({
  createdAt: null,
  bookItems: [],
  totPagesRead: 0,
  uniqueAuthors: [],
  categoryMoreRead: '',
  hasFetched: 0,
  reviews: 0,

  setProfileData: (data) => set(() => ({
    ...data
  })),

   setHasFetched: () => set((state) => ({ hasFetched: state.hasFetched + 1 }))
}))
