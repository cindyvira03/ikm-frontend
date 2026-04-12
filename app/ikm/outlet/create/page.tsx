"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "react-toastify"

import { createOutlet } from "@/services/ikmService"

export default function CreateOutletPage() {

  const router = useRouter()

  const [alamat, setAlamat] = useState("")
  const [lokasiGooglemap, setLokasiGooglemap] = useState("")
  const [districtId, setDistrictId] = useState("")

  const [imageFile, setImageFile] = useState<File | null>(null)
  const [preview, setPreview] = useState("")

  const [loading, setLoading] = useState(false)

  const [alert, setAlert] = useState<{ type: "success" | "danger"; message: string } | null>(null)

  function showAlert(type: "success" | "danger", message: string) {
    if (type === "success") {
      toast.success(message)
    } else {
      toast.error(message)
    }

    setAlert({ type, message })
  }

  /* ========================
     IMAGE UPLOAD
  ======================== */

  const handleImage = (file: File) => {

    if (!file.type.startsWith("image/")) {
      showAlert("danger", "File harus berupa gambar")
      return
    }

    if (file.size > 2000000) {
      showAlert("danger", "Ukuran gambar maksimal 2MB")
      return
    }

    setImageFile(file)

    const reader = new FileReader()

    reader.onload = () => {
      setPreview(reader.result as string)
    }

    reader.readAsDataURL(file)
  }

  /* ========================
     SUBMIT
  ======================== */

  const handleSubmit = async (e: any) => {

    e.preventDefault()

    if (!districtId) {
      showAlert("danger", "Pilih kecamatan terlebih dahulu")
      return
    }

    setLoading(true)

    try {

      const formData = new FormData()

      formData.append("alamat", alamat)
      formData.append("lokasi_googlemap", lokasiGooglemap)

      formData.append("provinsi", "Jawa Timur")
      formData.append("kota_kab", "Probolinggo")
      formData.append("kecamatan", districtId)

      if (imageFile) {
        formData.append("foto_lokasi_tampak_depan", imageFile)
      }

      await createOutlet(formData)

      showAlert("success", "Outlet berhasil dibuat")

      setTimeout(() => {
        router.push("/ikm/outlet")
      }, 1500)

    } catch (err: any) {
      showAlert("danger", err.message || "Gagal membuat outlet")
    }

    setLoading(false)
  }

  /* ========================
     UI
  ======================== */

  return (

    <div className="container-fluid mt-4 py-3 pb-5">

      <div className="mb-4">
        <h2 className="mb-0">Tambah Outlet Baru</h2>
        <p className="text-secondary">Isi informasi outlet baru</p>
      </div>

      <form onSubmit={handleSubmit}>

        <div className="row g-4">

          {/* LEFT */}
          <div className="col-lg-8">

            <div className="card border-0 shadow-sm">

              <div className="card-header bg-white py-3 border-bottom">
                <p className="mb-0 fw-semibold">Informasi Outlet</p>
              </div>

              <div className="card-body">

                <div className="mb-3">
                  <label className="form-label">Alamat</label>
                  <textarea
                    className="form-control"
                    rows={3}
                    value={alamat}
                    onChange={(e) => setAlamat(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Link Google Maps</label>
                  <input
                    type="url"
                    className="form-control"
                    value={lokasiGooglemap}
                    onChange={(e) => setLokasiGooglemap(e.target.value)}
                    required
                  />
                </div>

                <div className="row g-3">

                  <div className="col-md-4">
                    <label className="form-label">Provinsi</label>
                    <input
                      className="form-control"
                      value="Jawa Timur"
                      readOnly
                    />
                  </div>

                  <div className="col-md-4">
                    <label className="form-label">Kota / Kab</label>
                    <input
                      className="form-control"
                      value="Probolinggo"
                      readOnly
                    />
                  </div>

                  <div className="col-md-4">
                    <label className="form-label">Kecamatan</label>
                    <select
                      className="form-select"
                      value={districtId}
                      onChange={(e) => setDistrictId(e.target.value)}
                      required
                    >
                      <option value="">Pilih Kecamatan</option>
                      <option value="Kademangan">Kademangan</option>
                      <option value="Kedopok">Kedopok</option>
                      <option value="Kanigaran">Kanigaran</option>
                      <option value="Mayangan">Mayangan</option>
                      <option value="Wonoasih">Wonoasih</option>
                    </select>
                  </div>

                </div>

              </div>

            </div>

          </div>

          {/* RIGHT */}
          <div className="col-lg-4">

            <div className="card border-0 shadow-sm mb-3">

              <div className="card-header bg-white py-3 border-bottom">
                Foto Lokasi Tampak Depan
              </div>

              <div className="card-body text-center">

                {!preview && (
                  <input
                    type="file"
                    className="form-control"
                    accept="image/*"
                    onChange={(e) =>
                      e.target.files &&
                      handleImage(e.target.files[0])
                    }
                  />
                )}

                {preview && (
                  <div className="mb-3">
                    <img
                      src={preview}
                      className="img-fluid rounded mb-2"
                    />
                    <button
                      type="button"
                      className="btn btn-sm btn-danger"
                      onClick={() => {
                        setPreview("")
                        setImageFile(null)
                      }}
                    >
                      Remove
                    </button>
                  </div>
                )}

                <small className="text-muted d-block mt-2">
                  Maks 5MB
                </small>

              </div>

            </div>

            <div className="card border-0 shadow-sm">

              <div className="card-body">

                <button
                  type="submit"
                  className="btn btn-primary w-100"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2"></span>
                      Memproses...
                    </>
                  ) : (
                    "Simpan Outlet"
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