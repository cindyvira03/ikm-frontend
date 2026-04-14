import { Kategori } from "@/types/kategori"
import { SeoSetting, SeoResponse } from "@/types/seo"
import { Artikel, KategoriArtikel } from "@/types/artikel"

const API = process.env.NEXT_PUBLIC_API_URL

function authHeader() {
  return {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
    "Content-Type": "application/json",
    Accept: "application/json",
  }
}

export async function getDashboardAdmin() {
  const res = await fetch(`${API}/admin`, {
    headers: authHeader(),
  })

  const json = await res.json()

  return {
    jumlahIKM: json.data.jumlah_ikm,
    jumlahOutlet: json.data.jumlah_outlet,
    jumlahProduk: json.data.jumlah_produk,
  }
}

/* =========================
   KATEGORI
========================= */

export async function getKategori(): Promise<Kategori[]> {
  const res = await fetch(`${API}/admin/kategori`, {
    headers: authHeader(),
  })

  const json = await res.json()
  return json.data ?? json
}

export async function createKategori(nama_kategori: string) {
  const res = await fetch(`${API}/admin/kategori`, {
    method: "POST",
    headers: authHeader(),
    body: JSON.stringify({ nama_kategori }),
  })

  return res.json()
}

export async function updateKategori(id: number, nama_kategori: string) {
  const res = await fetch(`${API}/admin/kategori/${id}`, {
    method: "PUT",
    headers: authHeader(),
    body: JSON.stringify({ nama_kategori }),
  })

  return res.json()
}

export async function deleteKategori(id: number) {
  const res = await fetch(`${API}/admin/kategori/${id}`, {
    method: "DELETE",
    headers: authHeader(),
  })

  return res.json()
}

/* =========================
   PROFIL IKM
========================= */

export const getProfilIkm = async () => {
  const res = await fetch(`${API}/admin/profil-ikm`, {
    headers: authHeader(),
  })

  
  const json = await res.json()

  return json.data?.ikm ?? json.data ?? []
}

export const getProfilIkmDetail = async (id: number) => {
  const res = await fetch(`${API}/admin/profil-ikm/${id}`, {
    headers: authHeader(),
  })

  const json = await res.json()

  const item = json.data

  return {
    ...item,
    profilIkm: item.profil_ikm ?? item.profilIkm
  }
}

export const updateStatusIkm = async (id: number, status: string) => {
  const res = await fetch(`${API}/admin/profil-ikm/${id}`, {
    method: "PUT",
    headers: authHeader(),
    body: JSON.stringify({ status }),
  })

  return res.json()
}

export async function getSeo(page: string): Promise<SeoSetting> {
  const res = await fetch(`${API}/admin/seo?page=${page}`, {
    headers: authHeader(),
  })

  if (!res.ok) {
    throw new Error("Gagal mengambil data SEO")
  }

  const json: SeoResponse = await res.json()

  return json.data
}

export async function updateSeo(formData: FormData) {
  const res = await fetch(`${API}/admin/seo`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      Accept: "application/json"
      // ❌ jangan set Content-Type
    },
    body: formData
  })

  const result = await res.json()

  if (!res.ok) {
    console.error("API ERROR:", result)
    throw new Error(result.message || "Gagal update SEO")
  }

  return result
}
/* =========================
   CMS PAGES
========================= */

import { CmsPage, CmsResponse } from "@/types/cms"

export async function getCms(page: string): Promise<CmsPage> {
  const res = await fetch(`${API}/admin/cms?page=${page}`, {
    headers: authHeader(),
  })

  if (!res.ok) {
    throw new Error("Gagal mengambil data CMS")
  }

  const json: CmsResponse = await res.json()

  return json.data
}

export async function updateCms(
  payload: FormData
) {
  const res = await fetch(`${API}/admin/cms`, {
    method: "POST", // 🔥 pakai POST (biar aman file upload)
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      Accept: "application/json",
    },
    body: payload,
  })

  if (!res.ok) {
    throw new Error("Gagal memperbarui CMS")
  }

  return res.json()
}

/* =========================
   KATEGORI ARTIKEL
========================= */

export async function getKategoriArtikel(): Promise<KategoriArtikel[]> {
  const res = await fetch(`${API}/admin/kategori-artikel`, {
    headers: authHeader(),
  })

  const json = await res.json()
  return json.data ?? json
}

export async function createKategoriArtikel(nama: string) {
  const res = await fetch(`${API}/admin/kategori-artikel`, {
    method: "POST",
    headers: authHeader(),
    body: JSON.stringify({ nama }),
  })

  return res.json()
}

export async function updateKategoriArtikel(id: number, nama: string) {
  const res = await fetch(`${API}/admin/kategori-artikel/${id}`, {
    method: "PUT",
    headers: authHeader(),
    body: JSON.stringify({ nama }),
  })

  return res.json()
}

export async function deleteKategoriArtikel(id: number) {
  const res = await fetch(`${API}/admin/kategori-artikel/${id}`, {
    method: "DELETE",
    headers: authHeader(),
  })

  return res.json()
}

/* =========================
   ARTIKEL
========================= */

export async function getArtikel(): Promise<Artikel[]> {
  const res = await fetch(`${API}/admin/artikel`, {
    headers: authHeader(),
  })

  const json = await res.json()
  return json.data ?? json
}

export async function getArtikelDetail(id: number): Promise<Artikel> {
  const res = await fetch(`${API}/admin/artikel/${id}`, {
    headers: authHeader(),
  })

  const json = await res.json()
  return json.data ?? json
}

export async function createArtikel(formData: FormData) {
  const res = await fetch(`${API}/admin/artikel`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      Accept: "application/json"
      // ❌ JANGAN pakai Content-Type
    },
    body: formData,
  })

  return res.json()
}

export async function updateArtikel(id: number, formData: FormData) {
  formData.append("_method", "PUT")
  const res = await fetch(`${API}/admin/artikel/${id}`, {
    method: "POST", // ⚠️ penting (bukan PUT)
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      Accept: "application/json",
    },
    body: formData,
  })

  return res.json()
}

export async function deleteArtikel(id: number) {
  const res = await fetch(`${API}/admin/artikel/${id}`, {
    method: "DELETE",
    headers: authHeader(),
  })

  return res.json()
}