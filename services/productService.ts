import axiosInstance from "@/lib/axios"
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
  const response = await axiosInstance.get("/produk-ikm")
  return response.data
}

export const getProductsByCategory = async (
  slug: string
): Promise<ProdukKategoriResponse> => {
  const response = await axiosInstance.get(
    `/produk-ikm/kategori/${slug}`
  )
  return response.data
}

export interface ProdukDetailResponse {
  success: boolean
  produk: Product
}

export const getProductById = async (
  id: string
): Promise<ProdukDetailResponse> => {
  const response = await axiosInstance.get(`/produk-ikm/${id}`)
  return response.data
}