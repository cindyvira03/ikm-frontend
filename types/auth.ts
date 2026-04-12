export interface LoginResponse {
  message: string
  token: string
  user: {
    id: number
    name: string
    email: string
    role: "admin" | "ikm" | "pembeli"
  }
}

export interface RegisterPembeliPayload {
  nama_lengkap: string
  jenis_kelamin: "L" | "P"
  no_hp: string
  name: string
  email: string
  password: string
  password_confirmation: string
}

export interface RegisterIkmPayload {
  nama_usaha: string
  no_telp: string
  merek: string
  kategori_id: number
  name: string
  email: string
  password: string
  password_confirmation: string
}

export interface AuthResponse {
  message: string
  user: any
}