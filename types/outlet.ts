export interface Outlet {
  id: number
  alamat: string
  lokasi_googlemap: string
  cara_order: string
  provinsi: string
  kota_kab: string
  kecamatan: string
  foto_lokasi_tampak_depan: string | null

  profilIkm?: {
    nama_usaha: string
    kategori: {
      nama_kategori: string
    }
  }
}