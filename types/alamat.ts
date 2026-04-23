export interface AlamatPembeli {
  id: number
  pembeli_id: number

  nama_penerima: string
  no_hp: string

  provinsi: string
  kota_kab: string
  kecamatan: string
  kode_pos: string

  alamat_lengkap: string

  is_default: boolean
  status: "aktif" | "tidak_aktif"

  created_at?: string
  updated_at?: string
}

export interface AlamatPembeliResponse {
  success: boolean
  message?: string
  data: AlamatPembeli[]
}