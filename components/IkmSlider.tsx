"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"

// 🔥 TARUH DI SINI (di atas component)
// function truncate(text: string, max = 80) {
//   if (!text) return ""
//   return text.length > max ? text.slice(0, max) + "..." : text
// }

export default function IkmSlider({ ikm }: any) {
  const [startIndex, setStartIndex] = useState(0)

  const itemsPerPage = 3
  const total = ikm.length

  const next = () => {
    if (startIndex + itemsPerPage < total) {
      setStartIndex(startIndex + itemsPerPage)
    }
  }

  const prev = () => {
    if (startIndex - itemsPerPage >= 0) {
      setStartIndex(startIndex - itemsPerPage)
    }
  }

  const visibleIkm = ikm.slice(startIndex, startIndex + itemsPerPage)

  return (
    <div className="position-relative">
      <h2 className="text-center fw-semibold mb-4">IKM (Industri Kecil dan Menengah) yang Terdaftar</h2>
      <p className="text-center text-muted mb-4">
        Berikut daftar pelaku industri kecil dan menengah di Kota Probolinggo 
        yang menghadirkan berbagai produk unggulan, termasuk batik khas Probolinggo.
      </p>
      {/* LEFT */}
      {startIndex > 0 && (
        <button
          onClick={prev}
          aria-label="IKM sebelumnya"
          className="btn btn-light rounded-circle shadow"
          style={{
            position: "absolute",
            left: "-20px",
            top: "50%",
            transform: "translateY(-50%)",
            width: "40px",
            height: "40px",
            zIndex: 2
          }}
        >
          ‹
        </button>
      )}

      {/* RIGHT */}
      {startIndex + itemsPerPage < total && (
        <button
          onClick={next}
          aria-label="IKM berikutnya"
          className="btn btn-light rounded-circle shadow"
          style={{
            position: "absolute",
            right: "-20px",
            top: "50%",
            transform: "translateY(-50%)",
            width: "40px",
            height: "40px",
            zIndex: 2
          }}
        >
          ›
        </button>
      )}

      {/* LIST */}
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
            {/* ✅ SEMANTIC CONTENT */}
            <article
              className="card shadow-sm h-100 home-product-card border-primary"
              style={{ borderRadius: "14px" }}
            >
              <div className="card-body p-3 d-flex align-items-center gap-3">

                {/* LOGO IKM */}
                <div
                  className="bg-light rounded-circle overflow-hidden d-flex justify-content-center align-items-center"
                  style={{ width: 60, height: 60, flexShrink: 0 }}
                >
                  <Image
                    src={
                      item.gambar
                        ? `${process.env.NEXT_PUBLIC_STORAGE_URL}/ikm/${item.gambar}`
                        : "/no-image.webp"
                    }
                    alt={`Logo ${item.nama_usaha} - Batik Khas Probolinggo`} // ✅ SEO ALT
                    width={60}
                    height={60}
                    sizes="60px"
                    style={{
                      objectFit: "contain"
                    }}
                    
                  />
                </div>

                {/* INFO */}
                <div className="text-start">

                  {/* ✅ HEADING SEO */}
                  <h3 className="fw-semibold mb-1" style={{ fontSize: "16px" }}>
                    {item.nama_usaha}
                  </h3>

                  <p className="text-muted small mb-0"
                  style={{
                    display: "-webkit-box",
                    WebkitLineClamp: 2, // maksimal 2 baris
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden"
                  }}>
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

    </div>
  )
}