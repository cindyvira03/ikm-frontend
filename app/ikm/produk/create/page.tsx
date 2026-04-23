"use client"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { createProduk } from "@/services/ikmService"
import { toast } from "react-toastify"

export default function TambahProdukPage() {
  const router = useRouter()

  const [form, setForm] = useState({
    nama_produk: "",
    jenis_produk: "",
    harga: "",
    varian: "",
    ukuran: "",
    berat: "",
    deskripsi: "",
    stok: "",
  })
  const [fotoFile, setFotoFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [alert, setAlert] = useState<{ type: "success" | "danger"; message: string } | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Helper alert
  const showAlert = (type: "success" | "danger", message: string) => {

  if (type === "success") {
    toast.success(message)
  } else {
    toast.error(message)
  }

  setAlert({ type, message }) // tetap ada biar aman
}

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  // Format harga dengan ribuan
  const handleHargaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/[^0-9]/g, "")
    setForm({ ...form, harga: value })
  }

  // Hanya angka untuk berat
  const handleBeratChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/[^0-9]/g, "")
    setForm({ ...form, berat: value })
  }

  // Handle file select
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFotoFile(e.target.files[0])
    }
  }

  // Remove file
  const removeFile = () => {
    setFotoFile(null)
    if (fileInputRef.current) fileInputRef.current.value = ""
  }

  // Submit form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.nama_produk || !form.jenis_produk || !form.harga || !form.deskripsi) {
      showAlert("danger", "Harap isi semua field wajib")
      return
    }
    // ✅ VALIDASI FOTO
    if (!fotoFile) {
      showAlert("danger", "Foto produk wajib diupload")
      return
    }

    const formData = new FormData()
    formData.append("nama_produk", form.nama_produk)
    formData.append("jenis_produk", form.jenis_produk)
    formData.append("harga", form.harga)
    formData.append("varian", form.varian)
    formData.append("ukuran", form.ukuran)
    formData.append("berat", form.berat)
    formData.append("deskripsi", form.deskripsi)
    if (form.stok) formData.append("stok", form.stok)
    if (fotoFile) formData.append("foto", fotoFile)

    setLoading(true)
    try {
      await createProduk(formData)
      showAlert("success", "Produk berhasil ditambahkan")
      router.push("/ikm/produk")
    } catch (error: any) {
      showAlert("danger", error.message || "Gagal menambahkan produk")
    }
    setLoading(false)
  }

  return (
    <div className="container-fluid mt-4 py-4">
      <div className="mb-4">
        <h2 className="mb-0">Tambah Produk Baru</h2>
        <p className="mb-0 text-secondary">Isi informasi produk baru</p>
      </div>

      {/* {alert && (
        <div className={`alert alert-${alert.type} alert-dismissible fade show mb-3`}>
          {alert.message}
          <button className="btn-close" onClick={() => setAlert(null)}></button>
        </div>
      )} */}

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="row g-3">
          <div className="col-md-8">
            <div className="card border">
              <div className="card-header bg-white py-3">
                <p className="mb-0 fw-semibold">Informasi Produk</p>
              </div>
              <div className="card-body">
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label">Nama Produk <span className="text-danger">*</span></label>
                    <input
                      type="text"
                      className="form-control"
                      name="nama_produk"
                      value={form.nama_produk}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Jenis Produk <span className="text-danger">*</span></label>
                    <input
                      type="text"
                      className="form-control"
                      name="jenis_produk"
                      value={form.jenis_produk}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label">Harga <span className="text-danger">*</span></label>
                    <div className="input-group">
                      <span className="input-group-text">Rp</span>
                      <input
                        type="text"
                        className="form-control"
                        name="harga_display"
                        value={Number(form.harga).toLocaleString()}
                        onChange={handleHargaChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <label className="form-label">Stok <span className="text-danger">*</span></label>
                    <input
                      type="number"
                      className="form-control"
                      name="stok"
                      value={form.stok}
                      onChange={(e) => {
                        let value = e.target.value.replace(/[^0-9]/g, "")
                        setForm({ ...form, stok: value })
                      }}
                      required
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label">Berat (gram) <span className="text-danger">*</span></label>
                    <input
                      type="number"
                      className="form-control"
                      name="berat"
                      value={form.berat}
                      onChange={handleBeratChange}
                      required
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label">Ukuran</label>
                    <input
                      type="text"
                      className="form-control"
                      name="ukuran"
                      value={form.ukuran}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label">Varian</label>
                    <input
                      type="text"
                      className="form-control"
                      name="varian"
                      value={form.varian}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-12">
                    <label className="form-label">Deskripsi <span className="text-danger">*</span></label>
                    <textarea
                      className="form-control"
                      name="deskripsi"
                      rows={4}
                      value={form.deskripsi}
                      onChange={handleChange}
                      required
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Foto Produk */}
          <div className="col-md-4">
            <div className="card border mb-3">
              <div className="card-header bg-white py-3">
                <p className="mb-0 fw-semibold">Foto Produk</p>
              </div>
              <div className="card-body">
                <div
                  className={`image-upload-container ${fotoFile ? "dragover" : ""}`}
                  onClick={() => fileInputRef.current?.click()}
                >
                  {!fotoFile ? (
                    <div className="upload-area text-center">
                      <p className="upload-title">Klik atau drag foto produk</p>
                      <p className="upload-subtitle">(Maks 2MB)</p>
                    </div>
                  ) : (
                    <div className="preview-area text-center">
                      <img
                        src={URL.createObjectURL(fotoFile)}
                        alt="Preview"
                        className="preview-image mb-2"
                      />
                      <div className="d-flex justify-content-center gap-2">
                        <button type="button" className="btn btn-sm btn-outline-danger" onClick={removeFile}>
                          Remove
                        </button>
                        <button type="button" className="btn btn-sm btn-outline-secondary" onClick={() => fileInputRef.current?.click()}>
                          Change
                        </button>
                      </div>
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    className="d-none"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                  />
                </div>
              </div>
            </div>

            <div className="card border">
              <div className="card-body">
                <div className="d-flex flex-column flex-md-row gap-2">
                  <button
                    type="submit"
                    className="btn btn-primary w-100"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2"></span>
                        Menyimpan...
                      </>
                    ) : (
                      "Simpan Produk"
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}