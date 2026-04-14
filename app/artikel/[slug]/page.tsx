import { getArtikelDetail } from "@/services/artikelService"
import ArtikelClient from "./ArtikelClient"

export const dynamic = "force-dynamic"

// ===============================
// 🔥 SSR SEO (NEXT.JS 15 FIX)
// ===============================
export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params

  const res = await getArtikelDetail(slug)
  const artikel = res?.artikel

  if (!artikel) {
    return {
      title: "Artikel tidak ditemukan",
      description: "Artikel tidak tersedia",
    }
  }

  const imageUrl = artikel.gambar
    ? `${process.env.NEXT_PUBLIC_STORAGE_URL}/${artikel.gambar}`
    : "/no-image.jpg"

  const url = `https://jelajah.ikmprobolinggo.com/artikel/${artikel.slug}`

  return {
    title: artikel.meta_title || artikel.judul,
    description:
      artikel.meta_description ||
      artikel.isi?.replace(/<[^>]*>/g, "").slice(0, 160),

    keywords: artikel.keywords || "",

    robots: "index, follow",

    authors: artikel.sumber ? [{ name: artikel.sumber }] : [],

    alternates: {
      canonical: url,
    },

    // ================= OPEN GRAPH =================
    openGraph: {
      title: artikel.meta_title || artikel.judul,
      description:
        artikel.meta_description ||
        artikel.isi?.replace(/<[^>]*>/g, "").slice(0, 160),

      url,

      siteName: "Jelajah Probolinggo",

      type: "article",

      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: artikel.judul,
        },
      ],

      locale: "id_ID",

      publishedTime: artikel.created_at,
      modifiedTime: artikel.updated_at,
    },

    // ================= TWITTER =================
    twitter: {
      card: "summary_large_image",
      title: artikel.meta_title || artikel.judul,
      description:
        artikel.meta_description ||
        artikel.isi?.replace(/<[^>]*>/g, "").slice(0, 160),
      images: [imageUrl],
    },
  }
}

// ===============================
// PAGE SSR (CLIENT COMPONENT)
// ===============================
export default async function Page(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params   // 🔥 INI WAJIB

  return <ArtikelClient slug={slug} />
}