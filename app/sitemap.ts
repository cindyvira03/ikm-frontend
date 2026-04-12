import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

  // ambil data SEO dari Laravel API
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/seo`, {
    cache: 'no-store'
  })

  const seoPages = await res.json()

  return seoPages
    .filter((page: any) => page.enable_sitemap)
    .map((page: any) => ({
      url: page.canonical_url || `${baseUrl}/${page.page}`,
      lastModified: new Date(page.updated_at),
      changeFrequency: 'weekly',
      priority: page.page === 'beranda' ? 1 : 0.8,
    }))
}