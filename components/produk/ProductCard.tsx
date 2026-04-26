"use client"

import { Product } from "@/types/product"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { addToKeranjang } from "@/services/pembeliService"
import { useState } from "react"
import { FaShoppingCart } from "react-icons/fa"
import { toast } from "react-toastify"
import { useCartStore } from "@/stores/cartStore"
import Image from "next/image";

export default function ProductCard({ product }: { product: Product }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const { fetchCart } = useCartStore()

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault()

    if (!product.stok || product.stok === 0) {
      toast.warning("Stok produk habis")
      return
    }

    if (loading) return

    setLoading(true)

    try {
      await addToKeranjang(product.id)
      await fetchCart()
      toast.success("Produk berhasil ditambahkan ke keranjang")
    } catch (error: any) {

      if (error.message.includes("Keranjang hanya boleh berisi produk dari 1 IKM")) {
        toast.warning("Keranjang hanya bisa berisi produk dari 1 toko")
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

  return (
    // ✅ SEMANTIC ARTICLE
    <article>
      <Link
        href={`/produk-ikm/${product.slug}`}
        title={`Lihat detail ${product.nama_produk}`} // ✅ SEO
        className="card border position-relative text-dark shadow-sm h-100 text-decoration-none"
        style={{
          transition: "all 0.2s ease-in-out",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.border = "1px solid #0d6efd"
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.border = ""
        }}
      >
        {/* Badge */}
        <span
          className="position-absolute bg-primary text-white rounded-pill px-2 py-1 small"
          style={{ top: 10, right: 10 }}
        >
          {product.ikm?.kategori?.nama_kategori}
        </span>

        <div className="card-body p-2 d-flex flex-column">

          {/* Gambar */}
          <Image
          src={
            product.foto
              ? `${process.env.NEXT_PUBLIC_STORAGE_URL}/${product.foto}`
              : "/no-image.webp"
          }
          alt={`Produk ${product.nama_produk} dari ${product.ikm?.nama_usaha}`}
          width={300}
          height={300}
          sizes="(max-width: 768px) 50vw, 220px"
          className="rounded mb-2 w-100"
          style={{
            aspectRatio: "1/1",
            objectFit: "cover",
          }}
        />

          {/* Info */}
          <div className="grow">

            {/* ✅ HEADING SEO */}
            <h3 className="fw-semibold mb-1 text-truncate" style={{ fontSize: "16px" }}>
              {product.nama_produk}
            </h3>

            {/* ✅ SEMANTIC HARGA */}
            <p className="text-primary fw-bold mb-1">
              <strong>Rp {product.harga.toLocaleString()}</strong>
            </p>

            <p className="text-secondary small mb-2 text-truncate">
              {product.ikm?.nama_usaha}
            </p>

            {/* Stok */}
            <p
              className={`small mb-2 ${
                !product.stok || product.stok === 0
                  ? "text-danger"
                  : "text-muted"
              }`}
            >
              {!product.stok || product.stok === 0
                ? "Stok habis"
                : `Stok: ${product.stok}`}
            </p>
          </div>

          {/* Button Cart */}
          <button
            onClick={handleAddToCart}
            aria-label={`Tambah ${product.nama_produk} ke keranjang`} // ✅ SEO + aksesibilitas
            disabled={!product.stok || product.stok === 0}
            className={`btn position-absolute d-flex align-items-center justify-content-center ${
              !product.stok || product.stok === 0
                ? "btn-secondary"
                : "btn-primary"
            }`}
            style={{
              bottom: 10,
              right: 10,
              width: 40,
              height: 40,
              borderRadius: "50%",
              padding: 0,
              cursor: !product.stok || product.stok === 0 ? "not-allowed" : "pointer",
              opacity: !product.stok || product.stok === 0 ? 0.7 : 1,
            }}
          >
            {loading ? (
              <span className="spinner-border spinner-border-sm"></span>
            ) : (
              <FaShoppingCart size={16} />
            )}
          </button>

        </div>
      </Link>
    </article>
  )
}