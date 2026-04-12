export async function getOutlet() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/outlet-ikm`, {
    cache: "no-store",
  })

  if (!res.ok) {
    throw new Error("Gagal mengambil data outlet")
  }

  const data = await res.json()

  return {
    outlet: data.outlet,
  }
}