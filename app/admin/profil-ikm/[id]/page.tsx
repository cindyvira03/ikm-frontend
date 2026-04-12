"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { getProfilIkmDetail, updateStatusIkm } from "@/services/adminService"
import { toast } from "react-toastify"

export default function DetailProfilIkmPage() {
  const params = useParams()
  const id = Number(params.id)

  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  // 🔽 TAMBAHAN STATE
  const [selectedStatus, setSelectedStatus] = useState("")
  const [loadingUpdate, setLoadingUpdate] = useState(false)

  const fetchData = async () => {
    const res = await getProfilIkmDetail(id)
    setData(res)

    // 🔽 set default status
    setSelectedStatus(res.profilIkm.status)

    setLoading(false)
  }

  useEffect(() => {
    fetchData()
  }, [])

  // ❌ HAPUS AUTO UPDATE
  // const handleStatusChange = async (e: any) => {
  //   const status = e.target.value
  //   await updateStatusIkm(data.profilIkm.id, status)
  //   fetchData()
  // }

  // ✅ HANDLE UPDATE MANUAL
  const handleUpdateStatus = async () => {
  try {
    setLoadingUpdate(true)

    await updateStatusIkm(data.profilIkm.id, selectedStatus)

    toast.success("Status berhasil diperbarui")

    fetchData()
  } catch (err: any) {
    toast.error(err.message || "Gagal update status")
  } finally {
    setLoadingUpdate(false)
  }
}

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary"></div>
      </div>
    )
  }

  const ikm = data.profilIkm

  return (
    <div>

      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">Detail Profil IKM</h2>
        <Link href="/admin/profil-ikm" className="btn btn-light border">
          ← Kembali
        </Link>
      </div>

      {/* Informasi IKM */}
      <div className="card border mb-3">
        <div className="card-header bg-white py-3">
          <p className="mb-0 fw-semibold">Informasi IKM</p>
        </div>

        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-2">
              <img
                src={
                  ikm?.gambar
                    ? `${process.env.NEXT_PUBLIC_STORAGE_URL}/ikm/${ikm.gambar}`
                    : "/no-image.png"
                }
                className="img-thumbnail"
              />
            </div>

            <div className="col-md-10">
              <div className="row g-3">

                <div className="col-md-6">
                  <p className="mb-0 fs-7 text-secondary">Nama Usaha</p>
                  <p className="mb-0">{ikm?.nama_usaha}</p>
                </div>

                <div className="col-md-6">
                  <p className="mb-0 fs-7 text-secondary">No Telp</p>
                  <p className="mb-0">{ikm?.no_telp}</p>
                </div>

                <div className="col-md-6">
                  <p className="mb-0 fs-7 text-secondary">Kategori</p>
                  <p className="mb-0">{ikm?.kategori?.nama_kategori}</p>
                </div>

                <div className="col-md-6">
                  <p className="mb-0 fs-7 text-secondary">Merek</p>
                  <p className="mb-0">{ikm?.merek}</p>
                </div>

                <div className="col-md-6">
                  <p className="mb-0 fs-7 text-secondary">Deskripsi Singkat</p>
                  <p className="mb-0">{ikm?.deskripsi_singkat}</p>
                </div>

                {/* 🔽 STATUS (DIPERBAIKI) */}
                <div className="col-md-6">
                  <p className="mb-0 fs-7 text-secondary">Status</p>

                  <div className="d-flex gap-2 mt-1">
                    <select
                      className="form-select"
                      value={selectedStatus}
                      onChange={(e) => setSelectedStatus(e.target.value)}
                    >
                      <option value="pending">Pending</option>
                      <option value="aktif">Aktif</option>
                      <option value="tidak_aktif">Tidak Aktif</option>
                    </select>

                    <button
                      className="btn btn-primary"
                      onClick={handleUpdateStatus}
                      disabled={loadingUpdate}
                    >
                      {loadingUpdate ? "Updating..." : "Update"}
                    </button>
                  </div>

                  {/* 🔽 STATUS INFO */}
                  {selectedStatus !== ikm.status && (
                    <small className="text-warning">
                      Status belum disimpan
                    </small>
                  )}
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Outlet */}
      <div className="card border mb-3">
        <div className="card-header bg-white py-3">
          <p className="mb-0 fw-semibold">Outlet</p>
        </div>

        <div className="card-body">
          {ikm?.outlets?.length ? (
            ikm.outlets.map((item: any) => (
              <div className="card border mb-1" key={item.id}>
                <div className="card-body row align-items-center g-3">
                  <div className="col-3 col-md-2">
                    <img
                      src={
                        item.foto_lokasi_tampak_depan
                          ? `${process.env.NEXT_PUBLIC_STORAGE_URL}/${item.foto_lokasi_tampak_depan}`
                          : "/no-image.png"
                      }
                      className="img-thumbnail"
                    />
                  </div>

                  <div className="col-7 col-md-8">
                    <p className="fw-semibold mb-0">{item.alamat}</p>
                    <p className="fs-7 text-secondary mb-0">
                      {item.lokasi_googlemap}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-5">
              <h5 className="text-muted mb-0">Belum ada data outlet</h5>
              <p className="text-muted">Belum ada outlet yang ditambahkan.</p>
            </div>
          )}
        </div>
      </div>

      {/* Produk */}
      <div className="card border">
        <div className="card-header bg-white py-3">
          <p className="mb-0 fw-semibold">Produk</p>
        </div>

        <div className="card-body">
          {ikm?.produk?.length ? (
            ikm.produk.map((item: any) => (
              <div className="card border mb-1" key={item.id}>
                <div className="card-body row align-items-center g-3">
                  <div className="col-3 col-md-1">
                    <img
                      src={
                        item.foto
                          ? `${process.env.NEXT_PUBLIC_STORAGE_URL}/${item.foto}`
                          : "/no-image.png"
                      }
                      className="img-thumbnail"
                    />
                  </div>

                  <div className="col-7 col-md-5">
                    <p className="fw-semibold mb-0">{item.nama_produk}</p>
                    <p className="text-secondary fs-7 mb-0">
                      {item.jenis_produk}
                    </p>
                  </div>

                  <div className="col-md-2">
                    <p className="fw-semibold mb-0">
                      Rp {item.harga?.toLocaleString("id-ID")}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-5">
              <h5 className="text-muted mb-0">Belum ada data produk</h5>
              <p className="text-muted">Belum ada produk yang ditambahkan.</p>
            </div>
          )}
        </div>
      </div>

    </div>
  )
}