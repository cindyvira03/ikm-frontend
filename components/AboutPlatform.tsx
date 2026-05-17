import Image from "next/image"
import Link from "next/link"

type Props = {
  image?: string
}

export default function AboutPlatform({
  image = "/ilustrasi-ikm.png",
}: Props) {
  return (
    <section className="py-5 bg-white">
      <div className="container">

        {/* HEADER */}
          <div className="text-center mb-3">

            {/* BADGE */}
            <div
              className="d-inline-block mb-2"
              style={{
                background: "#eff6ff",
                color: "#2563eb",
                padding: "6px 12px",
                borderRadius: "999px",
                fontSize: "13px",
                fontWeight: 500,
              }}
            >
              🌐 Platform IKM
            </div>

            {/* TITLE */}
            <h2 className="fw-semibold mb-1 fs-3">
              Tentang <span className="text-primary">Jelajah Probolinggo</span>
            </h2>

            {/* LINE */}
            <div
              style={{
                width: "70px",
                height: "3px",
                background: "#2563eb",
                margin: "0 auto",
                borderRadius: "10px",
              }}
            />

          </div>

        <div className="row align-items-center g-3">

          {/* KIRI - GAMBAR */}
          <div className="col-md-6 d-flex justify-content-center align-items-center" style={{
              overflow: "hidden",  
            }}>
            <Image
              src="/platform.webp"
              alt="Platform IKM Probolinggo"
              width={800}
              height={480}
              sizes="(max-width: 768px) 100vw, 400px"
              style={{
                 width: "100%",
                height: "auto", // ✅ kunci anti distorsi
                objectFit: "contain" // ✅ biar ga kepotong
          
              }}
            />
          </div>
          

          {/* KANAN - KONTEN */}
          <div className="col-md-6">

            <div className="d-flex flex-column gap-3">

              {/* ITEM 1 */}
              <div
                className="p-3 rounded-4"
                style={{
                  background: "linear-gradient(135deg, #f8f9ff, #eef3ff)",
                  border: "1px solid #e0e7ff",
                }}
              >
                <p className="mb-0 text-secondary small">
                  <strong>Jelajah Probolinggo</strong> merupakan platform digital berbasis 
                  e-katalog dan e-commerce yang dirancang untuk menampilkan berbagai produk dari 
                  <strong> IKM (Industri Kecil dan Menengah)</strong> di Kota Probolinggo. 
                  Platform ini menyediakan informasi lengkap mengenai profil usaha, produk unggulan, 
                  serta mendukung digitalisasi IKM dalam memperluas jangkauan pasar secara online.
                </p>
              </div>

              {/* ITEM 2 */}
              <div
                className="p-3 rounded-4"
                style={{
                  background: "linear-gradient(135deg, #f8f9ff, #eef3ff)",
                  border: "1px solid #e0e7ff",
                }}
              >
                <p className="mb-0 text-secondary small">
                  Temukan berbagai produk unggulan seperti 
                  <strong> batik khas Probolinggo</strong>, kerajinan tangan, hingga 
                  produk kuliner lokal yang memiliki kualitas dan ciri khas daerah. 
                  Setiap produk ditampilkan dengan informasi yang jelas agar membantu 
                  pengguna dalam mengenal potensi ekonomi lokal secara lebih mendalam.
                </p>
              </div>

              {/* ITEM 3 */}
              <div
                className="p-3 rounded-4"
                style={{
                  background: "linear-gradient(135deg, #f8f9ff, #eef3ff)",
                  border: "1px solid #e0e7ff",
                }}
              >
                <p className="mb-0 text-secondary small">
                   Platform ini juga mendukung transaksi online untuk membantu pelaku 
                  <strong> industri kecil dan menengah</strong> memperluas pasar dan 
                  meningkatkan daya saing di era digital. Selain itu, website ini 
                  menjadi sarana promosi dan informasi yang menghubungkan pelaku usaha 
                  dengan konsumen secara lebih efektif.
                </p>
              </div>

              {/* CTA */}
              <Link
                href="/produk-ikm"
                className="mt-2 d-inline-flex align-items-center gap-2 fw-semibold text-decoration-none"
                style={{
                  color: "#2563eb",
                  background: "#eff6ff",
                  padding: "8px 14px",
                  borderRadius: "999px",
                  fontSize: "14px",
                  width: "fit-content",
                }}
              >
                🚀 Jelajahi produk & dukung IKM lokal sekarang
                
              </Link>

            </div>

          </div>

        </div>

      </div>
    </section>
  )
}