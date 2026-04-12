export interface Pembeli {
  id: number
  nama_lengkap: string
}

export interface Pesanan {
  id: number
  no_pesanan: string
  total_bayar: number
  status_pesanan: string
  metode_pengiriman: string
  created_at: string

  pembeli?: {
    nama_lengkap: string
  }

  detail?: DetailPesanan[]

  pengiriman?: {
    kurir?: string
    ongkir?: number
    no_resi?: string
  }

   status_pembayaran?: string

  pembayaran?: {
    id: number
    status_pembayaran: string
    bukti_transfer_url: string
    keterangan?: string
  }

  alamat?: {
  nama_penerima: string
  no_hp: string
  provinsi: string
  kota_kab: string
  kecamatan: string
  kode_pos: string
  alamat_lengkap: string
}

 outlet?: {
    provinsi: string
    kota_kab: string
    kecamatan: string
    lokasi_googlemap?: string
  }
}

export interface PesananResponse {
  data: Pesanan[]
  current_page: number
  last_page: number
}

export interface DetailPesanan {
  id: number
  produk_id: number
  qty: number
  harga: number
  produk: {
    nama_produk: string
    foto?: string
  }
}

export interface CheckoutData {
  subtotal: number
  ongkir: number
  total_bayar: number
  outlets?: {
    id: string | number
    provinsi: string
    kota_kab: string
    kecamatan: string
    lokasi_googlemap?: string
  }[]
}