// stores/bookStore.ts
import { create } from 'zustand';

type Book = any; // Idealmente, substitua por um tipo mais preciso

type BookStoreState = {
  booksByGenre: Record<string, Book[]>;
  setBooksForGenre: (genre: string, books: Book[]) => void;
  getBooksForGenre: (genre: string) => Book[] | undefined;
};

export const useBookStore = create<BookStoreState>((set, get) => ({
  booksByGenre: {},

  setBooksForGenre: (genre, books) => {
    set((state) => ({
      booksByGenre: {
        ...state.booksByGenre,
        [genre]: books
      }
    }));
  },

  getBooksForGenre: (genre) => {
    return get().booksByGenre[genre];
  }
}));
