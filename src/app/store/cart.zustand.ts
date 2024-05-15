import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

interface CartStore {
  cart: number[]
  addToCart: (id: number) => void
  removeFromCart: (id: number) => void
  clearCart: () => void
}

export const useCartStore = create<CartStore, any>(
  persist(
    (set, get) => ({
      cart: [],
      addToCart: (id: number) => set({ cart: [...get().cart, id] }),
      removeFromCart: (id: number) =>
        set({ cart: get().cart.filter((f: number) => f !== id) }),
      clearCart: () => set({ cart: [] }),
    }),
    {
      name: 'cart-store',
      storage: createJSONStorage(() => localStorage),
    },
  ),
)
