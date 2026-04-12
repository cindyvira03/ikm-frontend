"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { getProfilIkm } from "@/services/adminService"
import { UserIKM } from "@/types/profilIkm"

export default function ProfilIkmPage() {

  const [data, setData] = useState<UserIKM[]>([])
  const [loading, setLoading] = useState(true)

  const fetchData = async () => {
    try {
      const res = await getProfilIkm()

      // mapping snake_case dari Laravel → camelCase untuk React
      const mapped = res.map((item: any) => ({
        ...item,
        profilIkm: item.profil_ikm ?? item.profilIkm
      }))

      setData(mapped)
    } catch (error) {
      console.error("Gagal mengambil data:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary"></div>
        <p className="mt-2">Memuat profil IKM...</p>
      </div>
    )
  }

  return (
    <div>

      <h2 className="container-fluid mt-4 mb-4">Profil IKM</h2>

      {data.length === 0 && (
        <div className="text-center py-5">
          <h5 className="text-muted mb-0">Belum ada data profil IKM</h5>
          <p className="text-muted">Belum ada profil IKM yang ditambahkan.</p>
        </div>
      )}

      {data.map((item) => (

        <div className="card border mb-1" key={item.id}>
          <div className="card-body">

            <div className="row align-items-center g-2">

              <div className="col-3 col-md-1">

                <Link href={`/admin/profil-ikm/${item.id}`} className="text-dark">

                  <img
                    src={
                      item.profilIkm?.gambar
                        ? `${process.env.NEXT_PUBLIC_STORAGE_URL}/ikm/${item.profilIkm.gambar}`
                        : "/no-image.png"
                    }
                    className="img-thumbnail"
                    style={{ width: "100%", height: "100px", objectFit: "cover" }}
                  />

                </Link>

              </div>

              <div className="col-7 col-md-4">

                <Link href={`/admin/profil-ikm/${item.id}`} className="text-dark text-decoration-none">

                  <p className="fw-semibold mb-0">
                    {item.profilIkm?.nama_usaha}
                  </p>

                  <p className="fs-7 text-secondary mb-0">
                    Merek: {item.profilIkm?.merek}
                  </p>

                  <p className="fs-7 text-secondary mb-0">
                    Kategori: {item.profilIkm?.kategori?.nama_kategori}
                  </p>

                </Link>

              </div>

              <div className="d-none d-md-block col-3">

                <p className="fs-7 text-secondary mb-0">
                  Nama Pemilik: {item.name}
                </p>

                <p className="fs-7 text-secondary mb-0">
                  No Telp: {item.profilIkm?.no_telp}
                </p>

              </div>

              <div className="col-2 col-md-1">

                <span
                  className={`badge ${
                    item.profilIkm?.status === "aktif"
                      ? "bg-success"
                      : item.profilIkm?.status === "pending"
                      ? "bg-warning"
                      : "bg-danger"
                  }`}
                >
                  {item.profilIkm?.status}
                </span>

              </div>

              <div className="col-md-3">

                <div className="d-flex justify-content-end">

                  <Link
                    href={`/admin/profil-ikm/${item.id}`}
                    className="btn btn-sm"
                  >
                    <i className="bi bi-eye"></i> Detail
                  </Link>

                </div>

              </div>

            </div>

          </div>
        </div>

      ))}

    </div>
  )
}