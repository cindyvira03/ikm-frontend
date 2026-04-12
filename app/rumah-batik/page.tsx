import { generateSeoMetadata } from "@/lib/seo"
import SentraClient from "./SentraClient"
import { getSeo } from "@/services/seoService"

export const dynamic = "force-dynamic"

// ✅ SSR SEO
export async function generateMetadata() {
  return await generateSeoMetadata("sentra_batik")

  // console.log("🔥 FINAL DATA:", data)

  // return data
}

export default async function Page() {
  const seo = await getSeo("sentra_batik")
  return <SentraClient seo={seo} />
}