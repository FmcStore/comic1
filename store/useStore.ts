import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface Item {
  uuid?: string; slug: string; title: string; image: string;
  lastChapterTitle?: string; updatedAt: number;
}

interface StoreState {
  history: Item[]; bookmarks: Item[];
  addToHistory: (item: Item) => void;
  toggleBookmark: (item: Item) => void;
  isBookmarked: (slug: string) => boolean;
}

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      history: [], bookmarks: [],
      addToHistory: (item) => set((state) => ({
        history: [item, ...state.history.filter(h => h.slug !== item.slug)].slice(0, 50)
      })),
      toggleBookmark: (item) => set((state) => {
        const exists = state.bookmarks.find(b => b.slug === item.slug);
        return { bookmarks: exists ? state.bookmarks.filter(b => b.slug !== item.slug) : [item, ...state.bookmarks] };
      }),
      isBookmarked: (slug) => !!get().bookmarks.find(b => b.slug === slug),
    }),
    { name: 'fmc-storage', storage: createJSONStorage(() => localStorage) }
  )
);
