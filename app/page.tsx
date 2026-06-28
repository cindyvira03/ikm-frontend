import { getHome } from "@/services/homeService"
import { getSeo } from "@/services/seoService"
import { generateSeoMetadata } from "@/lib/seo"


import Image from "next/image"
import HeroCTA from "@/components/HeroCTA"

import IkmSlider from "@/components/IkmSlider" 
import AboutPlatform from "@/components/AboutPlatform"
import ProductSection from "@/components/ProductSection"
import ArtikelSection from "@/components/ArtikelSection"
import Footer from "@/components/layout/Footer"


export const dynamic = "force-dynamic"

// ✅ SSR METADATA (SEO UTAMA)
export async function generateMetadata() {
  return await generateSeoMetadata("home")
}


export default async function Home() {
  const [data, seo] = await Promise.all([
    getHome(),
    getSeo("home")
  ])
  const products = data?.produk ?? []
  const ikm = data?.ikm ?? []
  const artikel = data?.artikel ?? []



  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Jelajah Probolinggo",
    url: "https://ikmprobolinggo.com",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://ikmprobolinggo.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <main className="home-page" style={{ background: "#f8fafc" }}>


      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />


      {/* HERO */}
      <section className="position-relative overflow-hidden">
        <div className="container-fluid p-0">
          <div className="row g-0 align-items-center">

            <div className="col-md-6 px-5 py-5">
              {/* ✅ H1 dari SEO */}
              <div>
                {/* Teks Sapaan dipisah menggunakan tag <p> atau <span> biasa */}
                <p className="fw-bold fs-3 text-dark">
                  Selamat Datang di Jelajah Probolinggo
                </p>
                
                {/* Tag <h1> murni hanya berisi kata kunci utama yang kaya SEO */}
                <h1 className="text-primary fs-3">
                  {seo?.heading_h1 || "Batik Khas Probolinggo & E-Katalog IKM"}
                </h1>
              </div>


              <p className="mt-3 text-muted">
                Platform e-katalog berbasis e-commerce yang didukung oleh Disperinaker Kota Probolinggo
                untuk para pelaku Industri Kecil Menengah (IKM) guna mempromosikan produk unggulannya,
                terutama batik khas Probolinggo. Temukan produk dari para pengrajin lokal ini dan
                nikmati pengalaman bertransaksi yang mudah, aman, dan terpercaya.
              </p>

              <HeroCTA />
              {/* <a href="/produk-ikm" className="btn btn-primary mt-3">
                Jelajahi IKM
                <span style={{ fontSize: "18px" }}> →</span>
              </a> */}
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
                  zIndex: 0,
                   pointerEvents: "none",
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
                sizes="(max-width: 768px) 100vw, 400px"
                className="img-fluid rounded shadow"
                quality={70}
                style={{
                  height: "auto", // ✅ FIX
                  objectFit: "cover",
                  position: "relative",
                  zIndex: 1
                }}
                 priority={true}
                
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

      {/* ABOUT PLATFORM */}
      <AboutPlatform />

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
                    <h3 className="fs-5 fw-semibold mt-2">Pengembangan Usaha</h3>
                    <p className="text-muted small">
                      Program pembinaan, pelatihan, dan legalitas usaha bagi para pelaku industri 
                      lokal untuk meningkatkan kualitas dan profesionalitas bisnis.
                    </p>
                  </div>
                </div>

                <div className="col-md-4 mb-3">
                  <div className="mini-card">
                    <div className="fs-3">🎨</div>
                    <h3 className="fs-5 fw-semibold mt-2">Batik Khas Probolinggo</h3>
                    <p className="text-muted small">
                      Beragam motif batik khas Probolinggo dengan nilai budaya tinggi yang menjadi 
                      produk unggulan IKM dan identitas daerah.
                    </p>
                  </div>
                </div>

                <div className="col-md-4 mb-3">
                  <div className="mini-card">
                    <div className="fs-3">🚀</div>
                    <h3 className="fs-5 fw-semibold mt-2">Daya Saing Produk</h3>
                    <p className="text-muted small">
                      Produk unggulan Probolinggo terus dikembangkan agar mampu bersaing di pasar 
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
        <ProductSection products={products} />
      </section>

      {artikel.length > 0 && (
        <section className="pt-4 pb-0">
          <ArtikelSection artikel={artikel} />
        </section>
      )}

      {/* FOOTER */}
      <Footer />

    </main>
  )
}