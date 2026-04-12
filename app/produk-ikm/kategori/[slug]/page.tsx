import Link from "next/link"
import { getProductsByCategory } from "@/services/productService"
import ProductCard from "@/components/produk/ProductCard"

export default async function ProdukKategoriPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params; // ✅ unwrap params
  const { kategori, produk, currentKategori } = await getProductsByCategory(slug);

  return (
    <div className="container py-4">
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

      <h2 className="text-dark fw-semibold mb-4 fs-1">
        Daftar Produk IKM
      </h2>

      {/* Kategori */}
      <div className="d-flex flex-wrap gap-2 mb-4">
        <Link href="/produk-ikm" className="btn btn-outline-primary border">
          Semua
        </Link>

        {kategori.map((kat) => (
          <Link
            key={kat.id}
            href={`/produk-ikm/kategori/${kat.slug}`}
            className={`btn ${
              kat.id === currentKategori.id
                ? "btn-primary"
                : "btn-outline-primary border"
            }`}
          >
            {kat.nama_kategori}
          </Link>
        ))}
      </div>

      {/* Produk */}
      {produk.length > 0 ? (
        <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 g-3">
          {produk.map((item) => (
            <div className="col" key={item.id}>
              <ProductCard product={item} />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-5">
          <h5 className="text-muted mb-0">Belum ada data produk</h5>
          <p className="text-muted">
            Belum ada produk untuk kategori ini.
          </p>
        </div>
      )}
    </div>
  )
}