import { ProfilIkm } from "@/types/profilIkm"

import { Pagination } from "@/types/pagination"

interface ProfilIkmListResponse {
  success: boolean
  ikm: Pagination<ProfilIkm> // 🔥 INI KUNCI
}

interface ProfilIkmDetailResponse {
  success: boolean
  ikm: ProfilIkm
}

export async function getProfilIkm(page = 1): Promise<ProfilIkmListResponse> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/profil-ikm?page=${page}`,
    {
      next: { revalidate: 60 },
    }
  )

  if (!res.ok) {
    throw new Error("Gagal mengambil data profil IKM")
  }

  return res.json()
}

export async function getProfilIkmDetail(
  slug: string
): Promise<{ ikm: ProfilIkm }> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/profil-ikm/${slug}`,
    { next: { revalidate: 60 }, }
  )

  if (!res.ok) {
    throw new Error("Gagal mengambil detail profil IKM")
  }

  const data: ProfilIkmDetailResponse = await res.json()

  return { ikm: data.ikm }
}