"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import {
  getArtikelDetail,
  updateArtikel,
  deleteArtikel,
  getKategoriArtikel
} from "@/services/adminService"
import { toast } from "react-toastify"
import dynamic from "next/dynamic"
import "react-quill-new/dist/quill.snow.css"

const ReactQuill = dynamic(() => import("react-quill-new"), {
  ssr: false,
})

export default function EditArtikelPage() {
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
  const params = useParams()
  const id = Number(params.id)

  const [loading, setLoading] = useState(true)
  const [submitLoading, setSubmitLoading] = useState(false)

  const [kategoriList, setKategoriList] = useState<any[]>([])

  const [fotoFile, setFotoFile] = useState<File | null>(null)
  const [preview, setPreview] = useState("")

  const [form, setForm] = useState({
    kategori_artikel_id: "",
    judul: "",
    isi: "",
    sumber: "",
    meta_title: "",
    meta_description: "",
    keyword: "",
    status: "draft",
  })

  function showAlert(type: "success" | "danger", message: string) {
    if (type === "success") toast.success(message)
    else toast.error(message)
  }

  useEffect(() => {
    fetchData()
  }, [])

  async function fetchData() {
    try {
      const artikel = await getArtikelDetail(id)
      const kategori = await getKategoriArtikel()

      setKategoriList(kategori)

      setForm({
        kategori_artikel_id: String(artikel.kategori_artikel_id),
        judul: artikel.judul,
        isi: artikel.isi,
        sumber: artikel.sumber ?? "",
        meta_title: artikel.meta_title ?? "",
        meta_description: artikel.meta_description ?? "",
        keyword: artikel.keyword ?? "",
        status: artikel.status,
      })

      if (artikel.gambar) {
        setPreview(`${process.env.NEXT_PUBLIC_STORAGE_URL}/${artikel.gambar}`)
      }

    } catch (err) {
      showAlert("danger", "Artikel tidak ditemukan")
      router.push("/admin/artikel")
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleFoto = (e: any) => {
    const file = e.target.files[0]
    if (!file) return

    if (file.size > 5 * 1024 * 1024) {
      showAlert("danger", "Ukuran gambar maksimal 5MB")
      return
    }

    setFotoFile(file)
    setPreview(URL.createObjectURL(file))
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setSubmitLoading(true)

    try {
      const formData = new FormData()

      Object.entries(form).forEach(([key, val]) => {
        formData.append(key, String(val))
      })

      if (fotoFile) {
        formData.append("gambar", fotoFile)
      }

      await updateArtikel(id, formData)

      showAlert("success", "Artikel berhasil diperbarui")

    } catch (err: any) {
      showAlert("danger", err.message || "Gagal update artikel")
    }

    setSubmitLoading(false)
  }

  const handleDelete = async () => {
    if (!confirm("Yakin hapus artikel ini?")) return

    try {
      await deleteArtikel(id)
      showAlert("success", "Artikel berhasil dihapus")
      router.push("/admin/artikel")
    } catch (err) {
      showAlert("danger", "Gagal menghapus artikel")
    }
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
    <div className="container-fluid mt-4">

      <div className="mb-4">
        <h2>Edit Artikel</h2>
        <p className="text-secondary">Perbarui konten artikel</p>
      </div>

      <form onSubmit={handleSubmit}>

        <div className="row g-3">

          {/* LEFT */}
          <div className="col-md-8">

            <div className="card border">
              <div className="card-header bg-white">
                <b>Konten Artikel</b>
              </div>

              <div className="card-body">
                <div className="row g-3">

                  <div className="col-md-6">
                    <label>Kategori</label>
                    <select
                      name="kategori_artikel_id"
                      className="form-control"
                      value={form.kategori_artikel_id}
                      onChange={handleChange}
                      required
                    >
                      <option value="">-- pilih kategori --</option>
                      {kategoriList.map((k) => (
                        <option key={k.id} value={k.id}>
                          {k.nama}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="col-md-6">
                    <label>Status</label>
                    <select
                      name="status"
                      className="form-control"
                      value={form.status}
                      onChange={handleChange}
                    >
                      <option value="draft">Draft</option>
                      <option value="publish">Publish</option>
                    </select>
                  </div>

                  <div className="col-12">
                    <label>Judul</label>
                    <input
                      name="judul"
                      className="form-control"
                      value={form.judul}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-12">
                    <label>Isi Artikel</label>
                    <ReactQuill
                      theme="snow"
                      value={form.isi}
                      onChange={(value) => setForm({ ...form, isi: value })}
                      modules={modules}
                    />
                  </div>

                  <div className="col-12">
                    <label>Sumber</label>
                    <input
                      name="sumber"
                      className="form-control"
                      value={form.sumber}
                      onChange={handleChange}
                    />
                  </div>

                </div>
              </div>
            </div>

            {/* SEO */}
            <div className="card border mt-3">
              <div className="card-header bg-white">
                <b>SEO</b>
              </div>

              <div className="card-body">

                <div className="mb-3">
                  <label>Meta Title</label>
                  <input
                    name="meta_title"
                    className="form-control"
                    value={form.meta_title}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-3">
                  <label>Meta Description</label>
                  <textarea
                    name="meta_description"
                    className="form-control"
                    rows={3}
                    value={form.meta_description}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label>Keyword</label>
                  <input
                    name="keyword"
                    className="form-control"
                    value={form.keyword}
                    onChange={handleChange}
                  />
                </div>

              </div>
            </div>

          </div>

          {/* RIGHT */}
          <div className="col-md-4">

            {/* GAMBAR */}
            <div className="card mb-3">
              <div className="card-header bg-white">
                <b>Gambar</b>
              </div>

              <div className="card-body text-center">

                {preview && (
                  <img
                    src={preview}
                    className="img-fluid rounded mb-3"
                    style={{ maxHeight: 150 }}
                  />
                )}

                <input
                  type="file"
                  className="form-control"
                  onChange={handleFoto}
                />

              </div>
            </div>

            {/* BUTTON */}
            <div className="card mb-3">
              <div className="card-body d-grid gap-2">

                <button className="btn btn-primary" disabled={submitLoading}>
                  {submitLoading ? "Menyimpan..." : "Update Artikel"}
                </button>

                <button
                  type="button"
                  className="btn btn-light border"
                  onClick={() => router.push("/admin/artikel")}
                >
                  Kembali
                </button>

              </div>
            </div>

            {/* DELETE */}
            <div className="card">
              <div className="card-body d-flex justify-content-between">
                <b>Danger Zone</b>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={handleDelete}
                >
                  Hapus
                </button>
              </div>
            </div>

          </div>

        </div>

      </form>

    </div>
  )
}