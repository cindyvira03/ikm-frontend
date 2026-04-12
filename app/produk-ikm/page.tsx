import Link from "next/link"
import { getProducts } from "@/services/productService"
import ProductCard from "@/components/produk/ProductCard"
import { generateSeoMetadata } from "@/lib/seo"
import { getSeo } from "@/services/seoService"


// ✅ SSR SEO
export async function generateMetadata() {
  return await generateSeoMetadata("produk_ikm")
}


export default async function ProdukIKMPage() {
  const { kategori, produk } = await getProducts()

  // ✅ ambil SEO untuk heading
  const seo = await getSeo("produk_ikm")

  return (
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
            {produk.map((item) => (
              <article className="col" key={item.id}>
                <ProductCard product={item}/>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-5">
            <h2 className="text-muted mb-0">Belum ada data produk</h2>
            <p className="text-muted">
              Belum ada produk yang ditambahkan.
            </p>
          </div>
        )}
      </section>

    </div>
  )
}