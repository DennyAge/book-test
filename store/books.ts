import { create } from "zustand";
import { mockBooks } from "@/constants";

interface BookStore {
  books: Book[];
  fetchBooks: () => Promise<void>;
  addBook: (book: Omit<Book, "id" | "isFavorite">) => void;
  toggleFavorite: (id: number) => void;
}

export const useBookStore = create<BookStore>((set) => ({
  books: [],
  fetchBooks: async () => {
    await new Promise((res) => setTimeout(res, 500)); // Имитация задержки
    set({ books: mockBooks });
  },
  addBook: (book) =>
    set((state) => ({
      books: [{ id: Date.now(), isFavorite: false, ...book }, ...state.books],
    })),
  toggleFavorite: (id) =>
    set((state) => ({
      books: state.books.map((book) =>
        book.id === id ? { ...book, isFavorite: !book.isFavorite } : book,
      ),
    })),
}));
