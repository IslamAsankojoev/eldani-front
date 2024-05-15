import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

interface FavouriteStore {
  favourites: number[]
  addFavorite: (id: number) => void
  removeFavorite: (id: number) => void
  clearFavorites: () => void
}

export const useFavouriteStore = create<FavouriteStore, any>(
  persist(
    (set, get) => ({
      favourites: [],
      addFavorite: (id: number) =>
        set({ favourites: [...get().favourites, id] }),
      removeFavorite: (id: number) =>
        set({ favourites: get().favourites.filter((f: number) => f !== id) }),
      clearFavorites: () => set({ favourites: [] }),
    }),
    {
      name: 'favorites-store',
      storage: createJSONStorage(() => localStorage),
    },
  ),
)
