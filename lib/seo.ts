import { getSeo } from "@/services/seoService"

export async function generateSeoMetadata(page: string) {
  try {
    const seo = await getSeo(page)
    if (!seo) return {}

    const ogImageUrl = seo.og_image
      ? `${process.env.NEXT_PUBLIC_STORAGE_URL}/${seo.og_image}`
      : null

    return {
      title: seo.page_title,
      description: seo.meta_description,
      keywords: seo.meta_keywords || "",

      robots: seo.meta_robots || "index, follow",

      alternates: {
        canonical: seo.canonical_url || "",
      },

      openGraph: {
        title: seo.og_title || seo.page_title,
        description: seo.og_description || seo.meta_description,
        type: seo.og_type || "website",
        ...(ogImageUrl && {
          images: [{ url: ogImageUrl }],
        }),
      },

      twitter: {
        card: "summary_large_image",
        title: seo.og_title || seo.page_title,
        description: seo.og_description || seo.meta_description,
        ...(ogImageUrl && { images: [ogImageUrl] }),
      },
    }
  } catch (error) {
    console.error("SEO error:", error)
    return {}
  }
}