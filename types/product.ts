export interface Kategori {
  id: number
  nama_kategori: string
  slug: string
}

export interface IKM {
  id: number
  nama_usaha: string
  no_telp?: string
  kategori: Kategori
}

export interface Product {
  id: number
  nama_produk: string
  harga: number
  stok: number
  foto: string
  ikm: IKM
  jenis_produk: string
  varian: string
  ukuran: string
  deskripsi: string
  berat: number
}