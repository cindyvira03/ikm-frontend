export async function getSeo(page: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/seo?page=${page}`,
    {
        next: { revalidate: 60 },
    }
  )

  if (!res.ok) return null

  const json = await res.json()

  return json.data // 🔥 AMBIL DATA NYA SAJA
}