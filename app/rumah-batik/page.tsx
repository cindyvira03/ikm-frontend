import { generateSeoMetadata } from "@/lib/seo"
import SentraClient from "./SentraClient"
import { getSeo } from "@/services/seoService"

export const dynamic = "force-dynamic"

// ✅ SSR SEO
export async function generateMetadata() {
  return await generateSeoMetadata("sentra_batik")

  // console.log("🔥 FINAL DATA:", data)

  // return data
}

export default async function Page() {
  const seo = await getSeo("sentra_batik")

  const schema = {
  "@context": "https://schema.org",
  "@type": "TouristAttraction",
  name: "Rumah Sentra Batik Probolinggo",
  description:
    seo?.meta_description ||
    "Pusat pengembangan dan produksi batik khas Probolinggo.",
  url: "https://ikmprobolinggo.com/rumah-batik",
  image: seo?.hero_image
    ? `${process.env.NEXT_PUBLIC_STORAGE_URL}/${seo.hero_image}`
    : "https://ikmprobolinggo.com/no-image.webp",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Probolinggo",
    addressCountry: "ID"
  }
};
  return (
  <>
    {/* ✅ STRUCTURED DATA */}
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />

    <SentraClient seo={seo} />
  </>
)
}