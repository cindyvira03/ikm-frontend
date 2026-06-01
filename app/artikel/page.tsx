import { getArtikel } from "@/services/artikelService"
import ArtikelSection from "@/components/ArtikelSection"
import { generateSeoMetadata } from "@/lib/seo"
import { getSeo } from "@/services/seoService"
import Footer from "@/components/layout/Footer"

export const dynamic = "force-dynamic"

// ✅ SSR SEO
export async function generateMetadata() {
  return await generateSeoMetadata("artikel")
}

export default async function ArtikelPage() {
   const [artikelRes, seoData] = await Promise.all([
    getArtikel(),
    getSeo("artikel")
  ])

  const artikel = artikelRes?.artikel ?? []
  const seo = seoData?.data ?? seoData;

    const structuredData = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Artikel IKM Probolinggo",
  description: "Daftar artikel dan informasi seputar IKM Kota Probolinggo",
  url: "https://jelajah.ikmprobolinggo.com/artikel",
  mainEntity: {
    "@type": "ItemList",
    itemListElement: artikel.map((item: any, index: number) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.judul,
      url: `https://jelajah.ikmprobolinggo.com/artikel/${item.slug}`
    }))
  }
};

  return (
    <main>

      {/* ✅ STRUCTURED DATA */}
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
  />
      
      {/* HERO / HEADER */}
      <section className="py-5 text-center border-bottom bg-light">
        <div className="container">
          {/* Mengunci keyword utama dengan durasi karakter yang pas */}
          <h1 className="fw-bold display-6 text-dark mb-3">
            {seo?.heading_h1 || "Kabar & Cerita Menarik Seputar IKM Probolinggo"}
          </h1>
          
          <p className="text-secondary max-w-2xl mx-auto mb-2">
            Yuk, intip berbagai cerita seru, info terbaru, dan perkembangan dunia 
            <strong> Industri Kecil dan Menengah (IKM) di Kota Probolinggo</strong>. 
            Di sini, kita bakal bahas banyak hal mulai dari tips mengembangkan usaha lokal, inovasi produk yang kreatif, 
            sampai keunikan warisan budaya seperti <strong>batik khas Probolinggo</strong>.
          </p>
          
          <p className="text-secondary max-w-2xl mx-auto mb-0">
            Dapatkan insight menarik mengenai dunia industri lokal yang terus berkembang 
            serta peran IKM dalam meningkatkan perekonomian daerah.
          </p>
        </div>
      </section>


      {/* LIST ARTIKEL */}
      <ArtikelSection artikel={artikel} showHeader={false} />
      <Footer />
    </main>
  )
}