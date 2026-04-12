import { create } from "zustand"

type CartState = {
  cartCount: number
  setCartCount: (count: number) => void
  fetchCart: () => Promise<void>
}

export const useCartStore = create<CartState>((set) => ({
  cartCount: 0,

  setCartCount: (count) => set({ cartCount: count }),

  fetchCart: async () => {
    try {
      const token = localStorage.getItem("token")
      if (!token) {
        set({ cartCount: 0 })
        return
      }

      const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

        const res = await fetch(`${BASE_URL}/pembeli/keranjang`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

      if (!res.ok) {
        set({ cartCount: 0 })
        return
      }

      const data = await res.json()

      const total = data.total_item || 0

      set({ cartCount: total })
    } catch (err) {
      console.error("Gagal fetch cart", err)
      set({ cartCount: 0 })
    }
  },
}))