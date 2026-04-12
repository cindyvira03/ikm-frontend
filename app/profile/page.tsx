"use client"

import { useEffect, useState } from "react"
import { toast } from "react-toastify"

import {
  getProfilePembeli,
  updateProfilePembeli,
} from "@/services/pembeliService"

export default function ProfilPembeliPage() {

  const [loading, setLoading] = useState(true)
  const [submitLoading, setSubmitLoading] = useState(false)

  const [form, setForm] = useState({
    name: "",
    email: "",
    nama_lengkap: "",
    jenis_kelamin: "",
    no_hp: "",
  })

  function showAlert(type: "success" | "danger", message: string) {
    if (type === "success") {
      toast.success(message)
    } else {
      toast.error(message)
    }
  }

  /* =========================
     FETCH DATA (INI YANG FIX)
  ========================= */
  useEffect(() => {

    const fetchData = async () => {
      try {
        const res = await getProfilePembeli()

        console.log("PROFILE RES:", res) // 🔥 debug (boleh dihapus nanti)

        if (!res.success) {
          throw new Error(res.message)
        }

        // 🔥 AMBIL DARI res.data (PENTING)
        const user = res.data.user
        const pembeli = res.data.pembeli

        setForm({
          name: user?.name ?? "",
          email: user?.email ?? "",
          nama_lengkap: pembeli?.nama_lengkap ?? "",
          jenis_kelamin: pembeli?.jenis_kelamin ?? "",
          no_hp: pembeli?.no_hp ?? "",
        })

      } catch (err: any) {
        showAlert("danger", err.message || "Gagal memuat profil")
      }

      setLoading(false)
    }

    fetchData()

  }, [])

  /* =========================
     HANDLE CHANGE
  ========================= */
  const handleChange = (e: any) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  /* =========================
     SUBMIT
  ========================= */
  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setSubmitLoading(true)

    try {

      const res = await updateProfilePembeli(form)

      if (!res.success) {
        throw new Error(res.message)
      }

      showAlert("success", "Profil berhasil diperbarui")

    } catch (err: any) {
      showAlert("danger", err.message || "Gagal update profil")
    }

    setSubmitLoading(false)
  }

  /* =========================
     LOADING
  ========================= */
  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "60vh" }}>
        <div className="text-center">
          <div className="spinner-border text-primary"></div>
          <div className="mt-2">Memuat profil...</div>
        </div>
      </div>
    )
  }

  /* =========================
     UI
  ========================= */
  return (
    <div>

      <div className="container-fluid mt-4 mb-4">
        <h2 className="mb-1 fw-semibold">Edit Profil</h2>
        <p className="text-secondary">Perbarui informasi akun Anda</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="row">

          {/* LEFT */}
          <div className="col-md-8">

            <div className="card mb-4">
              <div className="card-header bg-white py-3">
                <p className="mb-0 fw-semibold">Informasi Pribadi</p>
              </div>

              <div className="card-body">

                <div className="mb-3">
                  <label className="form-label">Nama Lengkap</label>
                  <input
                    name="nama_lengkap"
                    className="form-control"
                    value={form.nama_lengkap}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Jenis Kelamin</label>
                  <select
                    name="jenis_kelamin"
                    className="form-select"
                    value={form.jenis_kelamin}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Pilih</option>
                    <option value="L">Laki-laki</option>
                    <option value="P">Perempuan</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label">No HP</label>
                  <input
                    name="no_hp"
                    className="form-control"
                    value={form.no_hp}
                    onChange={handleChange}
                    required
                  />
                </div>

              </div>
            </div>

          </div>

          {/* RIGHT */}
          <div className="col-md-4">

            <div className="card mb-3">
              <div className="card-header bg-white py-3">
                <p className="mb-0 fw-semibold">Data Akun</p>
              </div>

              <div className="card-body">

                <div className="mb-3">
                  <label className="form-label">Username</label>
                  <input
                    name="name"
                    className="form-control"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </div>

              </div>
            </div>

            <div className="card border">
              <div className="card-body">
                <button
                  type="submit"
                  className="btn btn-primary w-100"
                  disabled={submitLoading}
                >
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