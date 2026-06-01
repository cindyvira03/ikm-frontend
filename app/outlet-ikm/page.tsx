import Link from "next/link"
import { getOutlet } from "@/services/outletService"
import { Outlet } from "@/types/outlet"
import { generateSeoMetadata } from "@/lib/seo"
import { getSeo } from "@/services/seoService"
import Image from "next/image";
import Footer from "@/components/layout/Footer"

export const dynamic = "force-dynamic"
// =========================
// SEO menggunakan modul lib/seo
// =========================
export async function generateMetadata() {
  return await generateSeoMetadata("outlet_ikm")
}

// =========================
// HALAMAN
// =========================
export default async function OutletIKMPage() {
  const { outlet }: { outlet: Outlet[] } = await getOutlet()
  const seo = await getSeo("outlet_ikm")

  const schema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Daftar Outlet IKM Probolinggo",
  description:
    "Daftar lokasi outlet IKM di Kota Probolinggo yang menyediakan berbagai produk lokal.",
  url: "https://jelajah.ikmprobolinggo.com/outlet-ikm",
  mainEntity: {
    "@type": "ItemList",
    itemListElement: outlet.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.profil_ikm?.nama_usaha || "Outlet IKM",
      url: item.lokasi_googlemap || `https://jelajah.ikmprobolinggo.com/outlet-ikm`
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
      {/* Breadcrumb */}
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item fs-5">
            <Link href="/" className="text-decoration-none">
              Home
            </Link>
          </li>
          <li className="breadcrumb-item active fs-5">
            Daftar Outlet IKM
          </li>
        </ol>
      </nav>

      <h1 className="text-dark fw-semibold mb-4 fs-1">
        Daftar Outlet IKM
      </h1>

      <section className="mb-4">
        <div
          className="p-4 rounded-4"
          style={{
            background: "linear-gradient(135deg, #f8f9ff, #eef3ff)",
            border: "1px solid #e0e7ff",
          }}
        >
          {/* HEADER */}
          <div className="d-flex align-items-center gap-2 mb-2">
            <span style={{ fontSize: "18px" }}>📍</span>
            <span className="fw-semibold text-dark fs-5">
              Daftar Lokasi Outlet Resmi IKM Kota Probolinggo
            </span>
          </div>

          {/* CONTENT */}
          <p className="text-secondary mb-2">
            Temukan peta lokasi dan alamat lengkap berbagai 
            galeri fisik Industri Kecil dan Menengah (IKM) yang tersebar di wilayah Kota Probolinggo. Halaman ini 
            menyajikan panduan rute resmi untuk mempermudah Anda menemukan sentra kerajinan tangan, produk fashion, 
            hingga <strong>batik khas Probolinggo</strong> autentik langsung dari rumah produksi.
          </p>

          <p className="text-secondary mb-0">
            Dengan mengunjungi langsung rumah produksi atau <strong>outlet ikm probolinggo</strong>, Anda dapat melihat 
            proses pembuatan kain tulis secara tradisional, berinteraksi langsung dengan para pelaku usaha lokal, 
            serta mendapatkan jaminan harga terbaik tangan pertama yang mendukung penuh roda ekonomi industri kecil dan menengah daerah.
          </p>

        </div>
      </section>


      {outlet.length > 0 ? (
        <div className="row row-cols-1 row-cols-md-3 row-cols-lg-3 g-3">
          {outlet.map((item: Outlet) => (
            <div className="col" key={item.id}>
              <div className="card border position-relative h-100">
                {/* Badge kategori */}
                <span
                  style={{ top: 15, right: 15, zIndex: 10 }}
                  className="position-absolute bg-primary text-white rounded-pill px-2 py-1 small"
                >
                  {item.profil_ikm?.kategori?.nama_kategori || "-"}
                </span>

                <div className="card-body p-2">
                  {/* Gambar outlet */}
                  <div style={{ position: "relative", aspectRatio: "4/3" }}>
                    <Image
                    src={
                      item.foto_lokasi_tampak_depan
                        ? `${process.env.NEXT_PUBLIC_STORAGE_URL}/${item.foto_lokasi_tampak_depan}`
                        : "/no-image.webp"
                    }
                    alt={item.profil_ikm?.nama_usaha || "Outlet IKM"}
                    quality={70}
                    fill
                    sizes="(max-width: 768px) 100vw, 400px"
                    className="img-thumbnail mb-3 rounded-3"
                    style={{
                      objectFit: "cover",
                    }}
                    
                  />
                </div>

                  <div className="px-2 pb-2">
                    <p className="fw-semibold mb-0">
                      {item.alamat || "-"}
                    </p>
                    <p className="text-secondary small mb-0">
                      {item.profil_ikm?.nama_usaha || "-"}
                    </p>

                    {item.lokasi_googlemap && (
                      <a
                        href={item.lokasi_googlemap}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-success mt-3 w-100 rounded-3"
                      >
                        Google Maps
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-5">
          <h5 className="text-muted mb-0">
            Belum ada data outlet
          </h5>
          <p className="text-muted">
            Belum ada outlet yang ditambahkan.
          </p>
        </div>
      )}
    <Footer />
    </div>
    </>
  )
}