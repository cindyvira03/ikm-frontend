"use client"

import { useEffect, useState } from "react"
import { getSeo, updateSeo } from "@/services/adminService"
import { toast } from "react-toastify"

export default function SeoSettingsPage() {
  const [loading, setLoading] = useState(true)
  const [submitLoading, setSubmitLoading] = useState(false)

  const [page, setPage] = useState("home")

  const pages = [
    { key: "home", label: "Beranda" },
    { key: "sentra_batik", label: "Sentra Batik" },
    { key: "produk_ikm", label: "Produk IKM" },
    { key: "outlet_ikm", label: "Outlet IKM" },
    { key: "profil_ikm", label: "Profil IKM" },
    { key: "artikel", label: "Artikel" },
  ]

  const [form, setForm] = useState({
    keywords: "",
    page_title: "",
    meta_description: "",
    og_title: "",
    og_description: "",
    og_type: "website",
    meta_robots: "index, follow",
    heading_h1: "",
    canonical_url: "",
    image_alt: "",
    enable_sitemap: true,
    enable_robots: true,
  })

  const [heroImage, setHeroImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [deleteImage, setDeleteImage] = useState(false)

  const [ogImage, setOgImage] = useState<File | null>(null)
  const [ogPreview, setOgPreview] = useState<string | null>(null)
  const [deleteOgImage, setDeleteOgImage] = useState(false)

  useEffect(() => {
    fetchData(page)
  }, [page])

  const fetchData = async (selectedPage: string) => {
    setLoading(true)
    try {
      const data = await getSeo(selectedPage)

      setForm({
        keywords: data?.keywords ?? "",
        page_title: data?.page_title ?? "",
        meta_description: data?.meta_description ?? "",
        og_title: data?.og_title ?? "",
        og_description: data?.og_description ?? "",
        og_type: data?.og_type ?? "website",
        meta_robots: data?.meta_robots ?? "index, follow",
        heading_h1: data?.heading_h1 ?? "",
        canonical_url: data?.canonical_url ?? "",
        image_alt: data?.image_alt ?? "",
        enable_sitemap: data?.enable_sitemap ?? true,
        enable_robots: data?.enable_robots ?? true,
      })

      if (data?.hero_image) {
        setImagePreview(`${process.env.NEXT_PUBLIC_STORAGE_URL}/${data.hero_image}`)
      } else {
        setImagePreview(null)
      }

      if (data?.og_image) {
        setOgPreview(`${process.env.NEXT_PUBLIC_STORAGE_URL}/${data.og_image}`)
      } else {
        setOgPreview(null)
      }
      // setHeroImage(null)
    } catch {
      toast.error("Gagal memuat data SEO")
    }
    setLoading(false)
  }

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value
    })
  }

  const handleImageChange = (e: any) => {
    const file = e.target.files?.[0]
    if (!file) return

    setHeroImage(file)
    setDeleteImage(false)

    const reader = new FileReader()
    reader.onload = (e) => {
      setImagePreview(e.target?.result as string)
    }
    reader.readAsDataURL(file)
  }

  const removeImage = () => {
    setHeroImage(null)
    setImagePreview(null)
    setDeleteImage(true)
  }

  const handleOgImageChange = (e: any) => {
  const file = e.target.files?.[0]
  if (!file) return

  setOgImage(file)
  setDeleteOgImage(false)

  const reader = new FileReader()
  reader.onload = (e) => {
    setOgPreview(e.target?.result as string)
  }
  reader.readAsDataURL(file)
}

