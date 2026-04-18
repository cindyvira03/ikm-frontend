import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl ="https://jelajah.ikmprobolinggo.com";

  // ✅ HALAMAN UTAMA
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/sentra-batik`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/artikel`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/produk-ikm`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/profil-ikm`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/outlet-ikm`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];

  try {
    // ✅ AMBIL DATA ARTIKEL
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/artikel`,
      { cache: "no-store" }
    );

    const data = await res.json();

    const articlePages = data.map((item: any) => ({
      url: `${baseUrl}/artikel/${item.slug}`,
      lastModified: item.updated_at
        ? new Date(item.updated_at)
        : new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));

    return [...staticPages, ...articlePages];
  } catch (error) {
    return staticPages;
  }
}