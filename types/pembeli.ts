export interface PembeliProfile {
  nama_lengkap: string
  jenis_kelamin: "L" | "P"
  no_hp: string
  name: string
  email: string
}

export interface PembeliProfileResponse {
  success: boolean
  data: PembeliProfile
}