export interface KategoriArtikel {
  id: number
  nama: string
  slug: string
  created_at?: string
  updated_at?: string
}

export interface Artikel {
  id: number
  kategori_artikel_id: number
  judul: string
  slug: string
  isi: string
  gambar?: string
  sumber?: string
  meta_title?: string
  meta_description?: string
  keyword?: string
  status: "draft" | "publish"
  created_at?: string
  updated_at?: string

  // relasi
  kategori?: KategoriArtikel
}

type PageProps = {
  params: {
    slug: string
  }
}
