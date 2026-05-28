import { HomeResponse } from "@/types/home"

export const getHome = async (): Promise<HomeResponse> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/home`,
    {
      next: { revalidate: 60 }, // ✅ cache 60 detik
    }
  )

  if (!res.ok) {
    throw new Error("Gagal mengambil data homepage")
  }

  return res.json()
}