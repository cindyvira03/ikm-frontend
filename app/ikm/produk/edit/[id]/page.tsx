"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { getProdukById, updateProduk, deleteProduk } from "@/services/ikmService"
import { Product } from "@/types/product"
import { toast } from "react-toastify"

export default function EditProdukPage() {

  const router = useRouter()
  const params = useParams()
  const id = Number(params.id)

  const [produk, setProduk] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [submitLoading, setSubmitLoading] = useState(false)

  const [alert, setAlert] = useState<{ type: "success" | "danger"; message: string } | null>(null)

  const [hargaDisplay, setHargaDisplay] = useState("")
  const [fotoFile, setFotoFile] = useState<File | null>(null)
  const [preview, setPreview] = useState("")

  const [form, setForm] = useState({
    nama_produk: "",
    jenis_produk: "",
    harga: "",
    berat: "",
    varian: "",
    ukuran: "",
    deskripsi: "",
    stok: "",
  })

  useEffect(() => {
    fetchProduk()
  }, [])

  function showAlert(type: "success" | "danger", message: string) {

  if (type === "success") {
    toast.success(message)
  } else {
    toast.error(message)
  }

  setAlert({ type, message }) // biarin tetap ada (biar ga rusak struktur)
}

  async function fetchProduk() {
    try {

      const data = await getProdukById(id)

      setProduk(data)

      setForm({
        nama_produk: data.nama_produk,
        jenis_produk: data.jenis_produk,
        harga: String(data.harga),
        berat: String(data.berat ?? ""),
        varian: data.varian ?? "",
        ukuran: data.ukuran ?? "",
        deskripsi: data.deskripsi,
        stok: String(data.stok ?? 0),
      })

      setHargaDisplay(formatNumber(data.harga))
      setPreview(`${process.env.NEXT_PUBLIC_STORAGE_URL}/${data.foto}`)

    } catch (err) {
      showAlert("danger", "Produk tidak ditemukan")
      router.push("/ikm/produk")
    } finally {
      setLoading(false)
    }
  }

  function formatNumber(num: number | string) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  }

  function handleHargaChange(e: any) {

    let value = e.target.value.replace(/[^0-9]/g, "")

    setHargaDisplay(formatNumber(value))
    setForm({ ...form, harga: value })
  }

  function handleChange(e: any) {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  function handleFoto(e: any) {

    const file = e.target.files[0]

    if (!file) return

    if (file.size > 5 * 1024 * 1024) {
      showAlert("danger", "Ukuran gambar maksimal 5MB")
      return
    }

    setFotoFile(file)
    setPreview(URL.createObjectURL(file))
  }

  async function handleSubmit(e: any) {

    e.preventDefault()

    setSubmitLoading(true)

    try {

      const formData = new FormData()

      Object.entries(form).forEach(([key, val]) => {
        formData.append(key, val)
      })

      if (fotoFile) formData.append("foto", fotoFile)

      await updateProduk(id, formData)

      showAlert("success", "Produk berhasil diperbarui")

    } catch (err: any) {

      showAlert("danger", err.message || "Gagal memperbarui produk")

    }

    setSubmitLoading(false)
  }

  async function handleDelete() {

    if (!confirm("Yakin hapus produk ini?")) return

    try {
      await deleteProduk(id)
      showAlert("success", "Produk berhasil dihapus")
    } catch (error) {
      showAlert("danger", "Gagal menghapus produk")
    }
    setLoading(false)
  }

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary"></div>
        <div className="mt-2">Memuat data produk...</div>
      </div>
    )
  }

  return (
    <div className="container">

      <div className="container-fluid mt-4 mb-4">
        <h2>Edit Produk: {produk?.nama_produk}</h2>
        <p className="text-secondary">Isi informasi produk</p>
      </div>

      {/* {alert && (
        <div className={`alert alert-${alert.type} alert-dismissible fade show`}>
          {alert.message}
          <button className="btn-close" onClick={() => setAlert(null)}></button>
        </div>
      )} */}

      <form onSubmit={handleSubmit}>

        <div className="row g-3">

          {/* LEFT FORM */}
          <div className="col-md-8">

            <div className="card">
              <div className="card-header bg-white">
                <b>Informasi Produk</b>
              </div>

              <div className="card-body">

                <div className="row g-3">

                  <div className="col-md-6">
                    <label>Nama Produk</label>
                    <input
                      name="nama_produk"
                      className="form-control"
                      value={form.nama_produk}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-md-6">
                    <label>Jenis Produk</label>
                    <input
                      name="jenis_produk"
                      className="form-control"
                      value={form.jenis_produk}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-md-4">
                    <label>Harga</label>
                    <div className="input-group">
                      <span className="input-group-text">Rp</span>
                      <input
                        className="form-control"
                        value={hargaDisplay}
                        onChange={handleHargaChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="col-md-4">
                  <label>Stok</label>
                  <input
                    name="stok"
                    type="text"
                    className="form-control"
                    value={form.stok}
                    onChange={(e) => {
                      let value = e.target.value.replace(/[^0-9]/g, "")
                      setForm({ ...form, stok: value })
                    }}
                  />
                </div>

                  <div className="col-md-4">
                    <label>Berat (gram)</label>
                    <input
                      name="berat"
                      type="number"
                      className="form-control"
                      value={form.berat}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-md-4">
                    <label>Varian</label>
                    <input
                      name="varian"
                      className="form-control"
                      value={form.varian}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-md-4">
                    <label>Ukuran</label>
                    <input
                      name="ukuran"
                      className="form-control"
                      value={form.ukuran}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-12">
                    <label>Deskripsi</label>
                    <textarea
                      name="deskripsi"
                      rows={4}
                      className="form-control"
                      value={form.deskripsi}
                      onChange={handleChange}
                      required
                    />
                  </div>

                </div>

              </div>
            </div>

          </div>

          {/* FOTO */}
          <div className="col-md-4">

            <div className="card mb-3">

              <div className="card-header bg-white">
                <b>Foto Produk</b>
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
                  accept="image/*"
                  className="form-control"
                  onChange={handleFoto}
                />

                <small className="text-muted">
                  Maks 2MB
                </small>

              </div>

            </div>

            {/* BUTTON */}
            <div className="card mb-3">

              <div className="card-body d-grid gap-2">

                <button
                  className="btn btn-primary"
                  disabled={submitLoading}
                >
                  {submitLoading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2"></span>
                      Memproses...
                    </>
                  ) : "Update Produk"}
                </button>

                <button
                  type="button"
                  className="btn btn-light border"
                  onClick={() => router.push("/ikm/produk")}
                >
                  Kembali
                </button>

              </div>

            </div>

            {/* DANGER ZONE */}
            <div className="card">

              <div className="card-body d-flex justify-content-between align-items-center">

                <b>Danger Zone</b>

                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={handleDelete}
                >
                  Hapus Produk
                </button>

              </div>

            </div>

          </div>

        </div>

      </form>

    </div>
  )
}