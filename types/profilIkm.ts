export interface Kategori {
  id: number
  nama_kategori: string
}

export interface Outlet {
  id: number
  alamat: string
  lokasi_googlemap: string
  foto_lokasi_tampak_depan?: string | null
}

export interface Produk {
  id: number
  nama_produk: string
  jenis_produk?: string | null
  harga: number
  foto?: string | null
}

export interface ProfilIkm {
  id: number
  nama_usaha: string
  gambar: string | null
  deskripsi?: string | null
  deskripsi_singkat?: string | null
  no_telp?: string | null
  merek?: string | null
  status?: "pending" | "aktif" | "tidak_aktif"
  no_rekening?: string
  jenis_rekening?: string
  nama_rekening?: string

  kategori: Kategori
  outlets?: Outlet[]
  produk?: Produk[]
}

export interface UserIKM {
  id: number
  name: string
  role: string
  profilIkm: ProfilIkm
}

export interface ProfilIkmResponse {
  user: {
    id: number
    name: string
    role: string
  }

  profil_ikm: ProfilIkm

  kategoris: Kategori[]
}