export interface CmsPage {
  id?: number
  page: string

  // HERO
  hero_title?: string
  hero_description?: string
  hero_image?: string

  // ABOUT
  about_title?: string
  about_description?: string

  created_at?: string
  updated_at?: string
}

export interface CmsResponse {
  success: boolean
  data: CmsPage
}