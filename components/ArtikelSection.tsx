import Link from "next/link"
import Image from "next/image"

export default function ArtikelSection({ 
  artikel, 
  showHeader = true 
}: { 
  artikel: any[]
  showHeader?: boolean
}) {
  return (
    <section className="py-5 bg-white">
      <div className="container">
        
        {showHeader && (
        <>
            <h2 className="text-center fw-semibold mb-4">
            Artikel & Informasi
            </h2>

            <div className="d-flex justify-content-end mb-4">
            <Link href="/artikel" className="text-primary text-decoration-none">
                Lihat Semua →
            </Link>
            </div>
        </>
)}

        {/* ✅ CENTER kalau item sedikit */}
        <div className="row justify-content-center">
          {artikel.map((item) => (
            <div className="col-md-4 mb-4 d-flex" key={item.id}>
              
              <div className="card border-0 shadow-sm h-100 artikel-card w-100 d-flex flex-column">

                <Image
                  src={
                    item.gambar
                      ? `${process.env.NEXT_PUBLIC_STORAGE_URL}/${item.gambar}`
                      : "/no-image.jpg"
                  }
                  alt={item.judul}
                  width={400}
                  height={250}
                  className="card-img-top"
                  style={{ objectFit: "cover", height: "220px" }}
                />

                {/* ✅ FLEX biar button selalu di bawah */}
                <div className="card-body d-flex flex-column">
                  
                  <h6 className="fw-semibold text-dark">
                    {item.judul}
                  </h6>

                  <p className="text-muted small mt-2">
                    {item.isi?.slice(0, 100)}...
                  </p>

                  <small className="text-muted">
                    {new Date(item.created_at).toLocaleDateString("id-ID")}
                </small>

                  {/* ✅ PUSH BUTTON KE BAWAH */}
                  <div className="mt-auto text-end">
                    <Link
                      href={`/artikel/${item.slug}`}
                      className="btn btn-primary btn-sm"
                    >
                      Baca Selengkapnya →
                    </Link>
                  </div>

                </div>

              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  )
}