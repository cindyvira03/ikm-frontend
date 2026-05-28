import { Product } from "./product"

export interface IKMHome {
  id: number
  nama_usaha: string
  slug: string
  gambar: string
}

export interface ArtikelHome {
  id: number
  judul: string
  slug: string
  gambar: string
  created_at: string
}

export interface HomeResponse {
  success: boolean
  produk: Product[]
  ikm: IKMHome[]
  artikel: ArtikelHome[]
}