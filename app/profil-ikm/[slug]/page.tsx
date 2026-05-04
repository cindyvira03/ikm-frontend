import { getProfilIkmDetail } from "@/services/profilIkmService"
import ProfilIkmClient from "./ProfilIkmClient"
import { notFound } from "next/navigation"

export const dynamic = "force-dynamic"

type PageProps = {
  params: Promise<{ slug: string }>
}

// ===============================
// 🔥 SEO METADATA
// ===============================
export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params

  const res = await getProfilIkmDetail(slug)
  const ikm = res?.ikm

  if (!ikm) {
    notFound() // 🔥 INI YANG BENAR
  }


  const imageUrl = ikm.gambar
    ? `${process.env.NEXT_PUBLIC_STORAGE_URL}/ikm/${ikm.gambar}`
    : "/no-image.webp"

  const url = `https://jelajah.ikmprobolinggo.com/profil-ikm/${slug}`

  return {
    title: ikm.nama_usaha,
    description: ikm.deskripsi_singkat || "Profil usaha IKM",
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: ikm.nama_usaha,
      description: ikm.deskripsi_singkat || "",
      url,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
        },
      ],
    },
  }
}

// ===============================
// 🔥 SSR PAGE
// ===============================
export default async function Page({ params }: PageProps) {
  const { slug } = await params

  const res = await getProfilIkmDetail(slug)
  const ikm = res?.ikm

  if (!ikm) {
    notFound()
  }

  return <ProfilIkmClient ikm={ikm} />
}