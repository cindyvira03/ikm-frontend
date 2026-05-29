import Link from "next/link"
import { getProducts } from "@/services/productService"
import ProductCard from "@/components/produk/ProductCard"
import { generateSeoMetadata } from "@/lib/seo"
import { getSeo } from "@/services/seoService"

export const dynamic = "force-dynamic"

// ✅ SSR SEO
export async function generateMetadata() {
  return await generateSeoMetadata("produk_ikm")
}


export default async function ProdukIKMPage() {
    const [productsData, seoData] = await Promise.all([
    getProducts(),
    getSeo("produk_ikm")
  ])

  const kategori = productsData?.kategori || []
  const produk = productsData?.produk || []
  const seo = seoData

  const schema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Daftar Produk IKM Probolinggo",
  description:
    "Kumpulan produk IKM Kota Probolinggo seperti batik, kerajinan, dan kuliner.",
  url: "https://jelajah.ikmprobolinggo.com/produk-ikm",
  mainEntity: {
    "@type": "ItemList",
    itemListElement: produk.map((item: any, index: number) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.nama_produk,
      url: `https://jelajah.ikmprobolinggo.com/produk-ikm/${item.slug}`
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

      {/* ✅ H1 dari SEO */}
      <h1 className="text-dark fw-semibold mb-4 fs-1">
        {/* {seo?.heading_h1 || "Daftar Produk IKM"} */}
        Daftar Produk IKM
      </h1>

      {/* SEO CONTENT */}
      <section className="mb-4">
        <div
          className="p-4 rounded-4"
          style={{
            background: "linear-gradient(135deg, #f8f9ff, #eef3ff)",
            border: "1px solid #e0e7ff",
          }}
        >
          {/* HEADER INFO */}
          <div className="d-flex align-items-center gap-2 mb-2">
            <span style={{ fontSize: "18px" }}>ℹ️</span>
            <span className="fw-semibold text-dark">
              Informasi Produk IKM Kota Probolinggo
            </span>
          </div>

          {/* CONTENT */}
          <p className="text-secondary mb-2">
            Jelajahi berbagai produk IKM (Industri Kecil dan Menengah) di Kota Probolinggo,
            mulai dari kerajinan tangan, kuliner, hingga batik khas Probolinggo.
          </p>

          <p className="text-secondary mb-0">
            Salah satu produk unggulan adalah <strong>batik Probolinggo </strong>
            dengan berbagai <strong>motif khas Probolinggo</strong> yang bernilai budaya.
          </p>
          <p
            className="mt-3 d-inline-flex align-items-center gap-2 fw-semibold"
            style={{
              color: "#2563eb",
              background: "#eff6ff",
              padding: "8px 14px",
              borderRadius: "999px",
              fontSize: "14px",
              width: "fit-content",
            }}
          >
            🚀 Dukung produk lokal sekarang
          </p>
          
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
              title={`Kategori ${kat.nama_kategori}`} // ✅ SEO kecil
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
                // 👇 TAMBAHKAN STYLE MODERN INI UNTUK MENGHEMAT MEMORI HP PENGUNJUNG 👇
                style={{ 
                  contentVisibility: "auto", 
                  containIntrinsicSize: "0 380px" // Estimasi tinggi rata-rata kartu produk Anda
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


    </div>
  </>
  )
}