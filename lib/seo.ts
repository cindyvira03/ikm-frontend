import { getSeo } from "@/services/seoService"

export async function generateSeoMetadata(page: string) {
  try {
    const seo = await getSeo(page)

    if (!seo) return {}

    return {
      title: seo.page_title,
      description: seo.meta_description,
      keywords: seo.keywords,
      authors: seo.meta_author ? [{ name: seo.meta_author }] : [],

      robots: seo.meta_robots || "index, follow",

      alternates: {
        canonical: seo.canonical_url || "",
      },

      openGraph: {
        title: seo.page_title,
        description: seo.meta_description,
        url: seo.canonical_url,
        type: "website",
      },

      other: {
        "image:alt": seo.image_alt || "",
      },
    }
  } catch (error) {
    console.error("SEO error:", error)
    return {}
  }
}