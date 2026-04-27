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
    {
      url: `${baseUrl}/artikel/pengembangan-produk-unggulan-daerah-untuk-mendukung-sentra-ikm-di-kota-probolinggo`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/produk-ikm/batik-radin-kawung`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/profil-ikm/batik-manggur`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];

  //  let articlePages: MetadataRoute.Sitemap = [];
  // let productPages: MetadataRoute.Sitemap = [];
  // let profilPages: MetadataRoute.Sitemap = [];


  // try {
  //   const res = await fetch(
  //     `${process.env.NEXT_PUBLIC_API_URL}/sitemap/artikel`,
  //     { next: { revalidate: 3600 } }
  //   )

  //   const artikelList = await res.json()

  //   articlePages = artikelList.map((item: any) => ({
  //     url: `${baseUrl}/artikel/${item.slug}`,
  //     lastModified: item.updated_at
  //       ? new Date(item.updated_at)
  //       : new Date(),
  //     changeFrequency: "weekly" as const,
  //     priority: 0.8,
  //   }));
  // } catch (error) {
  //   console.log("SITEMAP ARTIKEL ERROR:", error);
  // }

  // try {
  //     const res = await fetch(
  //     `${process.env.NEXT_PUBLIC_API_URL}/sitemap/produk`,
  //     { next: { revalidate: 3600 } }
  //   )

  //   const produkList = await res.json()

  //   productPages = produkList.map((item: any) => ({
  //     url: `${baseUrl}/produk-ikm/${item.slug}`,
  //     lastModified: item.updated_at
  //       ? new Date(item.updated_at)
  //       : new Date(),
  //     changeFrequency: "weekly" as const,
  //     priority: 0.8,
  //   }));
  // } catch (error) {
  //   console.log("SITEMAP PRODUK ERROR:", error);
  // }


  // try {
  //   const res = await fetch(
  //     `${process.env.NEXT_PUBLIC_API_URL}/sitemap/profil`,
  //     { next: { revalidate: 3600 } }
  //   )

  //   const profilList = await res.json()

  //   profilPages = profilList.map((item: any) => ({
  //     url: `${baseUrl}/profil-ikm/${item.slug}`,
  //     lastModified: item.updated_at
  //       ? new Date(item.updated_at)
  //       : new Date(),
  //     changeFrequency: "weekly" as const,
  //     priority: 0.8,
  //   }));
  // } catch (error) {
  //   console.log("SITEMAP PROFIL ERROR:", error);
  // }

  // return [
  //   ...staticPages,
  //   ...articlePages,
  //   ...productPages,
  //   ...profilPages,
  // ];

   return staticPages;
}