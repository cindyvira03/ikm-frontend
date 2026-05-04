import { getArtikelDetail, getArtikel } from "@/services/artikelService"
import ArtikelClient from "./ArtikelClient"
import { notFound } from "next/navigation"

export const dynamic = "force-dynamic"

type PageProps = {
  params: Promise<{
    slug: string
  }>
}

// ===============================
// 🔥 SEO METADATA (SUDAH BENAR)
// ===============================
export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params

  const res = await getArtikelDetail(slug)
  const artikel = res?.artikel

   if (!artikel) {
    notFound() // 🔥 WAJIB
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
// 🔥 PAGE SSR (FIX TOTAL)
// ===============================
export default async function Page({ params }: PageProps) {
  const { slug } = await params

  const res = await getArtikelDetail(slug)

  const artikel = res?.artikel

  // 🔥 INI WAJIB
  if (!artikel) {
    notFound()
  }

  const all = await getArtikel()
  const list =
    all.artikel?.filter((a: any) => a.slug !== slug).slice(0, 5) || []

  return <ArtikelClient artikel={artikel} list={list} />
}