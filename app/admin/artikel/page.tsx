"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { getArtikel, deleteArtikel } from "@/services/adminService"
import { Artikel } from "@/types/artikel"
import { toast } from "react-toastify"

export default function AdminArtikelPage() {

  const [data, setData] = useState<Artikel[]>([])
  const [loading, setLoading] = useState(true)

   const showAlert = (type: "success" | "danger", message: string) => {
    if (type === "success") toast.success(message)
    else toast.error(message)
  }

  const fetchData = async () => {
    try {
      const res = await getArtikel()
      setData(res)
    } catch (error) {
      console.error("Gagal mengambil artikel:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

   const handleDelete = async (id: number) => {
  
      if (!confirm("Yakin hapus artikel ini?")) return
  
      setLoading(true)
  
      try {
  
        await deleteArtikel(id)
  
        showAlert("success", "Produk berhasil dihapus")
  
      } catch (error) {
  
        showAlert("danger", "Gagal menghapus artikel")
  
      }
  
      setLoading(false)
  
    }

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary"></div>
        <p className="mt-2">Memuat artikel...</p>
      </div>
    )
  }

  return (
    <div>

      <div className="container-fluid mt-4 mb-4 d-flex justify-content-between align-items-center">
        <h2 className="mb-0">Manajemen Artikel</h2>

        <Link href="/admin/artikel/create" className="btn btn-primary">
          <i className="bi bi-plus"></i> Tambah Artikel
        </Link>
      </div>

      {data.length === 0 && (
        <div className="text-center py-5">
          <h5 className="text-muted mb-0">Belum ada artikel</h5>
          <p className="text-muted">Silakan tambahkan artikel baru.</p>
        </div>
      )}

      {data.map((item) => (

        <div className="card border mb-2" key={item.id}>
          <div className="card-body">

            <div className="row align-items-center g-2">

              {/* GAMBAR */}
              <div className="col-3 col-md-1">

                <Link href={`/admin/artikel/${item.id}`} className="text-dark">

                  <img
                    src={
                      item.gambar
                        ? `${process.env.NEXT_PUBLIC_STORAGE_URL}/${item.gambar}`
                        : "/no-image.webp"
                    }
                    className="img-thumbnail"
                    style={{ width: "100%", height: "100px", objectFit: "cover" }}
                  />

                </Link>

              </div>

              {/* INFO UTAMA */}
              <div className="col-7 col-md-5">

                <Link
                  href={`/admin/artikel/${item.id}`}
                  className="text-dark text-decoration-none"
                >

                  <p className="fw-semibold mb-1">
                    {item.judul}
                  </p>

                  <p className="fs-7 text-secondary mb-0">
                    Kategori: {item.kategori?.nama || "-"}
                  </p>

                  {item.meta_title && (
                    <p className="fs-7 text-muted mb-0">
                      SEO: {item.meta_title}
                    </p>
                  )}

                </Link>

              </div>

              {/* STATUS */}
              <div className="col-2 col-md-2">

                <span
                  className={`badge ${
                    item.status === "publish"
                      ? "bg-success"
                      : "bg-secondary"
                  }`}
                >
                  {item.status}
                </span>

              </div>

              {/* INFO TAMBAHAN */}
              <div className="d-none d-md-block col-2">

                <p className="fs-7 text-secondary mb-0">
                  Sumber:
                </p>

                <p className="fs-7 text-muted mb-0 text-truncate">
                  {item.sumber}
                </p>

              </div>

              {/* AKSI */}
              <div className="col-md-2">

                <div className="d-flex justify-content-end gap-2">

                  <Link
                    href={`/admin/artikel/edit/${item.id}`}
                    className="btn btn-sm btn-warning"
                  >
                    <i className="bi bi-pencil"></i>
                  </Link>

                  <button
                        className="btn btn-sm btn-danger"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleDelete(item.id)
                        }}
                      >
                        <i className="bi bi-trash"></i>
                      </button>

                </div>

              </div>

            </div>

          </div>
        </div>

      ))}

    </div>
  )
}