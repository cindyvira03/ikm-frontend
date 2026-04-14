"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { getKeranjang, checkAuth } from "@/services/pembeliService"
import { DetailKeranjang } from "@/types/keranjang"
import { useCartStore } from "@/stores/cartStore"
import { toast } from "react-toastify"

export default function KeranjangPage() {
  const [items, setItems] = useState<DetailKeranjang[]>([])
  const [loading, setLoading] = useState(true)
  const [updatingId, setUpdatingId] = useState<number | null>(null)
  const [metodePengiriman, setMetodePengiriman] = useState<"diambil" | "dikirim" | null>(null)

  const router = useRouter()
  const API_URL = process.env.NEXT_PUBLIC_API_URL
  const { fetchCart } = useCartStore()

  useEffect(() => {
    const init = async () => {
      const isAuth = await checkAuth()

      if (!isAuth) {
        router.push("/login")
        return
      }

      try {
        const res = await getKeranjang()
        setItems(res.data?.detail || [])
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    init()
  }, [])

  // 🧮 hitung total
  const totalHarga = items.reduce(
    (acc, item) => acc + item.qty * item.harga,
    0
  )

  // 🔥 API UPDATE
  const updateKeranjang = async (id: number, qty: number) => {
    const token = localStorage.getItem("token")

    await fetch(`${API_URL}/pembeli/keranjang/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ qty }),
    })
  }

  // 🔥 API DELETE
  const deleteKeranjang = async (id: number) => {
    const token = localStorage.getItem("token")

    await fetch(`${API_URL}/pembeli/keranjang/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  }

  // 🔥 UPDATE QTY + DELETE LOGIC
 const updateQty = async (id: number, type: "plus" | "minus") => {
  const currentItem = items.find((item) => item.id === id)
  if (!currentItem) return

  setUpdatingId(id)

  try {
    if (type === "plus") {
      await updateKeranjang(id, currentItem.qty + 1)
    } else {
      if (currentItem.qty === 1) {
        await deleteKeranjang(id)
      } else {
        await updateKeranjang(id, currentItem.qty - 1)
      }
    }

    // 🔥 WAJIB: sync ulang dari backend
    const res = await getKeranjang()
    setItems(res.data?.detail || [])

    await fetchCart()

  } catch (err) {
    console.error("Gagal update keranjang:", err)
  } finally {
    setUpdatingId(null)
  }
}

  // ✅ LOADING (SUDAH DISAMAKAN)
  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "60vh" }}
      >
        <div className="text-center">
          <div className="spinner-border text-primary"></div>
          <div className="mt-2">Memuat keranjang...</div>
        </div>
      </div>
    )
  }

const handleCheckout = () => {
  if (!metodePengiriman) {
     toast.warning("Pilih metode pengiriman dulu!")
    return
  }

  router.push(`/checkout?metode=${metodePengiriman}`)
}

  return (
    <div className="container py-4">
      <h4 className="mb-4 fw-semibold fs-5">Keranjang Saya</h4>

      {items.length === 0 ? (
        <div className="text-center mt-5">
          <h5>Keranjang kosong 🛒</h5>
          <p>Yuk belanja dulu!</p>
        </div>
      ) : (
        <div className="row">
          {/* LIST PRODUK */}
          <div className="col-md-8">
            {items.map((item) => (
              <div
                key={item.id}
                className="card mb-3 p-3 shadow-sm border-0 rounded-4"
              >
                <div className="d-flex align-items-center gap-3">
                  <img
                    src={
                      item.produk.foto
                        ? `${process.env.NEXT_PUBLIC_STORAGE_URL}/${item.produk.foto}`
                        : "/no-image.webp"
                    }
                    alt={item.produk.nama_produk}
                    width={80}
                    height={80}
                    className="rounded-3 object-fit-cover"
                  />

                  <div className="grow">
                    <h6 className="mb-1">
                      {item.produk.nama_produk}
                    </h6>
                    <small className="text-muted">
                      Rp {item.harga.toLocaleString()}
                    </small>

                    <div className="d-flex align-items-center mt-2 gap-2">
                      <button
                        className="btn btn-outline-secondary btn-sm"
                        disabled={updatingId === item.id}
                        onClick={() => updateQty(item.id, "minus")}
                      >
                        -
                      </button>

                      <span>{item.qty}</span>

                      <button
                        className="btn btn-outline-secondary btn-sm"
                        disabled={updatingId === item.id}
                        onClick={() => updateQty(item.id, "plus")}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="text-end">
                    <h6 className="fw-bold">
                      Rp {(item.qty * item.harga).toLocaleString()}
                    </h6>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* SUMMARY */}
          <div className="col-md-4">
            <div className="card p-4 shadow-sm border-0 rounded-4">
              <h5 className="fw-bold mb-3">Ringkasan Belanja</h5>

              <div className="d-flex justify-content-between mb-3">
                <span>Total</span>
                <span className="fw-bold">
                  Rp {totalHarga.toLocaleString()}
                </span>
              </div>

              {/* 🔽 METODE PENGIRIMAN */}
              <div className="mb-3">
                <label className="fw-semibold mb-2 d-block">
                  Metode Pengiriman
                </label>

                <div className="form-check mb-2">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="pengiriman"
                    id="ambil"
                    checked={metodePengiriman === "diambil"}
                    onChange={() => setMetodePengiriman("diambil")}
                  />
                  <label className="form-check-label" htmlFor="ambil">
                    Ambil di Outlet
                  </label>
                </div>

                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="pengiriman"
                    id="kirim"
                    checked={metodePengiriman === "dikirim"}
                    onChange={() => setMetodePengiriman("dikirim")}
                  />
                  <label className="form-check-label" htmlFor="kirim">
                    Dikirim ke Alamat
                  </label>
                </div>
              </div>

              <button onClick={handleCheckout} className="btn btn-primary w-100 mt-2 rounded-3">
                Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}