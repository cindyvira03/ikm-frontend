"use client"

import Image from "next/image"
import Link from "next/link"
import { FaShoppingCart } from "react-icons/fa"

export default function ProductSection({ limitedProducts }: any) {
  return (
      <div className="container">
        <h2 className="text-center fw-semibold mb-4">
          Produk Unggulan IKM Kota Probolinggo
        </h2>

        <p className="text-center text-muted mb-4">
          Temukan berbagai produk unggulan dari pelaku industri kecil dan menengah di Kota Probolinggo, khususnya batik khas Probolinggo.
        </p>

        <div className="row g-4">
          {limitedProducts.length > 0 ? (
            limitedProducts.map((product: any) => (
              <div className="col-md-3" key={product.id}>

                {/* ✅ TAMBAHAN LINK (TIDAK MENGUBAH STRUKTUR DALAM) */}
                <Link 
                  href={`/produk-ikm/${product.slug}`}
                  className="text-decoration-none text-dark"
                >
                  <div className="home-product-card">

                    <div className="home-product-image">
                      <Image
                        src={
                          product.foto
                            ? `${process.env.NEXT_PUBLIC_STORAGE_URL}/${product.foto}`
                            : "/no-image.webp"
                        }
                        alt={product.nama_produk}
                        width={300}
                        height={200}
                        sizes="(max-width: 768px) 100vw, 300px"
                        style={{
                            objectFit: "cover",
                        }}
                        
                      />

                      <div className="home-product-overlay" />
                    </div>

                    <div className="home-product-content">
                      <h6>{product.nama_produk}</h6>
                    </div>

                  </div>
                </Link>

              </div>
            ))
          ) : (
            <p className="text-center text-muted">Belum ada produk</p>
          )}
        </div>

        <div className="d-flex justify-content-end mt-4">
          <a
            href="/produk-ikm"
            className="btn btn-primary d-flex align-items-center gap-2 px-4 py-2"
            style={{ borderRadius: "10px" }}
          >
            <FaShoppingCart size={20} />
            Belanja di E-Katalog
            <span style={{ fontSize: "18px" }}>→</span>
          </a>
        </div>
      </div>
  )
}