const API_URL = process.env.NEXT_PUBLIC_API_URL

export const getToken = () => {
  if (typeof window === "undefined") return null

  const token = localStorage.getItem("token")

  if (!token || token === "null" || token === "undefined") {
    return null
  }

  return token
}

// ✅ cek apakah token valid ke backend
export const checkAuth = async () => {
  const token = getToken()

  if (!token) return false

  try {
    const res = await fetch(`${API_URL}/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (!res.ok) {
      localStorage.removeItem("token") // 🧹 auto bersihin token invalid
      return false
    }

    return true
  } catch {
    return false
  }
}

export const getKeranjang = async () => {
  const token = getToken()

  if (!token) {
    throw new Error("NO_TOKEN")
  }

  const res = await fetch(`${API_URL}/pembeli/keranjang`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (!res.ok) {
    throw new Error("FAILED_FETCH")
  }

  return res.json()
}

// ✅ add to cart aman
export const addToKeranjang = async (produk_id: number, qty: number = 1) => {
  const token = getToken()

  if (!token) {
    throw new Error("NO_TOKEN")
  }

  const res = await fetch(`${API_URL}/pembeli/keranjang`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      produk_id,
      qty,
    }),
  })

  const data = await res.json()

  // 🔥 HANDLE ERROR DI SINI
  if (res.status === 403) {
    localStorage.removeItem("token")
    throw new Error("FORBIDDEN")
  }

  // 🔥 INI YANG KURANG
  if (res.status === 409) {
    throw new Error(data.message) // ⬅️ kirim pesan dari backend
  }

  if (!res.ok) {
    throw new Error(data.message || "ERROR")
  }

  return data
}

const updateKeranjang = async (id: number, qty: number) => {
  const token = localStorage.getItem("token")

  await fetch(`${API_URL}/pembeli/keranjang/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ qty }),
  })
}

const deleteKeranjang = async (id: number) => {
  const token = localStorage.getItem("token")

  await fetch(`${API_URL}/pembeli/keranjang/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}

/* =========================
   RAJA ONGKIR
========================= */

export async function getProvinces() {

  const res = await fetch(`${API_URL}/raja-ongkir/provinces`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      Accept: "application/json"
    },
  })

  const json = await res.json()

  console.log("PROVINCES:", json)

  return json.data ?? []
}

export async function getCities(provinceId: number) {

  const res = await fetch(`${API_URL}/raja-ongkir/cities/${provinceId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      Accept: "application/json"
    },
  })

  const json = await res.json()

  return json.data ?? []
}

export async function getDistricts(cityId: number) {

  const res = await fetch(`${API_URL}/raja-ongkir/districts/${cityId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      Accept: "application/json"
    },
  })

  const json = await res.json()

  return json.data ?? []
}

export const checkoutPage = async (payload: any) => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL
  const token = localStorage.getItem("token")

  const res = await fetch(`${API_URL}/pembeli/checkout-page`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  })

 const data = await res.json()

  // 🔥 HANDLE ERROR BACKEND
  if (!res.ok) {
  throw new Error(data.message || "Gagal memuat CO page")
}

  return data
}

export const checkout = async (payload: any) => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL
  const token = localStorage.getItem("token")

  const res = await fetch(`${API_URL}/pembeli/checkout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  })

  return res.json()
}

export const uploadPembayaran = async (pesananId: number, file: File) => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL
  const token = localStorage.getItem("token")

  const formData = new FormData()
  formData.append("bukti_transfer", file)

  const res = await fetch(`${API_URL}/pembeli/pesanan/${pesananId}/upload-pembayaran`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  })

  return res.json()
}

export async function getPesananPembeli() {
  const res = await fetch(`${API_URL}/pembeli/pesanan`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      Accept: "application/json",
    },
  })

  const json = await res.json()
  return json
}

export const selesaiPesanan = async (id: number) => {
  const token = localStorage.getItem("token")
  try {
    const res = await fetch(`${API_URL}/pembeli/pesanan/${id}/selesai`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })

    const data = await res.json()

    if (!data.success) {
      throw new Error(data.message)
    }

    return data
  } catch (error: any) {
    throw new Error(error.message || "Gagal menyelesaikan pesanan")
  }
}

export const getDetailPembayaran = async (pesananId: number) => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL
  const token = localStorage.getItem("token")

  const res = await fetch(`${API_URL}/pembeli/pesanan/${pesananId}/detail-pembayaran`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return res.json()
}

import { PembeliProfileResponse, PembeliProfile } from "@/types/pembeli"

/* =========================
   GET PROFILE
========================= */
export async function getProfilePembeli() {
  const res = await fetch(`${API_URL}/pembeli/profile`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      Accept: "application/json",
    },
  })

  const json = await res.json()
  return json
}

/* =========================
   UPDATE PROFILE
========================= */
export async function updateProfilePembeli(payload: {
  nama_lengkap: string
  jenis_kelamin: string
  no_hp: string
  name: string
  email: string
}) {
  const res = await fetch(`${API_URL}/pembeli/profile`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })

  const json = await res.json()
  return json
}

import { AlamatPembeli } from "@/types/alamat"

export async function getAlamatPembeli(): Promise<AlamatPembeli[]> {

  const res = await fetch(`${API_URL}/pembeli/alamat`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      Accept: "application/json"
    },
  })

  const json = await res.json()

  if (!res.ok) {
    throw new Error(json.message || "Gagal mengambil alamat")
  }

  return json.data ?? []
}

export async function createAlamatPembeli(payload: Partial<AlamatPembeli>) {

  const res = await fetch(`${API_URL}/pembeli/alamat`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(payload),
  })

  const json = await res.json()

  if (!res.ok) {
    throw new Error(json.message || "Gagal menambahkan alamat")
  }

  return json
}

export async function updateAlamatPembeli(id: number, payload: Partial<AlamatPembeli>) {

  const res = await fetch(`${API_URL}/pembeli/alamat/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(payload),
  })

  const json = await res.json()

  if (!res.ok) {
    throw new Error(json.message || "Gagal update alamat")
  }

  return json
}

export async function deleteAlamatPembeli(id: number) {

  const res = await fetch(`${API_URL}/pembeli/alamat/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      Accept: "application/json"
    },
  })

  const json = await res.json()

  if (!res.ok) {
    throw new Error(json.message || "Gagal menghapus alamat")
  }

  return json
}
