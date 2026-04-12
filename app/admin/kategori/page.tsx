"use client"

import { useEffect, useState } from "react"
import {
  getKategori,
  createKategori,
  updateKategori,
  deleteKategori,
} from "@/services/adminService"
import { Kategori } from "@/types/kategori"
import { toast } from "react-toastify"

export default function AdminKategori() {

  const [kategoris, setKategoris] = useState<Kategori[]>([])
  const [namaKategori, setNamaKategori] = useState("")
  const [editId, setEditId] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)
  const [loadingTable, setLoadingTable] = useState(true)

  const [alert, setAlert] = useState<{
    type: "success" | "danger"
    message: string
  } | null>(null)

  const fetchData = async () => {
    setLoadingTable(true)
    setKategoris([])
    const data = await getKategori()
    setKategoris(data)
    setLoadingTable(false)
  }

  useEffect(() => {
    fetchData()
  }, [])

  // ✅ versi TANPA bootstrap JS
  const closeModal = () => {
    const closeBtn = document.getElementById("closeModalBtn")
    closeBtn?.click()
  }

  function showAlert(type: "success" | "danger", message: string) {
    if (type === "success") {
      toast.success(message)
    } else {
      toast.error(message)
    }

    setAlert({ type, message })
  }

  const handleSubmit = async () => {
    if (!namaKategori) {
      showAlert("danger", "Nama kategori wajib diisi")
      return
    }

    setLoading(true)

    try {
      if (editId) {
        await updateKategori(editId, namaKategori)
        showAlert("success", "Kategori berhasil diperbarui")
      } else {
        await createKategori(namaKategori)
        showAlert("success", "Kategori berhasil ditambahkan")
      }

      setNamaKategori("")
      setEditId(null)

      fetchData()
      closeModal()

    } catch (error) {
      showAlert("danger", "Terjadi kesalahan")
    }

    setLoading(false)
  }

  const handleEdit = (kategori: Kategori) => {
    setEditId(kategori.id)
    setNamaKategori(kategori.nama_kategori)

    // ✅ trigger modal via tombol hidden
    const btn = document.getElementById("openModalBtn")
    btn?.click()
  }

  const handleDelete = async (id: number) => {
    if (!confirm("Yakin hapus kategori ini?")) return

    try {
      await deleteKategori(id)
      showAlert("success", "Kategori berhasil dihapus")
      fetchData()
    } catch (error) {
      showAlert("danger", "Gagal menghapus kategori")
    }
  }

  return (
    <div>

      <div className="container-fluid mt-4 d-flex justify-content-between align-items-center mb-3">
        <h2 className="mb-0">Manajemen Kategori</h2>

        <button
          className="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#kategoriModal"
          onClick={() => {
            setEditId(null)
            setNamaKategori("")
          }}
        >
          <i className="bi bi-plus"></i> Tambah Kategori
        </button>

        {/* ✅ hidden button untuk trigger modal dari JS */}
        <button
          id="openModalBtn"
          type="button"
          className="d-none"
          data-bs-toggle="modal"
          data-bs-target="#kategoriModal"
        ></button>
      </div>

      <div className="card border rounded-4">
        <div className="card-body">

          <div className="table-responsive">

            <table className="table table-striped">

              <thead>
                <tr>
                  <th>No</th>
                  <th>Nama Kategori</th>
                  <th>Slug</th>
                  <th>Aksi</th>
                </tr>
              </thead>

              <tbody>
                {loadingTable && (
                  <tr>
                    <td colSpan={4} className="text-center py-4">
                      <div className="spinner-border text-primary"></div>
                      <div className="mt-2">Memuat data...</div>
                    </td>
                  </tr>
                )}

                {kategoris.map((kategori, index) => (
                  <tr key={kategori.id}>
                    <td>{index + 1}</td>
                    <td>{kategori.nama_kategori}</td>
                    <td>{kategori.slug}</td>
                    <td>

                      <div className="d-flex gap-2">

                        <button
                          className="btn btn-sm btn-warning"
                          onClick={() => handleEdit(kategori)}
                        >
                          <i className="bi bi-pencil"></i> Edit
                        </button>

                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => handleDelete(kategori.id)}
                        >
                          <i className="bi bi-trash"></i> Hapus
                        </button>

                      </div>

                    </td>
                  </tr>
                ))}

                {!loadingTable && kategoris.length === 0 && (
                  <tr>
                    <td colSpan={4} className="text-center">
                      Data kosong
                    </td>
                  </tr>
                )}

              </tbody>

            </table>

          </div>

        </div>
      </div>

      {/* MODAL */}

      <div className="modal fade" id="kategoriModal">

        <div className="modal-dialog">

          <div className="modal-content">

            <div className="modal-header">
              <h5 className="modal-title">
                {editId ? "Edit Kategori" : "Tambah Kategori"}
              </h5>

              <button
                id="closeModalBtn"
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>

            <div className="modal-body">

              <label className="form-label">
                Nama Kategori
              </label>

              <input
                className="form-control"
                value={namaKategori}
                onChange={(e) => setNamaKategori(e.target.value)}
              />

            </div>

            <div className="modal-footer">

              <button
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Batal
              </button>

              <button
                className="btn btn-primary"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? "Menyimpan..." : "Simpan"}
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  )
}