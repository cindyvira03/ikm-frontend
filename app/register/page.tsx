"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  registerPembeli,
  registerIkm,
} from "@/services/authService"
import Link from "next/link"
import { getProducts, Kategori } from "@/services/productService"

export default function RegisterPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<"pembeli" | "ikm">("pembeli")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [kategoriList, setKategoriList] = useState<any[]>([])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    const formData = new FormData(e.currentTarget)
    const payload = Object.fromEntries(formData.entries())

    try {
      if (activeTab === "pembeli") {
        await registerPembeli(payload as any)
      } else {
        await registerIkm({
          ...payload,
          kategori_id: Number(payload.kategori_id),
        } as any)
      }

      router.push("/login")
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

useEffect(() => {
  const fetchKategori = async () => {
    try {
      const res = await getProducts()

      console.log("RES:", res)

      setKategoriList(res.kategori) // ✅ sekarang valid
    } catch (err) {
      console.error("Gagal ambil kategori", err)
    }
  }

  fetchKategori()
}, [])

  return (
    <div className="min-vh-100 d-flex justify-content-center align-items-center bg-light py-3">
      <div className="w-100" style={{ maxWidth: "680px" }}>
        <div className="card shadow-sm border-0">
          <div className="card-body p-3">

            {/* Logo + Title */}
            <div className="text-center mb-3">
              <img
                src="/logo_probolinggo.png"
                width="50"
                alt="Logo"
                className="d-block mx-auto mb-1"
              />
              {/* <h6 className="fw-semibold mb-0">
                Jelajah Probolinggo
              </h6> */}
              <Link href="/" className="text-dark text-decoration-none">
                <h6 className="fw-semibold mb-0 text-center">
                    Jelajah Probolinggo
                </h6>
              </Link>
            </div>

            {/* Tabs */}
            <div className="d-flex mb-3">
              <button
                className={`btn btn-sm w-50 ${activeTab === "pembeli" ? "btn-primary" : "btn-outline-primary"}`}
                onClick={() => setActiveTab("pembeli")}
                type="button"
              >
                Pembeli
              </button>
              <button
                className={`btn btn-sm w-50 ms-2 ${activeTab === "ikm" ? "btn-primary" : "btn-outline-primary"}`}
                onClick={() => setActiveTab("ikm")}
                type="button"
              >
                IKM
              </button>
            </div>

            {error && (
              <div className="alert alert-danger py-1 small">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="row g-2">

                {/* KOLOM KIRI */}
                <div className="col-md-6">
                  {activeTab === "pembeli" && (
                    <>
                      <h6 className="fw-bold mb-2 small text-uppercase">
                        Informasi Pribadi
                      </h6>

                      <div className="mb-2">
                        <label className="form-label small">Nama Lengkap</label>
                        <input name="nama_lengkap" className="form-control form-control-sm" required />
                      </div>

                      <div className="mb-2">
                        <label className="form-label small">Jenis Kelamin</label>
                        <select name="jenis_kelamin" className="form-select form-select-sm" required>
                          <option value="">Pilih</option>
                          <option value="L">Laki-laki</option>
                          <option value="P">Perempuan</option>
                        </select>
                      </div>

                      <div className="mb-2">
                        <label className="form-label small">No Telepon</label>
                        <input name="no_hp" defaultValue="62" className="form-control form-control-sm" required />
                      </div>
                    </>
                  )}

                  {activeTab === "ikm" && (
                    <>
                      <h6 className="fw-bold mb-2 small text-uppercase">
                        Data Usaha
                      </h6>

                      <div className="mb-2">
                        <label className="form-label small">Nama Usaha</label>
                        <input name="nama_usaha" className="form-control form-control-sm" required />
                      </div>

                      <div className="mb-2">
                        <label className="form-label small">No Telepon</label>
                        <input name="no_telp" defaultValue="62" className="form-control form-control-sm" required />
                      </div>

                      <div className="mb-2">
                        <label className="form-label small">Merek</label>
                        <input name="merek" className="form-control form-control-sm" required />
                      </div>

                      <div className="mb-2">
                        <label className="form-label small">Kategori</label>
                        <select
                          name="kategori_id"
                          className="form-select form-select-sm"
                          required
                        >
                          <option value="">Pilih Kategori</option>

                          {kategoriList.length === 0 ? (
                            <option disabled>Loading...</option>
                          ) : (
                            kategoriList.map((kat) => (
                              <option key={kat.id} value={kat.id}>
                                {kat.nama_kategori}
                              </option>
                            ))
                          )}
                        </select>
                      </div>
                    </>
                  )}
                </div>

                {/* KOLOM KANAN */}
                <div className="col-md-6">
                  <h6 className="fw-bold mb-2 small text-uppercase">
                    Data Akun
                  </h6>

                  <div className="mb-2">
                    <label className="form-label small">Nama</label>
                    <input name="name" className="form-control form-control-sm" required />
                  </div>

                  <div className="mb-2">
                    <label className="form-label small">Email</label>
                    <input name="email" type="email" className="form-control form-control-sm" required />
                  </div>

                  <div className="mb-2">
                    <label className="form-label small">Password</label>
                    <input name="password" type="password" className="form-control form-control-sm" required />
                  </div>

                  <div className="mb-2">
                    <label className="form-label small">Konfirmasi Password</label>
                    <input
                      name="password_confirmation"
                      type="password"
                      className="form-control form-control-sm"
                      required
                    />
                  </div>
                </div>

              </div>

              <button
                type="submit"
                className="btn btn-primary btn-sm w-100 mt-2"
                disabled={loading}
              >
                {loading ? "Memproses..." : "Daftar"}
              </button>

              <p className="text-center text-secondary small mt-2 mb-0">
                Sudah punya akun?{" "}
                <a href="/login" className="text-primary">
                  Masuk
                </a>
              </p>

            </form>

          </div>
        </div>
      </div>
    </div>
  )
}