import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

interface CartItem extends Pattern {}

interface CartStore {
  cart: CartItem[]
  addToCart: (pattern: CartItem) => void
  removeFromCart: (id: number) => void
  clearCart: () => void
}

export const useCartStore = create<CartStore, any>(
  persist(
    (set, get) => ({
      cart: [],
      addToCart: (pattern: CartItem) => set({ cart: [...get().cart, pattern] }),
      removeFromCart: (id: number) =>
        set({ cart: get().cart.filter((f: CartItem) => f.id !== id) }),
      clearCart: () => set({ cart: [] }),
    }),
    {
      name: 'cart-store',
      storage: createJSONStorage(() => localStorage),
    },
  ),
)
