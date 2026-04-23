import { Product } from "@/types/product"

const API = process.env.NEXT_PUBLIC_API_URL

function authHeader() {
  return {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
    "Content-Type": "application/json",
    Accept: "application/json",
  }
}

export async function getDashboardIkm(bulan?: number, tahun?: number) {

  let url = `${API}/ikm`

  if (bulan && tahun) {
    url += `?bulan=${bulan}&tahun=${tahun}`
  }

  const res = await fetch(url, {
    headers: authHeader(),
  })

  const json = await res.json()

  const data = json?.data || {}

  return {
    totalProduk: data.total_produk ?? 0,
    hasOutlet: data.has_outlet ?? false,
    pesananHariIni: data.pesanan_hari_ini ?? 0,
    pesananPending: data.pesanan_pending ?? 0,
    produkTerlaris: data.produk_terlaris ?? null,
    omsetBulan: data.omset_bulan ?? 0,
    grafikOmset: data.grafik_omset ?? [],
    profilLengkap: data.profil_lengkap ?? false,
    profilProgress: data.profil_progress ?? 0
  }
}

export async function getProfilIkm() {
  const res = await fetch(`${API}/ikm/profile`, {
    headers: authHeader(),
  })

  const json = await res.json()

  if (!json.success) {
    throw new Error(json.message)
  }

  return json.data
}

export async function updateProfilIkm(formData: FormData) {
  const res = await fetch(`${API}/ikm/profile/update`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      Accept: "application/json" // jangan set Content-Type, biarkan browser atur otomatis
    },
    body: formData
  })

  const result = await res.json()

  if (!res.ok) {
    console.error("API ERROR:", result)
    throw new Error(result.message || "Update gagal")
  }

  return result
}

// GET produk IKM (paginated)
export async function getProduk(page: number = 1): Promise<{ data: Product[]; meta: any }> {
  const res = await fetch(`${API}/ikm/produk?page=${page}`, { headers: authHeader() })
  const json = await res.json()

  if (!res.ok) throw new Error(json.message || "Gagal mengambil produk")

  return { data: json.data.data, meta: json.data } // data.data = array Product
}
// GET detail produk
export async function getProdukById(id: number): Promise<Product> {
  const res = await fetch(`${API}/ikm/produk/${id}`, { headers: authHeader() })
  const json = await res.json()
  if (!res.ok) throw new Error(json.message || "Produk tidak ditemukan")
  return json.data
}

// CREATE produk
export async function createProduk(formData: FormData) {
  const res = await fetch(`${API}/ikm/produk`, {
    method: "POST",
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}`, Accept: "application/json" },
    body: formData,
  })
  const json = await res.json()
  if (!res.ok) throw new Error(json.message || "Gagal menambahkan produk")
  return json.data
}

// UPDATE produk
export async function updateProduk(id: number, formData: FormData) {

  formData.append("_method", "PUT")

  const res = await fetch(`${API}/ikm/produk/${id}`, {
    method: "POST",
    headers: { 
      Authorization: `Bearer ${localStorage.getItem("token")}`, 
      Accept: "application/json"
    },
    body: formData,
  })

  const json = await res.json()

  if (!res.ok) throw new Error(json.message || "Gagal memperbarui produk")

  return json.data
}

// DELETE produk
export async function deleteProduk(id: number) {
  const res = await fetch(`${API}/ikm/produk/${id}`, {
    method: "DELETE",
    headers: authHeader(),
  })
  const json = await res.json()
  if (!res.ok) throw new Error(json.message || "Gagal menghapus produk")
  return json
}

// ==========================
// OUTLET IKM
// ==========================

// GET daftar outlet
export async function getOutlets(page: number = 1) {

  const res = await fetch(`${API}/ikm/outlet?page=${page}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      Accept: "application/json"
    }
  })

  const json = await res.json()

  if (!res.ok) throw new Error(json.message)

  return json.data
}


// GET detail outlet
export async function getOutletById(id: number) {

  const res = await fetch(`${API}/ikm/outlet/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      Accept: "application/json"
    }
  })

  const json = await res.json()

  if (!res.ok) throw new Error(json.message)

  return json.data
}

/* =========================
   RAJA ONGKIR
========================= */

export async function getProvinces() {

  const res = await fetch(`${API}/ikm/rajaongkir/provinces`, {
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

  const res = await fetch(`${API}/ikm/rajaongkir/cities/${provinceId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      Accept: "application/json"
    },
  })

  const json = await res.json()

  return json.data ?? []
}

export async function getDistricts(cityId: number) {

  const res = await fetch(`${API}/ikm/rajaongkir/districts/${cityId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      Accept: "application/json"
    },
  })

  const json = await res.json()

  return json.data ?? []
}



// CREATE outlet
export async function createOutlet(formData: FormData) {

  const res = await fetch(`${API}/ikm/outlet`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      Accept: "application/json"
    },
    body: formData
  })

  const json = await res.json()

  if (!res.ok) throw new Error(json.message)

  return json.data
}


// UPDATE outlet
export async function updateOutlet(id: number, formData: FormData) {

  formData.append("_method", "PUT")

  const res = await fetch(`${API}/ikm/outlet/${id}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      Accept: "application/json"
    },
    body: formData
  })

  const json = await res.json()

  if (!res.ok) throw new Error(json.message)

  return json.data
}


// DELETE outlet
export async function deleteOutlet(id: number) {

  const res = await fetch(`${API}/ikm/outlet/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      Accept: "application/json"
    }
  })

  const json = await res.json()

  if (!res.ok) throw new Error(json.message)

  return true
}

// ==========================
// PESANAN IKM
// ==========================

import { Pesanan } from "@/types/pesanan"

// GET daftar pesanan IKM (paginated + filter status)
export async function getPesanan(
  page: number = 1,
  status?: string
): Promise<{ data: Pesanan[]; meta: any }> {

  let url = `${API}/ikm/pesanan?page=${page}`

  if (status) {
    url += `&status=${status}`
  }

  const res = await fetch(url, {
    headers: authHeader(),
  })

  const json = await res.json()

  if (!res.ok) {
    throw new Error(json.message || "Gagal mengambil pesanan")
  }

  return {
    data: json.data.data ?? json.data,
    meta: json.data
  }
}

export const validasiPembayaran = async (
  id: number,
  data: {
    status_pembayaran: "valid" | "ditolak"
    keterangan?: string
  }
) => {

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/ikm/pembayaran/${id}/validasi`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify(data)
    }
  )

  const result = await res.json()

  if (!res.ok) {
    throw new Error(result.message)
  }

  return result
}

export const kirimPesanan = async (
  id: number,
  no_resi: string
) => {

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/ikm/pesanan/${id}/kirim`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify({ no_resi })
    }
  )

  const result = await res.json()

  if (!res.ok) {
    throw new Error(result.message)
  }

  return result
}