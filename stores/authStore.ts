import { create } from "zustand"

type User = {
  id: number
  name: string
  role: string
} | null

type AuthState = {
  user: User
  setUser: (user: User) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  // 🔥 LANGSUNG AMBIL DARI LOCALSTORAGE (INIT)
  user:
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("user") || "null")
      : null,

  setUser: (user) => {
    localStorage.setItem("user", JSON.stringify(user))
    set({ user }) // 🔥 ini trigger semua komponen
  },

  logout: () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    set({ user: null }) // 🔥 langsung update navbar
  },
}))