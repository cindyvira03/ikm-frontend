"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useSearchParams } from "next/navigation"
import {
  checkoutPage,
  checkout,
  getProvinces,
  getCities,
  getDistricts,
  getKeranjang,
} from "@/services/pembeliService"
import { toast } from "react-toastify" // ✅ tambah toast
import { useCartStore } from "@/stores/cartStore"

export default function CheckoutPage() {

  const router = useRouter()
  const searchParams = useSearchParams()
  const metode = searchParams.get("metode")

  const [data, setData] = useState<any>(null)
  const [items, setItems] = useState<any[]>([])

  const [loading, setLoading] = useState(false) // cek ongkir
  const [loadingPesan, setLoadingPesan] = useState(false) // ✅ tombol pesan
  const [loadingOutlet, setLoadingOutlet] = useState(false) // ✅ outlet

  const { fetchCart } = useCartStore()
  
  // alamat
  const [nama, setNama] = useState("")
  const [hp, setHp] = useState("")
  const [kodePos, setKodePos] = useState("")
  const [alamatLengkap, setAlamatLengkap] = useState("")

  // raja ongkir
  const [provinces, setProvinces] = useState<any[]>([])
  const [cities, setCities] = useState<any[]>([])
  const [districts, setDistricts] = useState<any[]>([])

  const [provinceId, setProvinceId] = useState("")
  const [cityId, setCityId] = useState("")
  const [districtId, setDistrictId] = useState("")
  const [kurir, setKurir] = useState("")

  // =========================
  useEffect(() => {
    const init = async () => {
      const res = await getKeranjang()
      setItems(res.data?.detail || [])

      if (metode === "diambil") {
        setLoadingOutlet(true) // ✅ loading outlet
        await fetchCheckout({ metode_pengiriman: "diambil" })
        setLoadingOutlet(false)
      }

      if (metode === "dikirim") {
        const resProv = await getProvinces()
        const dataProv = resProv?.data ?? resProv ?? []
        setProvinces(dataProv)
      }
    }

    init()
  }, [metode])

  // =========================
  const fetchCheckout = async (payload: any) => {
    setLoading(true)
    const res = await checkoutPage(payload)
    if (res.success) setData(res.data)
    setLoading(false)
  }

  // =========================
  const handleProvince = async (id: string) => {
    setProvinceId(id)
    setCityId("")
    setDistrictId("")
    setCities([])
    setDistricts([])

    const res = await getCities(Number(id))
    const data = res?.data ?? res ?? []
    setCities(data)
  }

  const handleCity = async (id: string) => {
    setCityId(id)
    setDistrictId("")
    setDistricts([])

    const res = await getDistricts(Number(id))
    const data = res?.data ?? res ?? []
    setDistricts(data)
  }

  // =========================
  const handleCekOngkir = () => {
    const prov = provinces.find((p) => p.id == provinceId)
    const city = cities.find((c) => c.id == cityId)
    const dist = districts.find((d) => d.id == districtId)

    if (!prov || !city || !dist || !kurir) {
      toast.warning("Lengkapi alamat dulu!")
      return
    }

    fetchCheckout({
      metode_pengiriman: "dikirim",
      kurir,
      provinsi: prov.name,
      kota_kab: city.name,
      kecamatan: dist.name,
    })
  }

  // =========================
  const handlePesan = async () => {
    const prov = provinces.find((p) => p.id == provinceId)
    const city = cities.find((c) => c.id == cityId)
    const dist = districts.find((d) => d.id == districtId)

    let payload: any = {
      metode_pengiriman: metode,
    }

    if (metode === "dikirim") {
      if (!nama || !hp || !alamatLengkap || !kodePos) {
        toast.warning("Lengkapi data pengiriman!")
        return
      }

      payload = {
        ...payload,
        kurir,
        nama_penerima: nama,
        no_hp: hp,
        provinsi: prov.name,
        kota_kab: city.name,
        kecamatan: dist.name,
        kode_pos: kodePos,
        alamat_lengkap: alamatLengkap,
      }
    }

    try {
      setLoadingPesan(true) // ✅ loading mulai

      const res = await checkout(payload)

      if (res.success) {
        await fetchCart()
        toast.success("Checkout berhasil!") // ✅ ganti alert
        router.push(`/pembayaran/${res.data.pesanan_id}`)
      }
    } catch (err) {
      toast.error("Checkout gagal")
    } finally {
      setLoadingPesan(false) // ✅ stop loading
    }
  }

  return (
    <div className="container py-4">
      <h4 className="mb-4">Checkout</h4>

      {/* ================= DIAMBIL ================= */}
      {metode === "diambil" && (
        <div className="card p-3 mb-3 rounded-4 shadow-sm">
          <h6 className="fw-bold mb-3">Ambil di Outlet</h6>

          {loadingOutlet ? (
            <div className="text-center py-3">
              <div className="spinner-border text-primary"></div>
              <p className="small mt-2">Memuat lokasi outlet...</p>
            </div>
          ) : (
          <>
            {data?.outlets?.map((o: any) => (
              <div key={o.id} className="border rounded p-2 mb-2">
                <p className="mb-1">
                  {o.provinsi}, {o.kota_kab}
                </p>
                <p className="mb-2">Kecamatan {o.kecamatan}</p>

                {o.lokasi_googlemap && (
                  <a
                    href={o.lokasi_googlemap}
                    target="_blank"
                    className="btn btn-outline-primary btn-sm"
                  >
                    Lihat Lokasi
                  </a>
                )}
              </div>
            ))}
          </>
)}
        </div>
      )}

      {/* ================= DIKIRIM ================= */}
      {metode === "dikirim" && (
        <div className="card p-3 mb-3 rounded-4 shadow-sm">
          <h6 className="fw-bold mb-3">Alamat Pengiriman</h6>

          <input placeholder="Nama Penerima" className="form-control mb-2" onChange={(e) => setNama(e.target.value)} />
          <input placeholder="No HP" className="form-control mb-2" onChange={(e) => setHp(e.target.value)} />
          <input placeholder="Kode Pos" className="form-control mb-2" onChange={(e) => setKodePos(e.target.value)} />
          <textarea placeholder="Alamat Lengkap" className="form-control mb-2" onChange={(e) => setAlamatLengkap(e.target.value)} />

          <select className="form-control mb-2" onChange={(e) => handleProvince(e.target.value)}>
            <option value="">Provinsi</option>
            {provinces.map((p: any) => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>

          <select className="form-control mb-2" onChange={(e) => handleCity(e.target.value)}>
            <option value="">Kota</option>
            {cities.map((c: any) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>

          <select className="form-control mb-2" onChange={(e) => setDistrictId(e.target.value)}>
            <option value="">Kecamatan</option>
            {districts.map((d: any) => (
              <option key={d.id} value={d.id}>{d.name}</option>
            ))}
          </select>

          <select className="form-control mb-3" onChange={(e) => setKurir(e.target.value)}>
            <option value="">Kurir</option>
            <option value="jne">JNE</option>
            <option value="pos">POS</option>
            <option value="tiki">TIKI</option>
          </select>

          <button
            className="btn btn-outline-primary w-100"
            onClick={handleCekOngkir}
            disabled={loading}
          >
            {loading ? "Menghitung..." : "Cek Ongkir"}
          </button>
        </div>
      )}

      {/* ================= PRODUK ================= */}
      <div className="card p-3 mb-3 rounded-4 shadow-sm">
        <h6 className="fw-bold mb-3">Produk Dipesan</h6>

        {items.map((item) => (
          <div key={item.id} className="d-flex justify-content-between mb-2">
            <div>
              {item.produk.nama_produk} x {item.qty}
            </div>
            <div>
              Rp {(item.qty * item.harga).toLocaleString()}
            </div>
          </div>
        ))}
      </div>

      {/* ================= TOTAL ================= */}
      {data && (
        <div className="card p-3 rounded-4 shadow-sm">
          <div className="d-flex justify-content-between">
            <span>Subtotal</span>
            <span>Rp {data.subtotal.toLocaleString()}</span>
          </div>

          <div className="d-flex justify-content-between">
            <span>Ongkir</span>
            <span>Rp {data.ongkir.toLocaleString()}</span>
          </div>

          <div className="d-flex justify-content-between fw-bold mt-2">
            <span>Total</span>
            <span>Rp {data.total_bayar.toLocaleString()}</span>
          </div>

          <button
            className="btn btn-primary w-100 mt-3"
            onClick={handlePesan}
            disabled={loadingPesan}
          >
            {loadingPesan ? "Memesan..." : "Pesan Sekarang"}
          </button>
        </div>
      )}
    </div>
  )
}