"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { getArtikelDetail } from "@/services/adminService"

type Artikel = {
  id: number
  judul: string
  kategori?: {
    nama: string
  }
  gambar?: string
  isi: string
  created_at?: string
  updated_at?: string
}

export default function ArtikelDetailPage() {
  const { id } = useParams()
  const router = useRouter()

  const [artikel, setArtikel] = useState<Artikel | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) return

    const fetchArtikel = async () => {
      setLoading(true)
      try {
        const data = await getArtikelDetail(Number(id))
        setArtikel(data)
      } catch (err: any) {
        setError(err.message || "Gagal memuat artikel")
      }
      setLoading(false)
    }

    fetchArtikel()
  }, [id])

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary"></div>
        <div className="mt-2">Memuat detail artikel...</div>
      </div>
    )
  }

  if (error || !artikel) {
    return (
      <div className="text-center py-5 text-danger">
        <h5>{error || "Artikel tidak ditemukan"}</h5>
      </div>
    )
  }

  return (
    <div className="container-fluid py-3">
      <div className="card">
        {/* HEADER */}
        <div className="card-header d-flex justify-content-between align-items-center">
          <h4 className="mb-0">Detail Artikel</h4>

          <div className="d-flex gap-2">
            <button
              className="btn btn-warning"
              onClick={() => router.push(`/admin/artikel/edit/${artikel.id}`)}
            >
              <i className="bi bi-pencil"></i> Edit
            </button>

            <button
              className="btn btn-secondary"
              onClick={() => router.push("/admin/artikel")}
            >
              <i className="bi bi-arrow-left"></i> Kembali
            </button>
          </div>
        </div>

        {/* BODY */}
        <div className="card-body">
          <div className="row">
            {/* IMAGE */}
            <div className="col-md-4">
              <img
                src={
                  artikel.gambar
                    ? `${process.env.NEXT_PUBLIC_STORAGE_URL}/${artikel.gambar}`
                    : "/no-image.jpg"
                }
                alt={artikel.judul}
                className="img-fluid rounded"
              />
            </div>

            {/* INFO */}
            <div className="col-md-8">
              <table className="table table-borderless">
                <tbody>
                  <tr>
                    <th style={{ width: "180px" }}>Judul</th>
                    <td>: {artikel.judul}</td>
                  </tr>

                  <tr>
                    <th>Kategori</th>
                    <td>: {artikel.kategori?.nama ?? "-"}</td>
                  </tr>

                  <tr>
                    <th>Tanggal Dibuat</th>
                    <td>
                      :{" "}
                      {artikel.created_at
                        ? new Date(artikel.created_at).toLocaleDateString()
                        : "-"}
                    </td>
                  </tr>

                  <tr>
                    <th>Terakhir Update</th>
                    <td>
                      :{" "}
                      {artikel.updated_at
                        ? new Date(artikel.updated_at).toLocaleDateString()
                        : "-"}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* CONTENT */}
          <div className="row mt-4">
            <div className="col-12">
              <h5>Isi Artikel</h5>
              <div
                className="border rounded p-3 bg-light"
                style={{ whiteSpace: "pre-line" }}
              >
                {artikel.isi}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}