export async function getArtikel() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/artikel`, {
    next: { revalidate: 60 },
  })

  if (!res.ok) throw new Error("Gagal fetch artikel")

  return res.json()
}

export async function getArtikelDetail(slug: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/artikel/${slug}`,
      {
        next: { revalidate: 60 }, // 🔥 penting untuk SSR dynamic
      }
    )

    if (!res.ok) {
      console.log("STATUS ERROR:", res.status)
      return null
    }

    return await res.json()
  } catch (err) {
    console.log("FETCH ERROR:", err)
    return null
  }
}