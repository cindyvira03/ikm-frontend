import { LoginResponse } from "@/types/auth"
import {
  RegisterPembeliPayload,
  RegisterIkmPayload,
  AuthResponse,
} from "@/types/auth"

export async function login(email: string, password: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({ email, password }),
    }
  )

  const data: LoginResponse = await res.json()

  if (!res.ok) {
    throw new Error(data.message || "Login gagal")
  }

  return data
}

export async function registerPembeli(
  payload: RegisterPembeliPayload
): Promise<AuthResponse> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/register/pembeli`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    body: JSON.stringify(payload),
  })

  const data = await res.json()

  if (!res.ok) {
    throw new Error(data.message || "Registrasi gagal")
  }

  return data
}

export async function registerIkm(
  payload: RegisterIkmPayload
): Promise<AuthResponse> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/register/ikm`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    body: JSON.stringify(payload),
  })

  const data = await res.json()

  if (!res.ok) {
    throw new Error(data.message || "Registrasi gagal")
  }

  return data
}