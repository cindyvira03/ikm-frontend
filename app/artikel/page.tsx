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
  const artikelRes = await getArtikel()
  const artikel = artikelRes?.artikel ?? []

    // ✅ ambil SEO untuk heading
    const seo = await getSeo("artikel")

  return (
    <main>
      
      {/* HERO / HEADER */}
      <section className="py-5 text-center border-bottom">
        <div className="container">
          <h1 className="fw-bold">Artikel & Informasi</h1>
          <p className="text-muted mt-2">
            Temukan berbagai informasi, berita, dan insight terbaru seputar 
            IKM Kota Probolinggo dan produk unggulan daerah.
          </p>
        </div>
      </section>

      {/* LIST ARTIKEL */}
      <ArtikelSection artikel={artikel} showHeader={false} />

    </main>
  )
}