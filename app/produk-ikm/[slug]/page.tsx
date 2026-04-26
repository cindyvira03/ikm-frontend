"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { getProductBySlug } from "@/services/productService"
import { addToKeranjang } from "@/services/pembeliService"
import { useCartStore } from "@/stores/cartStore"
import { toast } from "react-toastify"
import Image from "next/image";

export default function ProdukDetailPage() {
  const params = useParams()
  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug
  const router = useRouter()

  const [produk, setProduk] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const { fetchCart } = useCartStore()

  // =========================
  // FETCH DATA
  // =========================
  useEffect(() => {
  const fetchData = async () => {
    try {
      const res = await getProductBySlug(slug as string)
      setProduk(res.produk)
    } catch (err) {
      toast.error("Produk tidak ditemukan")
      router.push("/produk-ikm")
    }
  }

  if (slug) fetchData()
}, [slug])

  // =========================
  // HANDLE ADD TO CART
  // =========================
  const handleAddToCart = async () => {
    if (!produk?.stok || produk.stok === 0) {
      toast.warning("Stok produk habis")
      return
    }

    if (loading) return

    setLoading(true)

    try {
      await addToKeranjang(produk.id)
      await fetchCart()

      toast.success("Produk berhasil ditambahkan ke keranjang")
    } catch (error: any) {

      if (error.message?.includes("1 IKM")) {
        toast.warning("Keranjang hanya bisa dari 1 toko")
        return
      }

      if (error.message === "NO_TOKEN") {
        toast.info("Silakan login terlebih dahulu")
        router.push("/login")
        return
      }

      if (error.message === "FORBIDDEN") {
        toast.error("Session habis, silakan login ulang")
        router.push("/login")
        return
      }

      toast.error("Gagal menambahkan ke keranjang")
    } finally {
      setLoading(false)
    }
  }

  // =========================
  // LOADING STATE
  // =========================
  if (!produk) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "60vh" }}
      >
        <div className="text-center">
          <div className="spinner-border text-primary"></div>
          <div className="mt-2">Memuat detail produk...</div>
        </div>
      </div>
    )
  }

  const phone = produk?.ikm?.no_telp
  ? produk.ikm.no_telp.replace(/^0/, "62")
  : null

  return (
    <div className="container py-4">

      {/* Breadcrumb */}
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item fs-5">
            <Link href="/" className="text-decoration-none">Home</Link>
          </li>
          <li className="breadcrumb-item fs-5">
            <Link href="/produk-ikm" className="text-decoration-none">Daftar Produk IKM</Link>
          </li>
          <li className="breadcrumb-item active fs-5">
            {produk.nama_produk}
          </li>
        </ol>
      </nav>

      <div className="row g-3 mt-2 mt-md-5">

        {/* Gambar */}
        <div className="col-md-4">
          <Image
          src={
            produk.foto
              ? `${process.env.NEXT_PUBLIC_STORAGE_URL}/${produk.foto}`
              : "/no-image.webp"
          }
          alt={`Produk ${produk.nama_produk}`}
          width={300}
          height={300}
          sizes="(max-width: 768px) 100vw, 500px"
          className="img-thumbnail rounded-3 w-100"
          style={{
            height: "300px",
            objectFit: "cover",
          }}
          
        />
        </div>

        {/* Detail */}
        <div className="col-md-8">

          {/* Badge */}
          <span className="bg-primary text-white rounded-pill px-2 py-1 fs-8">
            {produk.ikm?.kategori?.nama_kategori}
          </span>

          <h2 className="fw-bold mt-3">
            {produk.nama_produk}
          </h2>

          <p className="text-primary fw-bold mb-0 fs-5">
            Rp. {produk.harga.toLocaleString()}
          </p>

          {/* Nama usaha */}
          <Link
            href={`/profil-ikm/${produk.ikm?.slug}`}
            className="text-secondary fs-7 text-decoration-none"
          >
            {produk.ikm?.nama_usaha}
          </Link>

          {/* Info */}
          <div className="mt-3 fs-7 text-secondary">

            {produk.jenis_produk && (
              <p className="mb-0">
                Jenis Produk: {produk.jenis_produk}
              </p>
            )}

            {produk.varian && (
              <p className="mb-0">
                Varian: {produk.varian}
              </p>
            )}

            {produk.ukuran && (
              <p>
                Ukuran: {produk.ukuran}
              </p>
            )}

            <p className="mb-0" style={{ whiteSpace: "pre-line" }}>
              {produk.deskripsi}
            </p>
          </div>

          {/* BUTTON */}
          <div className="d-flex gap-2 mt-3">

            {/* Chat Seller */}
            {phone && (
              <a
                href={`https://wa.me/${phone}`}
                target="_blank"
                className="btn btn-success px-4"
              >
                <i className="bi bi-whatsapp me-2"></i>
                Chat Seller
              </a>
            )}

            {/* Add to Cart */}
            <button
              onClick={handleAddToCart}
              disabled={!produk.stok || produk.stok === 0 || loading}
              className={`btn px-4 ${
                !produk.stok || produk.stok === 0
                  ? "btn-secondary"
                  : "btn-primary"
              }`}
              style={{
                cursor: !produk.stok || produk.stok === 0 ? "not-allowed" : "pointer",
                opacity: !produk.stok || produk.stok === 0 ? 0.7 : 1,
              }}
            >
              {loading ? "Menambahkan..." : (
                <>
                  <i className="bi bi-cart me-2"></i>
                  Keranjang
                </>
              )}
            </button>

          </div>

        </div>
      </div>
    </div>
  )
}