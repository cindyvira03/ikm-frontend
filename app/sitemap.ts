import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL ||
    "https://jelajah.ikmprobolinggo.com"; // ✅ fallback aman

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/seo`,
      {
        cache: "no-store",
      }
    );

    const seoPages = await res.json();

    return seoPages
      .filter((page: any) => page.enable_sitemap)
      .map((page: any) => ({
        url:
          page.canonical_url && page.canonical_url !== ""
            ? page.canonical_url
            : `${baseUrl}/${page.page}`,
        lastModified: page.updated_at
          ? new Date(page.updated_at)
          : new Date(),
        changeFrequency: "weekly" as const,
        priority: page.page === "home" ? 1 : 0.8,
      }));
  } catch (error) {
    // ✅ fallback kalau API error (BIAR BUILD GA GAGAL)
    return [
      {
        url: baseUrl,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 1,
      },
    ];
  }
}