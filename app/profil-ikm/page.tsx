import Link from "next/link"
import { getProfilIkm } from "@/services/profilIkmService"
import { ProfilIkm } from "@/types/profilIkm"
import { generateSeoMetadata } from "@/lib/seo"
import { getSeo } from "@/services/seoService"

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
    <div className="container-fluid px-5 py-4">

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

      {ikm.length > 0 ? (
        <div className="row row-cols-1 row-cols-md-3 row-cols-lg-4 g-3">
          {ikm.map((item: ProfilIkm) => (
            <div className="col" key={item.id}>
              <Link
                href={`/profil-ikm/${item.id}`}
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
                  <img
                    src={
                      item.gambar
                        ? `${process.env.NEXT_PUBLIC_STORAGE_URL}/ikm/${item.gambar}`
                        : "/no-image.jpg"
                    }
                    alt={item.nama_usaha || "Profil IKM"}
                    className="img-thumbnail mb-3 rounded-3 w-100"
                    style={{ height: "240px", objectFit: "cover" }}
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