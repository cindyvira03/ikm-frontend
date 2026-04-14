import Link from "next/link"
import { getOutlet } from "@/services/outletService"
import { Outlet } from "@/types/outlet"
import { generateSeoMetadata } from "@/lib/seo"
import { getSeo } from "@/services/seoService"
import Image from "next/image";

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
            Daftar Outlet IKM
          </li>
        </ol>
      </nav>

      <h1 className="text-dark fw-semibold mb-4 fs-1">
        Daftar Outlet IKM
      </h1>

      {outlet.length > 0 ? (
        <div className="row row-cols-1 row-cols-md-3 row-cols-lg-3 g-3">
          {outlet.map((item: Outlet) => (
            <div className="col" key={item.id}>
              <div className="card border position-relative h-100">
                {/* Badge kategori */}
                <span
                  style={{ top: 20, right: 20 }}
                  className="position-absolute bg-primary text-white rounded-pill px-2 py-1 small"
                >
                  {item.profilIkm?.kategori?.nama_kategori || "-"}
                </span>

                <div className="card-body p-2">
                  {/* Gambar outlet */}
                  <Image
                  src={
                    item.foto_lokasi_tampak_depan
                      ? `${process.env.NEXT_PUBLIC_STORAGE_URL}/${item.foto_lokasi_tampak_depan}`
                      : "/no-image.webp"
                  }
                  alt={item.profilIkm?.nama_usaha || "Outlet IKM"}
                  width={400}
                  height={240}
                  sizes="(max-width: 768px) 100vw, 400px"
                  className="img-thumbnail mb-3 rounded-3 w-100"
                  style={{
                    height: "240px",
                    objectFit: "cover",
                  }}
                  unoptimized
                />

                  <div className="px-2 pb-2">
                    <p className="fw-semibold mb-0">
                      {item.alamat || "-"}
                    </p>
                    <p className="text-secondary small mb-0">
                      {item.profilIkm?.nama_usaha || "-"}
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
    </div>
  )
}