import { getSeo } from "@/services/seoService"

export async function generateSeoMetadata(page: string) {
  try {
    const seo = await getSeo(page)

    if (!seo) return {}

    return {
      title: seo.page_title,
      description: seo.meta_description,

      robots: seo.meta_robots || "index, follow",

      alternates: {
        canonical: seo.canonical_url || "",
      },

    }
  } catch (error) {
    console.error("SEO error:", error)
    return {}
  }
}