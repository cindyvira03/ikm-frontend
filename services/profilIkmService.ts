import { ProfilIkm } from "@/types/profilIkm"

interface ProfilIkmListResponse {
  success: boolean
  ikm: ProfilIkm[]
}

interface ProfilIkmDetailResponse {
  success: boolean
  ikm: ProfilIkm
}

export async function getProfilIkm(): Promise<{ ikm: ProfilIkm[] }> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/profil-ikm`,
    { next: { revalidate: 60 }, }
  )

  if (!res.ok) {
    throw new Error("Gagal mengambil data profil IKM")
  }

  const data: ProfilIkmListResponse = await res.json()

  return { ikm: data.ikm }
}

export async function getProfilIkmDetail(
  id: string
): Promise<{ ikm: ProfilIkm }> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/profil-ikm/${id}`,
    { next: { revalidate: 60 }, }
  )

  if (!res.ok) {
    throw new Error("Gagal mengambil detail profil IKM")
  }

  const data: ProfilIkmDetailResponse = await res.json()

  return { ikm: data.ikm }
}