import { getArtikel } from "@/services/artikelService"
import ArtikelSection from "@/components/ArtikelSection"
import { generateSeoMetadata } from "@/lib/seo"
import { getSeo } from "@/services/seoService"

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
  const seo = seoData

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
      <section className="py-5 text-center border-bottom">
        <div className="container">
          <h1 className="fw-bold">Artikel & Informasi Seputar IKM (Industri Kecil dan Menengah Kota Probolinggo</h1>
          <p className="text-muted mt-3">
            Temukan berbagai artikel, berita, dan informasi terbaru seputar 
            <strong> IKM (Industri Kecil dan Menengah) Kota Probolinggo</strong>, 
            mulai dari pengembangan usaha, inovasi produk, hingga potensi 
            <strong> produk unggulan daerah seperti batik khas Probolinggo</strong>.
          </p>

          <p className="text-muted mb-0">
            Dapatkan insight menarik mengenai dunia industri lokal yang terus berkembang 
            serta peran IKM dalam meningkatkan perekonomian daerah.
          </p>
        </div>
      </section>

      {/* LIST ARTIKEL */}
      <ArtikelSection artikel={artikel} showHeader={false} />

    </main>
  )
}