import { getProducts } from "@/services/productService"
import { getProfilIkm } from "@/services/profilIkmService"
import { getSeo } from "@/services/seoService"
import { generateSeoMetadata } from "@/lib/seo"

import IkmSlider from "@/components/IkmSlider"
import { FaShoppingCart } from "react-icons/fa"
import Image from "next/image"
import ProductSection from "@/components/ProductSection"


// ✅ SSR METADATA (SEO UTAMA)
export async function generateMetadata() {
  return await generateSeoMetadata("home")
}


export default async function Home() {
  const productsRes = await getProducts()
  const { ikm } = await getProfilIkm()

  // ✅ ambil SEO untuk H1 & image alt
  const seo = await getSeo("home")

  const limitedProducts = productsRes.produk.slice(0, 4)

  return (
    <main className="home-page" style={{ background: "#f8fafc" }}>

      {/* HERO */}
      <section className="position-relative overflow-hidden">
        <div className="container-fluid p-0">
          <div className="row g-0 align-items-center">

            <div className="col-md-6 px-5 py-5">
              {/* ✅ H1 dari SEO */}
              <h1 className="fw-bold display-6">
                Selamat Datang di <br />
                Jelajah Probolinggo <br />
                <span className="text-primary fs-3">
                  {seo?.heading_h1 || "Batik Probolinggo & Produk IKM Unggulan"}
                </span>
              </h1>

              <p className="mt-3 text-muted">
                Platform e-katalog Industri Kecil dan Menengah (IKM) Kota Probolinggo berbasis e-commerce untuk mempromosikan dan menjual berbagai produk unggulan dari 
                Industri Kecil dan Menengah (IKM) Kota Probolinggo, khususnya batik khas Probolinggo dengan 
                beragam motif unik yang dapat dibeli secara online dengan mudah dan terpercaya.
              </p>

              <a href="/produk-ikm" className="btn btn-primary mt-3">
                Jelajahi IKM
                <span style={{ fontSize: "18px" }}> →</span>
              </a>
            </div>

            <div className="col-md-6 position-relative text-center px-5 py-5">
              <div
                style={{
                  position: "absolute",
                  width: "400px",
                  height: "400px",
                  background: "linear-gradient(135deg, #4facfe, #00f2fe)",
                  borderRadius: "50%",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  filter: "blur(60px)",
                  opacity: 0.6,
                  zIndex: 0
                }}
              />

              {/* ✅ Image optimization + alt dari SEO */}
              <Image
                src={
                  seo?.hero_image
                    ? `${process.env.NEXT_PUBLIC_STORAGE_URL}/${seo.hero_image}`
                    : "/no-image.jpg"
                }
                alt={seo?.image_alt || "IKM Kota Probolinggo"}
                width={400}
                height={320}
                className="img-fluid rounded shadow"
                style={{
                  height: "auto", // ✅ FIX
                  objectFit: "cover",
                  position: "relative",
                  zIndex: 1
                }}
                priority
                unoptimized
              />
            </div>

          </div>
        </div>

        <div style={{ position: "absolute", bottom: 0, width: "100%" }}>
          <svg viewBox="0 0 1440 120" style={{ display: "block" }}>
            <path
              fill="#ffffff"
              d="M0,64L80,80C160,96,320,128,480,128C640,128,800,96,960,80C1120,64,1280,64,1360,64L1440,64L1440,160L1360,160C1280,160,1120,160,960,160C800,160,640,160,480,160C320,160,160,160,80,160L0,160Z"
            ></path>
          </svg>
        </div>
      </section>

      {/* ABOUT + IKM */}
      <section className="py-5 bg-white position-relative overflow-hidden home-ikm-section">

        <div className="home-ikm-bg" />

        <div className="container position-relative" style={{ zIndex: 1 }}>
          
          <div className="container mb-5">
            <div className="paper-card position-relative p-4 pt-5 text-center">

            {/* Label */}
            <div className="paper-label">
              <h2 className="fw-semibold mb-0 small-title">
                IKM (Industri Kecil dan Menengah) Kota Probolinggo
              </h2>
            </div>

              {/* Content */}
              <p className="text-muted mt-3">
                IKM (Industri Kecil dan Menengah) di Kota Probolinggo berperan penting dalam 
                mendorong pertumbuhan ekonomi daerah melalui pengembangan produk lokal unggulan 
                seperti batik Probolinggo dan berbagai usaha kreatif lainnya. Dengan ratusan pelaku 
                IKM yang terus berkembang, sektor ini menjadi penggerak utama dalam menciptakan 
                lapangan kerja, meningkatkan daya saing produk, serta memperkuat identitas 
                batik khas Probolinggo di pasar lokal maupun nasional.
              </p>

              {/* 3 Card kecil */}
              <div className="row mt-4">
                <div className="col-md-4 mb-3">
                  <div className="mini-card">
                    <div className="fs-3">📈</div>
                    <h6 className="fw-semibold mt-2">Pengembangan Usaha</h6>
                    <p className="text-muted small">
                      Program pembinaan, pelatihan, dan legalitas usaha bagi IKM industri kecil 
                      dan menengah untuk meningkatkan kualitas dan profesionalitas bisnis.
                    </p>
                  </div>
                </div>

                <div className="col-md-4 mb-3">
                  <div className="mini-card">
                    <div className="fs-3">🎨</div>
                    <h6 className="fw-semibold mt-2">Batik Probolinggo</h6>
                    <p className="text-muted small">
                      Beragam motif batik khas Probolinggo dengan nilai budaya tinggi yang menjadi 
                      produk unggulan IKM dan identitas daerah.
                    </p>
                  </div>
                </div>

                <div className="col-md-4 mb-3">
                  <div className="mini-card">
                    <div className="fs-3">🚀</div>
                    <h6 className="fw-semibold mt-2">Daya Saing Produk</h6>
                    <p className="text-muted small">
                      Produk IKM Kota Probolinggo terus dikembangkan agar mampu bersaing di pasar 
                      nasional melalui inovasi, kualitas, dan dukungan pemerintah.
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>

          <IkmSlider ikm={ikm} />

        </div>

        <div style={{ position: "absolute", bottom: 0, width: "100%" }}>
          <svg viewBox="0 0 1440 120" style={{ display: "block", marginBottom: "-5px" }}>
            <path
              fill="#f8fafc"
              d="M0,96L120,80C240,64,480,32,720,32C960,32,1200,64,1320,80L1440,96L1440,160L0,160Z"
            />
          </svg>
        </div>
      </section>

      {/* PRODUK */}
      <section className="py-4">
        <ProductSection limitedProducts={limitedProducts} />
      </section>

      {/* FOOTER */}
      <footer className="mt-5 pb-3">
        <div className="container">
          <hr className="border-secondary-subtle mb-3" />

          <p className="text-center small text-secondary mb-0">
            © {new Date().getFullYear()} {process.env.NEXT_PUBLIC_APP_NAME || "IKM Kota Probolinggo"}. All rights reserved.
          </p>
        </div>
      </footer>

    </main>
  )
}