"use client"

import { useEffect, useState } from "react"
import { getProfilIkm, updateProfilIkm } from "@/services/ikmService"
import { toast } from "react-toastify"

export default function ProfilPage() {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [submitLoading, setSubmitLoading] = useState(false)

  const [file, setFile] = useState<File | null>(null)
  const [deleteImage, setDeleteImage] = useState(false)
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  const [alert, setAlert] = useState<{ type: "success" | "danger"; message: string } | null>(null)

  const [form, setForm] = useState({
    name: "",
    email: "",
    nama_usaha: "",
    no_telp: "",
    merek: "",
    kategori_id: "",
    deskripsi_singkat: "",
    no_rekening: "",
    jenis_rekening: "",
    nama_rekening: ""
  })

  useEffect(() => {
    fetchData()
  }, [])

  function showAlert(type: "success" | "danger", message: string) {
    if (type === "success") {
      toast.success(message)
    } else {
      toast.error(message)
    }

    setAlert({ type, message })
  }

  const fetchData = async () => {
    try {
      const res = await getProfilIkm()
      setData(res)

      const kategoriId = res.profil_ikm?.kategori?.id ?? res.profil_ikm?.kategori_id ?? ""

      setForm({
        name: res.user?.name ?? "",
        email: res.user?.email ?? "",
        nama_usaha: res.profil_ikm?.nama_usaha ?? "",
        no_telp: res.profil_ikm?.no_telp ?? "",
        merek: res.profil_ikm?.merek ?? "",
        kategori_id: String(kategoriId),
        deskripsi_singkat: res.profil_ikm?.deskripsi_singkat ?? "",
        no_rekening: res.profil_ikm?.no_rekening ?? "",
        jenis_rekening: res.profil_ikm?.jenis_rekening ?? "",
        nama_rekening: res.profil_ikm?.nama_rekening ?? ""
      })

      if (res.profil_ikm?.gambar) {
        setImagePreview(`${process.env.NEXT_PUBLIC_STORAGE_URL}/ikm/${res.profil_ikm.gambar}`)
      }
    } catch {
      showAlert("danger", "Gagal memuat profil")
    }

    setLoading(false)
  }

  const handleChange = (e: any) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: name === "kategori_id" ? value : value })
  }

  const handleImage = (e: any) => {
    const selectedFile = e.target.files[0]
    if (!selectedFile) return

    if (selectedFile.size > 5242880) {
      showAlert("danger", "Ukuran gambar maksimal 5MB")
      return
    }

    setFile(selectedFile)
    setDeleteImage(false)

    const reader = new FileReader()
    reader.onload = (e) => setImagePreview(e.target?.result as string)
    reader.readAsDataURL(selectedFile)
  }

  const removeImage = () => {
    setFile(null)
    setImagePreview(null)
    setDeleteImage(true)
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setSubmitLoading(true)

    try {
      const formData = new FormData()

      formData.append("name", form.name)
      formData.append("email", form.email)
      formData.append("nama_usaha", form.nama_usaha)
      formData.append("no_telp", form.no_telp)
      formData.append("kategori_id", form.kategori_id)
      formData.append("merek", form.merek || "")
      formData.append("deskripsi_singkat", form.deskripsi_singkat || "")
      formData.append("no_rekening", form.no_rekening || "")
      formData.append("jenis_rekening", form.jenis_rekening || "")
      formData.append("nama_rekening", form.nama_rekening || "")

      if (file) formData.append("gambar", file)
      if (deleteImage) formData.append("delete_gambar", "1")

      const result = await updateProfilIkm(formData)

      setForm({
        ...form,
        nama_usaha: result.data.nama_usaha,
        no_telp: result.data.no_telp,
        merek: result.data.merek || "",
        kategori_id: String(result.data.kategori_id),
        deskripsi_singkat: result.data.deskripsi_singkat || "",
        no_rekening: result.data.no_rekening || "",
        jenis_rekening: result.data.jenis_rekening || "",
        nama_rekening: result.data.nama_rekening || ""
      })

      if (result.data.gambar) {
        setImagePreview(`${process.env.NEXT_PUBLIC_STORAGE_URL}/ikm/${result.data.gambar}`)
      } else {
        setImagePreview(null)
      }

      setFile(null)
      setDeleteImage(false)

      showAlert("success", "Profil berhasil diperbarui")
    } catch (err: any) {
      showAlert("danger", err.message || "Gagal memperbarui profil")
    }

    setSubmitLoading(false)
  }

  if (loading) return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: "60vh" }}>
      <div className="text-center">
        <div className="spinner-border text-primary"></div>
        <div className="mt-2">Memuat profil...</div>
      </div>
    </div>
  )

  return (
    <div>
      <div className="container-fluid mt-4 mb-4">
        <h2 className="mb-1 fw-semibold">Edit Profile</h2>
        <p className="text-secondary">Perbarui informasi profil Anda dan IKM Anda</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="row">

          {/* LEFT */}
          <div className="col-md-8">

            {/* USER INFO */}
            <div className="card mb-4">
              <div className="card-header bg-white py-3">
                <p className="mb-0 fw-semibold">Informasi Pengguna</p>
              </div>
              <div className="card-body">
                <div className="mb-3">
                  <label className="form-label">Nama</label>
                  <input name="name" className="form-control" value={form.name} onChange={handleChange} required />
                </div>

                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input type="email" name="email" className="form-control" value={form.email} onChange={handleChange} required />
                </div>
              </div>
            </div>

            {/* IKM INFO */}
            <div className="card mb-4">
              <div className="card-header bg-white py-3 d-flex justify-content-between align-items-center">
                <p className="mb-0 fw-semibold">Informasi IKM</p>

                {data?.profil_ikm?.status && (
                  <span className={`badge ${
                    data.profil_ikm.status === "aktif"
                      ? "bg-success"
                      : data.profil_ikm.status === "pending"
                      ? "bg-warning"
                      : "bg-danger"
                  }`}>
                    {data.profil_ikm.status}
                  </span>
                )}
              </div>

              <div className="card-body">

                <div className="mb-3">
                  <label className="form-label">Nama Usaha</label>
                  <input name="nama_usaha" className="form-control" value={form.nama_usaha} onChange={handleChange} required />
                </div>

                <div className="mb-3">
                  <label className="form-label">Nomor Telepon</label>
                  <input name="no_telp" className="form-control" value={form.no_telp} onChange={handleChange} maxLength={15} required />
                </div>

                <div className="mb-3">
                  <label className="form-label">Merek</label>
                  <input name="merek" className="form-control" value={form.merek} onChange={handleChange} />
                </div>

                <div className="mb-3">
                  <label className="form-label">Kategori</label>
                  <select name="kategori_id" className="form-select" value={form.kategori_id} onChange={handleChange} required>
                    <option value="">Pilih kategori</option>
                    {data?.kategoris?.map((k: any) => (
                      <option key={k.id} value={String(k.id)}>
                        {k.nama_kategori}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label">Deskripsi Singkat</label>
                  <textarea name="deskripsi_singkat" className="form-control" rows={4} value={form.deskripsi_singkat || ""} onChange={handleChange} />
                </div>

              </div>
            </div>

          </div>

          {/* RIGHT */}
          <div className="col-md-4">

            {/* REKENING */}
            <div className="card mb-3">
              <div className="card-header bg-white py-3">
                <p className="mb-0 fw-semibold">Informasi Rekening</p>
              </div>
              <div className="card-body">

                <div className="mb-3">
                  <label className="form-label">Nomor Rekening</label>
                  <input name="no_rekening" className="form-control" value={form.no_rekening} onChange={handleChange} />
                </div>

                <div className="mb-3">
                  <label className="form-label">Jenis Rekening</label>
                  <input name="jenis_rekening" className="form-control" value={form.jenis_rekening} onChange={handleChange} />
                </div>

                <div className="mb-3">
                  <label className="form-label">Nama Rekening</label>
                  <input name="nama_rekening" className="form-control" value={form.nama_rekening} onChange={handleChange} />
                </div>

              </div>
            </div>

            {/* LOGO */}
            <div className="card border mb-3">
              <div className="card-header bg-white py-3">
                <p className="mb-0 fw-semibold">Logo IKM</p>
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
                        <input type="file" hidden onChange={handleImage} />
                      </label>
                    </div>
                  </>
                ) : (
                  <>
                    <p className="text-secondary">
                      Logo ini akan ditampilkan di halaman profil IKM Anda
                    </p>

                    <label className="btn btn-light border">
                      Upload Logo
                      <input type="file" hidden onChange={handleImage} />
                    </label>
                  </>
                )}

                <small className="text-muted d-block mt-2">
                  Maks 5MB
                </small>
              </div>
            </div>

            {/* BUTTON */}
            <div className="card border">
              <div className="card-body">
                <button type="submit" className="btn btn-primary w-100" disabled={submitLoading}>
                  {submitLoading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2"></span>
                      Memproses...
                    </>
                  ) : "Simpan Perubahan"}
                </button>
              </div>
            </div>

          </div>

        </div>
      </form>
    </div>
  )
}