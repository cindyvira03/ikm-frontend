import Link from "next/link"
import { getProfilIkm } from "@/services/profilIkmService"
import { ProfilIkm } from "@/types/profilIkm"
import { generateSeoMetadata } from "@/lib/seo"
import { getSeo } from "@/services/seoService"
import Image from "next/image";

export const dynamic = "force-dynamic"

// =========================
// SEO menggunakan modul lib/seo
// =========================
export async function generateMetadata() {
  return await generateSeoMetadata("profil_ikm")
}

// =========================
// HALAMAN
// =========================
export default async function ProfilIkmPage() {
  const { ikm }: { ikm: ProfilIkm[] } = await getProfilIkm()
  const seo = await getSeo("profil_ikm")

  return (
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
            Daftar Profil IKM
          </li>
        </ol>
      </nav>

      <h2 className="text-dark fw-semibold mb-4 fs-1">
        Daftar Profil IKM
      </h2>

      {/* SEO CONTENT PROFIL IKM */}
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
            <span style={{ fontSize: "18px" }}>🏪</span>
            <span className="fw-semibold text-dark">
              Profil IKM Kota Probolinggo
            </span>
          </div>

          {/* DESKRIPSI */}
          <p className="text-secondary mb-2">
            Halaman ini menampilkan profil usaha IKM (Industri Kecil dan Menengah) di Kota Probolinggo.
            Anda dapat menemukan informasi lengkap mengenai pelaku usaha lokal,
            mulai dari produk yang ditawarkan, kategori usaha, hingga kontak yang tersedia.
          </p>

          <p className="text-secondary mb-0">
            IKM di Probolinggo dikenal memiliki beragam produk unggulan seperti
            <strong> batik khas Probolinggo</strong>, kerajinan tangan, hingga produk kuliner lokal
            yang mencerminkan kekayaan budaya daerah.
          </p>

          {/* CTA */}
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
            🔎 Jelajahi usaha lokal & dukung IKM sekarang
          </p>
        </div>
      </section>

      {ikm.length > 0 ? (
        <div className="row row-cols-1 row-cols-md-3 row-cols-lg-4 g-3">
          {ikm.map((item: ProfilIkm) => (
            <div className="col" key={item.id}>
              <Link
                href={`/profil-ikm/${item.slug}`}
                className="card border position-relative text-decoration-none text-dark h-100"
              >

                {/* Badge kategori */}
                <span
                  style={{ top: 20, right: 20 }}
                  className="position-absolute bg-primary text-white rounded-pill px-2 py-1 small"
                >
                  {item.kategori?.nama_kategori || "-"}
                </span>

                <div className="card-body p-2">
                  <Image
                  src={
                    item.gambar
                      ? `${process.env.NEXT_PUBLIC_STORAGE_URL}/ikm/${item.gambar}`
                      : "/no-image.webp"
                  }
                  alt={item.nama_usaha || "Profil IKM"}
                  width={400}
                  height={240}
                  sizes="(max-width: 768px) 100vw, 400px"
                  className="img-thumbnail mb-3 rounded-3 w-100"
                  style={{
                    height: "240px",
                    objectFit: "cover",
                  }}
                  />

                  <div className="px-2 pb-2">
                    <p className="fw-semibold mb-0">
                      {item.nama_usaha || "-"}
                    </p>
                  </div>
                </div>

              </Link>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-5">
          <h5 className="text-muted mb-0">
            Belum ada data produk
          </h5>
          <p className="text-muted">
            Belum ada produk yang ditambahkan.
          </p>
        </div>
      )}
    </div>
  )
}