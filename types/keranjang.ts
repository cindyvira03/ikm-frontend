export type Keranjang = {
  id: number
  pembeli_id: number
  ikm_id: number
  status: string
  detail: DetailKeranjang[]
}

export type DetailKeranjang = {
  id: number
  keranjang_id: number
  produk_id: number
  qty: number
  harga: number
  produk: {
    id: number
    nama_produk: string
    harga: number
    foto: string
  }
}