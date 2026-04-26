"use client"

import { useEffect, useState, useRef } from "react"
import { useRouter } from "next/navigation"
import {
  createArtikel,
  getKategoriArtikel
} from "@/services/adminService"
import { KategoriArtikel } from "@/types/artikel"
import { toast } from "react-toastify"
import dynamic from "next/dynamic"
import "react-quill-new/dist/quill.snow.css"

const ReactQuill = dynamic(() => import("react-quill-new"), {
  ssr: false,
})

export default function TambahArtikelPage() {

  const modules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ["bold", "italic", "underline"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link"],
    ["clean"],
  ],
}

  const router = useRouter()

  const [form, setForm] = useState({
    kategori_artikel_id: "",
    judul: "",
    isi: "",
    sumber: "",
    meta_title: "",
    meta_description: "",
    keyword: "",
    status: "draft"
  })

  const [kategori, setKategori] = useState<KategoriArtikel[]>([])
  const [gambarFile, setGambarFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // ========================
  // FETCH KATEGORI
  // ========================
  useEffect(() => {
    const fetchKategori = async () => {
      const res = await getKategoriArtikel()
      setKategori(res)
    }
    fetchKategori()
  }, [])

  const showAlert = (type: "success" | "danger", message: string) => {
    if (type === "success") toast.success(message)
    else toast.error(message)
  }

  // ========================
  // HANDLE INPUT
  // ========================
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  // ========================
  // HANDLE FILE
  // ========================
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setGambarFile(e.target.files[0])
    }
  }

  const removeFile = () => {
    setGambarFile(null)
    if (fileInputRef.current) fileInputRef.current.value = ""
  }

  // ========================
  // SUBMIT
  // ========================
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!form.judul || !form.kategori_artikel_id || !form.isi) {
      showAlert("danger", "Harap isi field wajib")
      return
    }

    const formData = new FormData()

    formData.append("kategori_artikel_id", form.kategori_artikel_id)
    formData.append("judul", form.judul)
    formData.append("isi", form.isi)
    formData.append("status", form.status)

    if (form.sumber) formData.append("sumber", form.sumber)
    if (form.meta_title) formData.append("meta_title", form.meta_title)
    if (form.meta_description) formData.append("meta_description", form.meta_description)
    if (form.keyword) formData.append("keyword", form.keyword)
    if (gambarFile) formData.append("gambar", gambarFile)

    setLoading(true)

    try {
      await createArtikel(formData)
      showAlert("success", "Artikel berhasil ditambahkan")
      router.push("/admin/artikel")
    } catch (error: any) {
      showAlert("danger", error.message || "Gagal menambahkan artikel")
    }

    setLoading(false)
  }

  return (
    <div className="container-fluid mt-4 py-4">

      <div className="mb-4">
        <h2 className="mb-0">Tambah Artikel</h2>
        <p className="text-secondary mb-0">Isi informasi artikel baru</p>
      </div>

      <form onSubmit={handleSubmit} encType="multipart/form-data">

        <div className="row g-3">

          {/* LEFT */}
          <div className="col-md-8">

            <div className="card border">
              <div className="card-header bg-white py-3">
                <p className="mb-0 fw-semibold">Informasi Artikel</p>
              </div>

              <div className="card-body">
                <div className="row g-3">

                  {/* Judul */}
                  <div className="col-12">
                    <label className="form-label">Judul <span className="text-danger">*</span></label>
                    <input
                      type="text"
                      className="form-control"
                      name="judul"
                      value={form.judul}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* Kategori */}
                  <div className="col-md-6">
                    <label className="form-label">Kategori <span className="text-danger">*</span></label>
                    <select
                      className="form-control"
                      name="kategori_artikel_id"
                      value={form.kategori_artikel_id}
                      onChange={handleChange}
                      required
                    >
                      <option value="">-- Pilih Kategori --</option>
                      {kategori.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.nama}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Status */}
                  <div className="col-md-6">
                    <label className="form-label">Status</label>
                    <select
                      className="form-control"
                      name="status"
                      value={form.status}
                      onChange={handleChange}
                    >
                      <option value="draft">Draft</option>
                      <option value="publish">Publish</option>
                    </select>
                  </div>

                  {/* Isi */}
                  <div className="col-12">
                    <label className="form-label">Isi Artikel <span className="text-danger">*</span></label>
                    <ReactQuill
                      theme="snow"
                      value={form.isi}
                      onChange={(value) => setForm({ ...form, isi: value })}
                      modules={modules}
                    />
                  </div>

                  {/* Sumber */}
                  <div className="col-12">
                    <label className="form-label">Sumber</label>
                    <input
                      type="text"
                      className="form-control"
                      name="sumber"
                      value={form.sumber}
                      onChange={handleChange}
                    />
                  </div>

                  {/* SEO */}
                  <div className="col-12">
                    <hr />
                    <p className="fw-semibold mb-2">SEO</p>
                  </div>

                  <div className="col-12">
                    <label className="form-label">Meta Title</label>
                    <input
                      type="text"
                      className="form-control"
                      name="meta_title"
                      value={form.meta_title}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-12">
                    <label className="form-label">Meta Description</label>
                    <textarea
                      className="form-control"
                      rows={3}
                      name="meta_description"
                      value={form.meta_description}
                      onChange={handleChange}
                    ></textarea>
                  </div>

                  <div className="col-12">
                    <label className="form-label">Keyword</label>
                    <input
                      type="text"
                      className="form-control"
                      name="keyword"
                      value={form.keyword}
                      onChange={handleChange}
                    />
                  </div>

                </div>
              </div>
            </div>

          </div>

          {/* RIGHT */}
          <div className="col-md-4">

            {/* GAMBAR */}
            <div className="card border mb-3">
              <div className="card-header bg-white py-3">
                <p className="mb-0 fw-semibold">Gambar Artikel</p>
              </div>

              <div className="card-body">

                <div
                  className="text-center"
                  onClick={() => fileInputRef.current?.click()}
                  style={{ cursor: "pointer" }}
                >

                  {!gambarFile ? (
                    <p className="text-muted">Klik untuk upload gambar</p>
                  ) : (
                    <>
                      <img
                        src={URL.createObjectURL(gambarFile)}
                        className="img-fluid mb-2"
                        style={{ maxHeight: "200px", objectFit: "cover" }}
                      />
                      <div className="d-flex justify-content-center gap-2">
                        <button type="button" className="btn btn-sm btn-danger" onClick={removeFile}>
                          Hapus
                        </button>
                      </div>
                    </>
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

            {/* SUBMIT */}
            <div className="card border">
              <div className="card-body">

                <button
                  type="submit"
                  className="btn btn-primary w-100"
                  disabled={loading}
                >
                  {loading ? "Menyimpan..." : "Simpan Artikel"}
                </button>

              </div>
            </div>

          </div>

        </div>

      </form>

    </div>
  )
}