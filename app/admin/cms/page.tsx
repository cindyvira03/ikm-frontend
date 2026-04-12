"use client"

import { useEffect, useState } from "react"
import { getCms, updateCms } from "@/services/adminService"
import { toast } from "react-toastify"

export default function CmsPage() {
  const [loading, setLoading] = useState(true)
  const [submitLoading, setSubmitLoading] = useState(false)

  const [page, setPage] = useState("home")

  const pages = [
    { key: "home", label: "Beranda" },
    { key: "sentra_batik", label: "Sentra Batik" },
  ]

  const [form, setForm] = useState({
    hero_title: "",
    hero_description: "",
    hero_image: null as File | null,
    about_title: "",
    about_description: "",
  })

  const [preview, setPreview] = useState<string | null>(null)

  useEffect(() => {
    fetchData(page)
  }, [page])

  const fetchData = async (selectedPage: string) => {
    setLoading(true)
    try {
      const data = await getCms(selectedPage)

      setForm({
        hero_title: data?.hero_title ?? "",
        hero_description: data?.hero_description ?? "",
        hero_image: null,
        about_title: data?.about_title ?? "",
        about_description: data?.about_description ?? "",
      })

      setPreview(
        data?.hero_image
          ? `${process.env.NEXT_PUBLIC_STORAGE_URL}/${data.hero_image}`
          : null
      )
    } catch {
      toast.error("Gagal memuat data CMS")
    }
    setLoading(false)
  }

  const handleChange = (e: any) => {
    const { name, value, files } = e.target

    if (name === "hero_image") {
      const file = files[0]

      setForm({
        ...form,
        hero_image: file,
      })

      if (file) {
        setPreview(URL.createObjectURL(file))
      }
    } else {
      setForm({
        ...form,
        [name]: value,
      })
    }
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setSubmitLoading(true)

    try {
      const formData = new FormData()

      formData.append("page", page)
      formData.append("hero_title", form.hero_title || "")
      formData.append("hero_description", form.hero_description || "")
      formData.append("about_title", form.about_title || "")
      formData.append("about_description", form.about_description || "")

      if (form.hero_image) {
        formData.append("hero_image", form.hero_image)
      }

      await updateCms(formData)

      toast.success("Konten berhasil diperbarui")
    } catch (err: any) {
      toast.error(err.message || "Gagal update CMS")
    }

    setSubmitLoading(false)
  }

  if (loading)
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "60vh" }}
      >
        <div className="text-center">
          <div className="spinner-border text-primary"></div>
          <div className="mt-2">Memuat konten CMS...</div>
        </div>
      </div>
    )

  return (
    <div>
      {/* HEADER */}
      <div className="container-fluid mt-4 mb-4">
        <h2 className="fw-semibold mb-1">CMS Konten Halaman</h2>
        <p className="text-secondary">
          Kelola isi konten halaman seperti teks dan gambar yang ditampilkan di
          website.
        </p>

        {/* INFO */}
        <div className="alert alert-info mt-3">
          Setiap tab mewakili halaman berbeda. Silakan isi konten sesuai halaman.
          Konten ini akan langsung tampil di website dan berpengaruh pada SEO.
        </div>

        {/* NAV TAB */}
        <ul className="nav nav-tabs mt-3">
          {pages.map((p) => (
            <li className="nav-item" key={p.key}>
              <button
                type="button"
                className={`nav-link ${page === p.key ? "active" : ""}`}
                onClick={() => setPage(p.key)}
              >
                {p.label}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="row">
          {/* LEFT */}
          <div className="col-md-8">
            {/* HERO */}
            <div className="card mb-4">
              <div className="card-header bg-white py-3">
                <p className="mb-0 fw-semibold">Hero Section</p>
              </div>
              <div className="card-body">
                <div className="mb-3">
                  <label className="form-label">Judul Utama</label>
                  <input
                    name="hero_title"
                    className="form-control"
                    value={form.hero_title}
                    onChange={handleChange}
                  />
                  <small className="text-muted">
                    Judul besar di bagian atas halaman
                  </small>
                </div>

                <div className="mb-3">
                  <label className="form-label">Deskripsi</label>
                  <textarea
                    name="hero_description"
                    className="form-control"
                    rows={4}
                    value={form.hero_description}
                    onChange={handleChange}
                  />
                  <small className="text-muted">
                    Deskripsi singkat di bawah judul
                  </small>
                </div>

                <div className="mb-3">
                  <label className="form-label">Gambar Hero</label>
                  <input
                    type="file"
                    name="hero_image"
                    className="form-control"
                    accept="image/*"
                    onChange={handleChange}
                  />
                  <small className="text-muted">
                    Upload gambar (jpg/png, max 2MB)
                  </small>
                </div>

                {preview && (
                  <img
                    src={preview}
                    alt="Preview"
                    className="img-fluid mt-2 rounded"
                    style={{ maxHeight: "200px" }}
                  />
                )}
              </div>
            </div>

            {/* ABOUT */}
            <div className="card mb-4">
              <div className="card-header bg-white py-3">
                <p className="mb-0 fw-semibold">About Section</p>
              </div>
              <div className="card-body">
                <div className="mb-3">
                  <label className="form-label">Judul About</label>
                  <input
                    name="about_title"
                    className="form-control"
                    value={form.about_title}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Deskripsi About</label>
                  <textarea
                    name="about_description"
                    className="form-control"
                    rows={4}
                    value={form.about_description}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="col-md-4">
            <div className="card mb-3">
              <div className="card-header bg-white py-3">
                <p className="mb-0 fw-semibold">Informasi</p>
              </div>
              <div className="card-body">
                <p className="small text-muted mb-0">
                  Konten di sini akan langsung tampil di halaman website sesuai
                  tab yang dipilih. Gunakan teks yang relevan agar mendukung SEO.
                </p>
              </div>
            </div>

            <div className="card">
              <div className="card-body">
                <button
                  type="submit"
                  className="btn btn-primary w-100"
                  disabled={submitLoading}
                >
                  {submitLoading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2"></span>
                      Menyimpan...
                    </>
                  ) : (
                    "Simpan Konten"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}