import { getProductBySlug, getProducts } from "@/services/productService"
import ProdukDetailClient from "./ProdukDetailClient"

export const dynamic = "force-dynamic"

type PageProps = {
  params: Promise<{
    slug: string
  }>
}

// ===============================
// 🔥 SEO METADATA
// ===============================
export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const res = await getProductBySlug(slug)
  const produk = res?.produk

  if (!produk) {
    return {
      title: "Produk tidak ditemukan",
      description: "Produk tidak tersedia",
    }
  }

  const imageUrl = produk.foto
    ? `${process.env.NEXT_PUBLIC_STORAGE_URL}/${produk.foto}`
    : "/no-image.webp"

  const url = `https://jelajah.ikmprobolinggo.com/produk-ikm/${produk.slug}`

  return {
    title: produk.nama_produk,
    description: produk.deskripsi?.slice(0, 160),
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: produk.nama_produk,
      description: produk.deskripsi?.slice(0, 160),
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
  const res = await getProductBySlug(slug)
  const produk = res?.produk

  const all = await getProducts()
  const list =
    all.produk?.filter((p: any) => p.slug !== slug).slice(0, 5) || []

  return <ProdukDetailClient produk={produk} list={list} />
}