import Link from "next/link"
import { getProducts } from "@/services/productService"
import ProductCard from "@/components/produk/ProductCard"
import { generateSeoMetadata } from "@/lib/seo"
import { getSeo } from "@/services/seoService"
import Pagination from "@/components/Pagination"
import Footer from "@/components/layout/Footer"

export const dynamic = "force-dynamic"

// ✅ SSR SEO
export async function generateMetadata() {
  return await generateSeoMetadata("produk_ikm")
}

// PERBAIKAN: Gunakan tipe data Promise untuk searchParams (Standar Next.js App Router)
interface PageProps {
  searchParams: Promise<{ page?: string }>
}

export default async function ProdukIKMPage({ searchParams }: PageProps) { 
  // PERBAIKAN: Wajib di-await agar kueri URL terbaca dengan benar saat pindah halaman
  const resolvedSearchParams = await searchParams
  const page = Number(resolvedSearchParams?.page) || 1 

  // Ambil data berdasarkan halaman yang aktif
  const [productsData, seoData] = await Promise.all([ 
    getProducts(page), 
    getSeo("produk_ikm") 
  ]) 

  const kategori = productsData?.kategori || [] 
  const produk = productsData?.produk?.data || [] 
  const meta = productsData?.produk || {} // berisi current_page dan last_page
  const seo = seoData 

  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Daftar Produk IKM Probolinggo",
    description:
      "Kumpulan produk IKM Kota Probolinggo seperti batik, kerajinan, dan kuliner.",
    url: "https://ikmprobolinggo.com/produk-ikm",
    mainEntity: {
      "@type": "ItemList",
      itemListElement: produk.map((item: any, index: number) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.nama_produk,
        url: `https://ikmprobolinggo.com/produk-ikm/${item.slug}`
      }))
    }
  };

  return (
    <>
      {/* ✅ STRUCTURED DATA */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <div className="container py-4">

        {/* BREADCRUMB */}
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

        {/* H1 */}
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

        {/* KATEGORI */}
        <section>
          <div className="d-flex flex-wrap gap-2 mb-4">
            <Link href="/produk-ikm" className="btn btn-primary">
              Semua
            </Link>

            {kategori.map((kat) => (
              <Link
                key={kat.id}
                href={`/produk-ikm/kategori/${kat.slug}`}
                className="btn btn-outline-primary border"
                title={`Kategori ${kat.nama_kategori}`}
              >
                {kat.nama_kategori}
              </Link>
            ))}
          </div>
        </section>

        {/* PRODUK */}
        <section>
          {produk.length > 0 ? (
            <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 g-3">
              {produk.map((item: any) => (
                <div 
                  className="col" 
                  key={item.id}
                  style={{ 
                    contentVisibility: "auto", 
                    containIntrinsicSize: "0 380px"
                  }}
                >
                  <ProductCard product={item}/>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-5">
              <h2 className="text-muted mb-0">Belum ada data produk</h2>
            </div>
          )}
        </section>

        {/* 🔥 PAGINATION (TAMBAHAN SAJA) */}
        <Pagination
          currentPage={meta.current_page}
          lastPage={meta.last_page}
        />

        <Footer />
      </div>
    </>
  )
}