const removeOgImage = () => {
  setOgImage(null)
  setOgPreview(null)
  setDeleteOgImage(true)
}

  const handleSubmit = async (e: any) => {
  e.preventDefault()
  setSubmitLoading(true)

  try {
    const formData = new FormData()

    // ✅ WAJIB
    formData.append("page", page)
    formData.append("page_title", form.page_title)

    // optional
    formData.append("keywords", form.keywords || "")
    formData.append("meta_description", form.meta_description || "")
    formData.append("og_title", form.og_title || "")
    formData.append("og_description", form.og_description || "")
    formData.append("og_type", form.og_type || "website")
    formData.append("meta_robots", form.meta_robots || "")
    formData.append("heading_h1", form.heading_h1 || "")
    formData.append("canonical_url", form.canonical_url || "")
    formData.append("image_alt", form.image_alt || "")
    formData.append("enable_sitemap", form.enable_sitemap ? "1" : "0")
    formData.append("enable_robots", form.enable_robots ? "1" : "0")

    // ✅ FILE (PENTING)
    if (heroImage) {
      formData.append("hero_image", heroImage)
    }

    if (deleteImage) {
      formData.append("delete_hero", "1")
    }

    if (ogImage) {
      formData.append("og_image", ogImage)
    }

    if (deleteOgImage) {
      formData.append("delete_og", "1")
    }

    // 🔥 DEBUG (optional)
    // for (let pair of formData.entries()) {
    //   console.log("FORMDATA:", pair[0], pair[1])
    // }

    await updateSeo(formData)

    toast.success("SEO berhasil diperbarui")
  } catch (err: any) {
    toast.error(err.message || "Gagal update SEO")
  }

  setSubmitLoading(false)
}

  if (loading) return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: "60vh" }}>
      <div className="text-center">
        <div className="spinner-border text-primary"></div>
        <div className="mt-2">Memuat pengaturan SEO...</div>
      </div>
    </div>
  )

  return (
    <div>
      <div className="container-fluid mt-4 mb-4">
        <h2 className="fw-semibold mb-1">SEO Settings</h2>
        <p className="text-secondary">
          Kelola pengaturan SEO website agar mudah ditemukan di mesin pencari seperti Google.
        </p>

        <div className="alert alert-info mt-3">
          Setiap tab mewakili halaman berbeda. Silakan isi SEO sesuai dengan konten halaman tersebut agar lebih optimal di pencarian Google.
        </div>

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

          {/* LEFT - META DATA */}
          <div className="col-md-8">
            <div className="card mb-4">
              <div className="card-header bg-white py-3">
                <p className="mb-0 fw-semibold">Meta Data</p>
              </div>
              <div className="card-body">

                <div className="mb-3">
                  <label className="form-label">Page Title</label>
                  <input
                    name="page_title"
                    className="form-control"
                    value={form.page_title}
                    onChange={handleChange}
                    required
                  />
                  <small className="text-muted fst-italic">
                    Judul halaman yang muncul di tab browser dan hasil pencarian Google.
                  </small>
                </div>

                <div className="mb-3">
                  <label className="form-label">Meta Description</label>
                  <textarea
                    name="meta_description"
                    className="form-control"
                    rows={3}
                    value={form.meta_description}
                    onChange={handleChange}
                  />
                  <small className="text-muted fst-italic">
                    Deskripsi singkat halaman yang ditampilkan di hasil pencarian Google.
                  </small>
                </div>

                <div className="mb-3">
                  <label className="form-label">Heading H1</label>
                  <input
                    name="heading_h1"
                    className="form-control"
                    value={form.heading_h1}
                    onChange={handleChange}
                  />
                  <small className="text-muted fst-italic">
                    Judul utama yang muncul di halaman (penting untuk SEO dan struktur konten).
                  </small>
                </div>

                {/* HERO IMAGE KHUSUS */}
                {(page === "home" || page === "sentra_batik") && (
                  <div className="card border mb-3">
                    <div className="card-header bg-white py-3">
                      <p className="mb-0 fw-semibold">Hero Image</p>
                    </div>

                    <div className="card-body text-center">
                      {imagePreview ? (
                        <>
                          <img
                            src={imagePreview}
                            className="img-fluid rounded mb-3"
                            style={{ maxHeight: 200 }}
                          />

                          <div className="d-flex justify-content-center gap-2">
                            <button
                              type="button"
                              className="btn btn-sm btn-outline-danger"
                              onClick={removeImage}
                            >
                              Remove
                            </button>

                            <label className="btn btn-sm btn-outline-secondary">
                              Change
                              <input type="file" hidden onChange={handleImageChange} />
                            </label>
                          </div>
                        </>
                      ) : (
                        <>
                          <p className="text-secondary">
                            Gambar ini akan ditampilkan di bagian hero halaman
                          </p>

                          <label className="btn btn-light border">
                            Upload Image
                            <input type="file" hidden onChange={handleImageChange} />
                          </label>
                        </>
                      )}

                      <small className="text-muted d-block mt-2 fst-italic">
                        Gunakan gambar berkualitas tinggi untuk tampilan awal halaman.
                      </small>
                    </div>
                  </div>
                )}

                {(page === "home" || page === "sentra_batik") && (
                  <div className="mb-3">
                    <label className="form-label">Image Alt</label>
                    <input
                      name="image_alt"
                      className="form-control"
                      value={form.image_alt}
                      onChange={handleChange}
                    />
                    <small className="text-muted fst-italic">
                      Deskripsi gambar untuk membantu mesin pencari memahami isi gambar.
                    </small>
                  </div>
                )}

              </div>
            </div>
          </div>


          {/* RIGHT - TECHNICAL SETTINGS */}
          <div className="col-md-4">
            <div className="card mb-4">
              <div className="card-header bg-white py-3">
                <p className="mb-0 fw-semibold">Technical Settings</p>
              </div>
              <div className="card-body">

                <div className="mb-3">
                  <label className="form-label">Canonical URL</label>
                  <input
                    name="canonical_url"
                    className="form-control"
                    value={form.canonical_url}
                    onChange={handleChange}
                  />
                  <small className="text-muted fst-italic">
                    URL utama halaman untuk menghindari duplikat konten di mesin pencari.
                  </small>
                </div>

                <div className="mb-3">
                  <label className="form-label">Meta Robots</label>
                  <select
                    name="meta_robots"
                    className="form-select"
                    value={form.meta_robots}
                    onChange={handleChange}
                  >
                    <option value="index, follow">Index, Follow</option>
                    <option value="noindex, follow">No Index, Follow</option>
                    <option value="noindex, nofollow">No Index, No Follow</option>
                  </select>
                  <small className="text-muted fst-italic">
                    Mengatur apakah halaman boleh diindeks dan diikuti oleh mesin pencari.
                  </small>
                </div>

              </div>
            </div>

            {/* BUTTON */}
            <div className="card">
              <div className="card-body">
                <button type="submit" className="btn btn-primary w-100" disabled={submitLoading}>
                  {submitLoading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2"></span>
                      Menyimpan...
                    </>
                  ) : "Simpan SEO"}
                </button>
              </div>
            </div>

          </div>

        </div>
      </form>
    </div>
  )
}