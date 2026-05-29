
import Image from "next/image"
import Link from "next/link"

export default function IkmSlider({ ikm = [] }: any) {
  // ✅ batasi tampil (biar tetap kayak slider awal 3 item)
  const visibleIkm = ikm.slice(0, 3)

  return (
    <div className="position-relative">
      <h2 className="text-center fw-semibold mb-4">
        IKM (Industri Kecil dan Menengah) yang Terdaftar
      </h2>

      <p className="text-center text-muted mb-4">
        Berikut daftar pelaku industri kecil dan menengah di Kota Probolinggo 
        yang menghadirkan berbagai produk unggulan, termasuk batik khas Probolinggo.
      </p>

      {/* LIST (TETAP SAMA PERSIS) */}
      <div
        className={`row g-4 ${
          visibleIkm.length < 3 ? "justify-content-center" : ""
        }`}
      >
        {visibleIkm.map((item: any) => (
          <div className="col-md-4" key={item.id}>
            <Link 
              href={`/profil-ikm/${item.slug}`} 
              className="text-decoration-none text-dark"
            >
              <article
                className="card shadow-sm h-100 home-product-card border-primary"
                style={{ borderRadius: "14px" }}
              >
                <div className="card-body p-3 d-flex align-items-center gap-3">

                  {/* LOGO */}
                  <div
                    className="bg-light rounded-circle overflow-hidden d-flex justify-content-center align-items-center"
                    style={{ width: 60, height: 60, flexShrink: 0, position: "relative" }}
                  >
                    <Image
                      src={
                        item.gambar
                          ? `${process.env.NEXT_PUBLIC_STORAGE_URL}/ikm/${item.gambar}`
                          : "/no-image.webp"
                      }
                      alt={`Logo ${item.nama_usaha} - Batik Khas Probolinggo`}
                      fill
                      sizes="60px"
                      style={{ objectFit: "contain" }}
                    />
                  </div>

                  {/* INFO */}
                  <div className="text-start">
                    <h3 className="fw-semibold mb-1" style={{ fontSize: "16px" }}>
                      {item.nama_usaha}
                    </h3>

                    <p
                      className="text-muted small mb-0"
                      style={{
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden"
                      }}
                    >
                      {item.deskripsi_singkat || "IKM Kota Probolinggo"}
                    </p>

                    <div className="text-end">
                      <span
                        className="text-primary"
                        style={{
                          fontSize: "12px",
                          fontWeight: 500
                        }}
                      >
                        selengkapnya →
                      </span>
                    </div>
                  </div>

                </div>
              </article>
            </Link>
          </div>
        ))}
      </div>

      {/* ✅ TOMBOL LIHAT SEMUA (BARU) */}
      <div className="d-flex justify-content-end mt-4">
        <Link
          href="/profil-ikm"
          className="btn btn-primary d-flex align-items-center gap-2 px-4 py-2"
          style={{ borderRadius: "10px" }}
        >
          Lihat IKM Lainnya
          <span style={{ fontSize: "18px" }}>→</span>
        </Link>
      </div>
    </div>
  )
}