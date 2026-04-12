export async function getSeo(page: String) {
  const API_URL = "https://ikmprobolinggo.com/api" // 🔥 sementara hardcode dulu

  const res = await fetch(
    `${API_URL}/seo?page=${page}`,
    {
      next: { revalidate: 60 }, // ✅ bukan no-store
    }
  )

  if (!res.ok) return null

  const json = await res.json()
  return json.data
}