"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { getProdukById } from "@/services/ikmService"
import { Product } from "@/types/product"

export default function ProdukDetailPage() {
  const { id } = useParams() // ambil ID dari URL
  const router = useRouter()
  const [produk, setProduk] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) return

    const fetchProduk = async () => {
      setLoading(true)
      try {
        const data = await getProdukById(Number(id))
        setProduk(data)
      } catch (err: any) {
        setError(err.message || "Gagal memuat produk")
      }
      setLoading(false)
    }

    fetchProduk()
  }, [id])

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary"></div>
        <div className="mt-2">Memuat detail produk...</div>
      </div>
    )
  }

  if (error || !produk) {
    return (
      <div className="text-center py-5 text-danger">
        <h5>{error || "Produk tidak ditemukan"}</h5>
      </div>
    )
  }

  return (
    <div className="container-fluid py-3">
      <div className="card">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h4 className="mb-0">Detail Produk</h4>
          <div className="d-flex gap-2">
            <button
              className="btn btn-warning"
              onClick={() => router.push(`/ikm/produk/edit/${produk.id}`)}
            >
              <i className="bi bi-pencil"></i> Edit
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => router.push("/ikm/produk")}
            >
              <i className="bi bi-arrow-left"></i> Kembali
            </button>
          </div>
        </div>

        <div className="card-body">
          <div className="row">
            <div className="col-md-4">
              <img
                src={
                  produk.foto
                    ? `${process.env.NEXT_PUBLIC_STORAGE_URL}/${produk.foto}`
                    : "/no-image.png"
                }
                alt={produk.nama_produk}
                className="img-fluid rounded"
              />
            </div>

            <div className="col-md-8">
              <table className="table table-borderless">
                <tbody>
                  <tr>
                    <th style={{ width: "200px" }}>Nama Produk</th>
                    <td>: {produk.nama_produk}</td>
                  </tr>
                  <tr>
                    <th>Jenis Produk</th>
                    <td>: {produk.jenis_produk}</td>
                  </tr>
                  <tr>
                    <th>Harga</th>
                    <td>: Rp {produk.harga.toLocaleString()}</td>
                  </tr>
                  <tr>
                    <th>Stok</th>
                    <td>: {produk.stok?? "habis"}</td>
                  </tr>
                  <tr>
                    <th>Berat</th>
                    <td>: {produk.berat ?? "-"} gr</td>
                  </tr>
                  <tr>
                    <th>Varian</th>
                    <td>: {produk.varian ?? "-"}</td>
                  </tr>
                  <tr>
                    <th>Ukuran</th>
                    <td>: {produk.ukuran ?? "-"}</td>
                  </tr>
                  <tr>
                    <th>IKM</th>
                    <td>: {produk.ikm?.nama_usaha ?? "N/A"}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="row mt-4">
            <div className="col-12">
              <h5>Deskripsi</h5>
              <div className="border rounded p-3 bg-light">
                {produk.deskripsi}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}