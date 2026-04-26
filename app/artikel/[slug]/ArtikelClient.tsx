"use client"

import Image from "next/image"
import Link from "next/link"

// 👉 type sederhana (boleh pakai dari types kamu juga)
type Artikel = {
  id: number
  judul: string
  slug: string
  isi: string
  gambar?: string
  sumber?: string
  created_at?: string
}

type Props = {
  artikel: Artikel
  list: Artikel[]
}

export default function ArtikelClient({ artikel, list }: Props) {

  if (!artikel) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "60vh" }}>
        <div className="text-center">
          <div className="mt-2">Artikel tidak ditemukan</div>
        </div>
      </div>
    )
  }

  // 🔥 FORMAT PARAGRAF (tetap sama)
  const formatIsi = (text: string) => {
    return text
      ?.split("\n")
      .map((line, i) => <p key={i} className="mb-3">{line}</p>)
  }

  const cleanHtml = (html: string) => {
  return html
    .replace(/&nbsp;/g, " ") // 🔥 ini kunci utama
    .replace(/\s+/g, " ")   // rapihin spasi
}

  return (
    <main className="py-5 bg-light">
      <div className="container">
        <div className="row g-4">

          {/* ================= LEFT CONTENT ================= */}
          <div className="col-lg-8">

            <h1 className="fw-bold mb-3">{artikel.judul}</h1>

            <div className="text-muted small mb-3">
              📅 {new Date(artikel.created_at || "").toLocaleDateString("id-ID")}
              {artikel.sumber && ` • ${artikel.sumber}`}
            </div>

            <Image
              src={
                artikel.gambar
                  ? `${process.env.NEXT_PUBLIC_STORAGE_URL}/${artikel.gambar}`
                  : "/no-image.webp"
              }
              alt={artikel.judul}
              width={900}
              height={500}
              sizes="(max-width: 768px) 100vw, 900px"
              className="rounded shadow-sm mb-4 w-100 h-auto"
              style={{
                objectFit: "cover",
              }}
              
            />

            {/* ISI */}
            <div
              className="fs-6 text-dark lh-lg"
              style={{
                maxWidth: "100%",
                overflow: "hidden"
              }}
            >
              <div
                style={{
                  wordBreak: "normal",
                  overflowWrap: "break-word"
                }}
                dangerouslySetInnerHTML={{ __html: cleanHtml(artikel.isi) }}
              />
            </div>

          </div>

          {/* ================= RIGHT SIDEBAR ================= */}
          <div className="col-lg-4">

            <div className="position-sticky" style={{ top: "20px" }}>

              <div className="card border-0 shadow-sm p-3">

                <h5 className="fw-semibold mb-3">
                  Artikel Lainnya
                </h5>

                <div className="d-flex flex-column gap-3">

                  {list.map((item) => (
                    <Link
                      href={`/artikel/${item.slug}`}
                      key={item.id}
                      className="text-decoration-none"
                    >

                      <div
                        className="card border-0 shadow-sm overflow-hidden artikel-mini-card"
                        style={{ borderRadius: "10px" }}
                      >

                        <Image
                          src={
                            item.gambar
                              ? `${process.env.NEXT_PUBLIC_STORAGE_URL}/${item.gambar}`
                              : "/no-image.jpg"
                          }
                          alt={item.judul}
                          width={400}
                          height={200}
                          className="w-100"
                          style={{
                            height: "120px",
                            objectFit: "cover"
                          }}
                          
                        />

                        <div className="p-2">

                          <h6
                            className="fw-semibold text-dark mb-1"
                            style={{
                              fontSize: "13px",
                              lineHeight: "1.3"
                            }}
                          >
                            {item.judul.length > 55
                              ? item.judul.slice(0, 55) + "..."
                              : item.judul}
                          </h6>

                          <small className="text-muted">
                            📅 {new Date(item.created_at || "").toLocaleDateString("id-ID")}
                          </small>

                        </div>

                      </div>
                    </Link>
                  ))}

                </div>

              </div>

            </div>

          </div>

        </div>
      </div>
    </main>
  )
}