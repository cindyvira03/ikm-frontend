export const dynamic = "force-dynamic";
export const revalidate = 3600;

export async function GET() {
  const baseUrl = "https://jelajah.ikmprobolinggo.com";

  // ✅ STATIC (format object seperti punyamu)
  const staticPages = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/rumah-batik`,
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

  // 🔥 FETCH (optional dynamic)
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/sitemap/all`);
  const data = await res.json();

  const artikel = data.artikel || [];
  const produk = data.produk || [];
  const profil = data.profil || [];

  const dynamicPages = [
    ...artikel.map((item: any) => ({
      url: `${baseUrl}/artikel/${item.slug}`,
      lastModified: item.updated_at || new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    })),
    ...produk.map((item: any) => ({
      url: `${baseUrl}/produk-ikm/${item.slug}`,
      lastModified: item.updated_at || new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    })),
    ...profil.map((item: any) => ({
      url: `${baseUrl}/profil-ikm/${item.slug}`,
      lastModified: item.updated_at || new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    })),
  ];

  const allPages = [...staticPages, ...dynamicPages];

  // ✅ convert ke XML
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${allPages
      .map(
        (page) => `
      <url>
        <loc>${page.url}</loc>
        <lastmod>${new Date(page.lastModified).toISOString()}</lastmod>
        <changefreq>${page.changeFrequency}</changefreq>
        <priority>${page.priority}</priority>
      </url>`
      )
      .join("")}
  </urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}