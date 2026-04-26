import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  // const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/login', '/register'],
    },
    sitemap: "https://jelajah.ikmprobolinggo.com/sitemap.xml",
  }
}