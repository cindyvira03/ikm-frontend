import Link from "next/link"
import { getProductsByCategory } from "@/services/productService"
import ProductCard from "@/components/produk/ProductCard"
import { Metadata } from "next"
import Pagination from "@/components/Pagination"
import { Product } from "@/types/product" 
import { Kategori } from "@/types/kategori" 
import Footer from "@/components/layout/Footer"

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params // 👈 Ambil slug dari parameter URL Next.js secara langsung

  try {
    // ⚡ Cukup fetch 1 kali saja untuk menghemat performa server (TTFB turun)
    const { currentKategori } = await getProductsByCategory(slug)
    
    // Gunakan fallback nama jika data dari DB belum selesai dimuat/kosong
    const namaKategori = currentKategori?.nama_kategori || ""
    const targetSlug = currentKategori?.slug || slug // 👈 Gunakan slug dari DB, atau fallback ke parameter URL

    const title = `Daftar Produk IKM Kategori ${namaKategori}`
    const description = `Mau beli produk IKM kategori ${namaKategori} asli Probolinggo? Yuk, belanja online dengan mudah, aman, dan terpercaya langsung dari para pengrajin lokal.`
    const correctUrl = `https://jelajah.ikmprobolinggo.com/produk-ikm/kategori/${targetSlug}`

    return {
      title,
      description,
      alternates: {
        canonical: correctUrl,
      },
      openGraph: {
        title,
        description,
        url: correctUrl,
        type: "website",
      },
    }
  } catch (error) {
    console.error("Gagal memuat metadata kategori:", error)
    return { 
      title: "Daftar Produk IKM - Kota Probolinggo",
      description: "Jelajahi berbagai produk IKM unggulan Kota Probolinggo."
    }
  }
}


interface PageProps {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ page?: string }>
}

export default async function ProdukKategoriPage({
  params,
  searchParams
}: PageProps) {

  const { slug } = await params
  const resolvedSearchParams = await searchParams
  const page = Number(resolvedSearchParams?.page) || 1

  const { kategori, produk, currentKategori } =
    await getProductsByCategory(slug, page)

  const list = produk?.data || []
  const meta = produk

  return (
    <div className="container py-4">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item fs-5">
            <Link href="/" className="text-decoration-none">Home</Link>
          </li>
          <li className="breadcrumb-item active fs-5">
            Daftar Produk IKM
          </li>
        </ol>
      </nav>

      <h1 className="text-dark fw-semibold mb-4 fs-1">
        Daftar Produk IKM
      </h1>

      {/* SEO CONTENT */}
      <section className="mb-5">
          <div
            className="p-4 rounded-4"
            style={{
              background: "linear-gradient(135deg, #f8f9ff, #eef3ff)",
              border: "1px solid #e0e7ff",
            }}
          >
            <div className="d-flex align-items-center gap-2 mb-2">
              <span style={{ fontSize: "18px" }}>🛒</span>
              <span className="fw-semibold text-dark fs-5">
                E-Katalog Resmi Industri Kecil Menengah Kota Probolinggo
              </span>
            </div>

            <p className="text-secondary mb-2">
              Jelajahi pusat <strong>jual baju batik Probolinggo</strong>, produk fashion, kerajinan tangan, hingga 
              ragam kuliner khas dari para pelaku industri lokal binaan Disperinaker Kota Probolinggo. Saat ini, platform kami berfokus 
              penuh pada digitalisasi koleksi <strong>batik Probolinggo</strong> dengan 
              <strong> motif khas Probolinggo</strong> yang autentik seperti corak Manggur.
            </p>

            <p className="text-secondary mb-0">
              Gunakan fitur filter kategori untuk menemukan produk fashion batik premium siap beli. Nikmati kemudahan 
              belanja online terpercaya langsung dari tangan pertama.
            </p>

            <div
              className="mt-3 d-inline-flex align-items-center gap-2 fw-semibold text-primary"
              style={{
                background: "#eff6ff",
                padding: "8px 14px",
                borderRadius: "999px",
                fontSize: "14px",
                width: "fit-content",
              }}
            >
              ✨ Mendukung Ekonomi Lokal Melalui Digitalisasi IKM
            </div>
          </div>
        </section>

      {/* Kategori */}
      <div className="d-flex flex-wrap gap-2 mb-4">
        <Link href="/produk-ikm" className="btn btn-outline-primary border">
          Semua
        </Link>
        
        {/* PERBAIKAN: Tambahkan tipe data : Kategori pada parameter kat */}
        {kategori.map((kat: Kategori) => (
          <Link
            key={kat.id}
            href={`/produk-ikm/kategori/${kat.slug}`}
            className={`btn ${
              kat.id === currentKategori.id
                ? "btn-primary"
                : "btn-outline-primary border"
            }`}
          >
            {kat.nama_kategori}
          </Link>
        ))}
      </div>


      {/* Produk */}
      {list.length > 0 ? (
        <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 g-3">
          {/* PERBAIKAN: Tambahkan tipe data : Product pada parameter item */}
          {list.map((item: Product) => (
            <div className="col" key={item.id}>
              <ProductCard product={item} />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-5">
          <h5 className="text-muted mb-0">Belum ada data produk</h5>
          <p className="text-muted">Belum ada produk untuk kategori ini.</p>
        </div>
      )}

      <Pagination
      currentPage={meta.current_page}
      lastPage={meta.last_page}
    />
    <Footer />
    </div>
  )
}