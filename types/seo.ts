export interface SeoSetting {
  id: number
  meta_keywords: string | null
  page_title: string
  meta_description: string | null
  og_title: string | null
  og_description: string | null
  og_image?: string | File | null
  og_type: string | null
  meta_robots: string
  heading_h1: string | null
  canonical_url: string | null
  hero_image?: string | File | null
  image_alt: string | null
  enable_sitemap: boolean
  enable_robots: boolean
}

export interface SeoResponse {
  success: boolean
  data: SeoSetting
}