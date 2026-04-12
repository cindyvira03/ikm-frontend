import { Product } from "@/types/product"

export interface Kategori {
  id: number
  nama_kategori: string
  slug: string
}

export interface ProdukResponse {
  success: boolean
  kategori: Kategori[]
  produk: Product[]
}

export interface ProdukKategoriResponse extends ProdukResponse {
  currentKategori: Kategori
}

export const getProducts = async (): Promise<ProdukResponse> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/produk-ikm`,
    {
      next: { revalidate: 60 },
    }
  )

  if (!res.ok) {
    throw new Error("Gagal mengambil data produk")
  }

  return res.json()
}

export const getProductsByCategory = async (
  slug: string
): Promise<ProdukKategoriResponse> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/produk-ikm/kategori/${slug}`,
    {
      next: { revalidate: 60 },
    }
  )

  if (!res.ok) {
    throw new Error("Gagal mengambil data kategori produk")
  }

  return res.json()
}

export interface ProdukDetailResponse {
  success: boolean
  produk: Product
}

export const getProductById = async (
  id: string
): Promise<ProdukDetailResponse> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/produk-ikm/${id}`,
    {
      next: { revalidate: 60 },
    }
  )

  if (!res.ok) {
    throw new Error("Gagal mengambil detail produk")
  }

  return res.json()
}