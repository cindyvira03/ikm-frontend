"use client"

export const dynamic = "force-dynamic"
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
import {
  getAlamatPembeli,
  deleteAlamatPembeli,
  createAlamatPembeli,
  updateAlamatPembeli
} from "@/services/pembeliService"

export default function CheckoutPage() {

  const router = useRouter()
  const [metode, setMetode] = useState("")
  const [alamatList, setAlamatList] = useState<any[]>([])
  const [selectedAlamat, setSelectedAlamat] = useState<any>(null)
  const [loadingAlamat, setLoadingAlamat] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [provModal, setProvModal] = useState("")
const [cityModal, setCityModal] = useState("")
const [districtModal, setDistrictModal] = useState("")

const [citiesModal, setCitiesModal] = useState<any[]>([])
const [districtsModal, setDistrictsModal] = useState<any[]>([])

const [isEdit, setIsEdit] = useState(false)
const [editId, setEditId] = useState<number | null>(null)

// form modal
const [formAlamat, setFormAlamat] = useState<any>({
  nama_penerima: "",
  no_hp: "",
  kode_pos: "",
  alamat_lengkap: "",
  provinsi: "",
  kota_kab: "",
  kecamatan: "",
  is_default: false,
})

const handleProvinceModal = async (id: string) => {
  setProvModal(id)
  setCityModal("")
  setDistrictModal("")
  setCitiesModal([])
  setDistrictsModal([])

  const res = await getCities(Number(id))
  setCitiesModal(res)
}

const handleCityModal = async (id: string) => {
  setCityModal(id)
  setDistrictModal("")
  setDistrictsModal([])

  const res = await getDistricts(Number(id))
  setDistrictsModal(res)
}


  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    setMetode(params.get("metode") || "")
  }, [])

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
        setLoadingAlamat(true)

        const resAlamat = await getAlamatPembeli()
        setAlamatList(resAlamat)

        // auto pilih default
        const def = resAlamat.find((a: any) => a.is_default)
        setSelectedAlamat(def || resAlamat[0] || null)

        const resProv = await getProvinces()
        const dataProv = resProv?.data ?? resProv ?? []
        setProvinces(dataProv)

        setLoadingAlamat(false)
      }
    }

    init()
  }, [metode])

  // =========================
  const fetchCheckout = async (payload: any) => {
  setLoading(true)

  try {
    const res = await checkoutPage(payload)

    if (res.success) {
      setData(res.data)
    }

    return res // 🔥 WAJIB
  } finally {
    setLoading(false)
  }
}

  // =========================
const handleCekOngkir = async () => {

  if (!selectedAlamat) {
    toast.warning("Pilih alamat dulu!")
    return
  }

  if (!kurir) {
    toast.warning("Pilih kurir dulu!")
    return
  }

  try {
    setLoading(true)

    const res = await fetchCheckout({
      metode_pengiriman: "dikirim",
      kurir,

      nama_penerima: selectedAlamat.nama_penerima,
      no_hp: selectedAlamat.no_hp,
      kode_pos: selectedAlamat.kode_pos,
      alamat_lengkap: selectedAlamat.alamat_lengkap,

      provinsi: selectedAlamat.provinsi,
      kota_kab: selectedAlamat.kota_kab,
      kecamatan: selectedAlamat.kecamatan,
    })

    // ❗ kalau backend kirim success false
    if (!res.success) {
      toast.error(res.message || "Gagal cek ongkir")
      return
    }

    toast.success("Ongkir berhasil dihitung")

  } catch (err: any) {
    console.error(err)

    toast.error(
      err.message ||
      "Layanan ongkir sedang bermasalah, coba lagi nanti"
    )

  } finally {
    setLoading(false)
  }
}

  // =========================
  const handlePesan = async () => {

  let payload: any = {
    metode_pengiriman: metode,
  }

  if (metode === "dikirim") {

    if (!selectedAlamat) {
      toast.warning("Pilih alamat dulu!")
      return
    }

    if (!kurir) {
      toast.warning("Pilih kurir dulu!")
      return
    }

    payload = {
      ...payload,
      kurir,
      nama_penerima: selectedAlamat.nama_penerima,
      no_hp: selectedAlamat.no_hp,
      provinsi: selectedAlamat.provinsi,
      kota_kab: selectedAlamat.kota_kab,
      kecamatan: selectedAlamat.kecamatan,
      kode_pos: selectedAlamat.kode_pos,
      alamat_lengkap: selectedAlamat.alamat_lengkap,
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

  const handlePilihAlamat = (alamat: any) => {
  setSelectedAlamat(alamat)

  // sync ke state lama biar tidak rusak logic
  setNama(alamat.nama_penerima)
  setHp(alamat.no_hp)
  setKodePos(alamat.kode_pos)
  setAlamatLengkap(alamat.alamat_lengkap)
}

const handleDeleteAlamat = async (id: number) => {
  if (!confirm("Hapus alamat ini?")) return

  await deleteAlamatPembeli(id)
  toast.success("Alamat dihapus")

  const res = await getAlamatPembeli()
  setAlamatList(res)

  if (selectedAlamat?.id === id) {
    setSelectedAlamat(null)
  }
}

const handleChangeAlamat = (e: any) => {
  const { name, value } = e.target
  setFormAlamat((prev: any) => ({
    ...prev,
    [name]: value,
  }))
}

const handleSubmitAlamat = async () => {

  const prov = provinces.find((p: any) => p.id == provModal)
  const city = citiesModal.find((c: any) => c.id == cityModal)
  const dist = districtsModal.find((d: any) => d.id == districtModal)

  if (!prov || !city || !dist) {
    toast.warning("Lengkapi wilayah dulu!")
    return
  }

  try {
    if (isEdit && editId) {
      await updateAlamatPembeli(editId, {
        ...formAlamat,
        provinsi: prov.name,
        kota_kab: city.name,
        kecamatan: dist.name,
      })

      toast.success("Alamat berhasil diperbarui")
    } else {
      await createAlamatPembeli({
        ...formAlamat,
        provinsi: prov.name,
        kota_kab: city.name,
        kecamatan: dist.name,
      })

      toast.success("Alamat berhasil ditambahkan")
    }

    // reload
    const list = await getAlamatPembeli()
    setAlamatList(list)

    // reset mode
    setIsEdit(false)
    setEditId(null)
    setShowModal(false)

  } catch (err: any) {
    toast.error(err.message)
  }
}

const openTambahModal = () => {
  setIsEdit(false)
  setEditId(null)

  setFormAlamat({
    nama_penerima: "",
    no_hp: "",
    kode_pos: "",
    alamat_lengkap: "",
    provinsi: "",
    kota_kab: "",
    kecamatan: "",
    is_default: false,
  })

  setProvModal("")
  setCityModal("")
  setDistrictModal("")
  setCitiesModal([])
  setDistrictsModal([])

  setShowModal(true)
}

const closeModal = () => {
  setShowModal(false)
  setIsEdit(false)
  setEditId(null)

  setFormAlamat({
    nama_penerima: "",
    no_hp: "",
    kode_pos: "",
    alamat_lengkap: "",
    provinsi: "",
    kota_kab: "",
    kecamatan: "",
    is_default: false,
  })
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
                <p className="mb-2">{o.alamat}, Kecamatan {o.kecamatan}, {o.provinsi}, {o.kota_kab}</p>
                

                {o.lokasi_googlemap && (
                  <a
                    href={o.lokasi_googlemap}
                    target="_blank"
                    className="btn btn-outline-primary btn-sm"
                  >
                    📍 Lihat di Google Maps
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

          {loadingAlamat ? (
            <div className="text-center py-3">
              <div className="spinner-border text-primary"></div>
            </div>
          ) : alamatList.length === 0 ? (
            <div className="text-center py-3">
              <button
                className="btn btn-primary"
                onClick={openTambahModal}
              >
                + Tambah Alamat
              </button>
              <p className="text-muted small">Belum ada data alamat, tambahkan alamat terlebih dahulu untuk menghitung ongkir</p>
              
            </div>
          ) : (
            <>
              {alamatList.map((a: any) => (
                <div
                  key={a.id}
                  className={`border rounded p-3 mb-2 ${
                    selectedAlamat?.id === a.id
                      ? "border-primary bg-light"
                      : ""
                  }`}
                  style={{ cursor: "pointer" }}
                  onClick={() => handlePilihAlamat(a)}
                >
                  <div className="d-flex justify-content-between">
                    <div>
                      <strong>{a.nama_penerima}</strong> ({a.no_hp})
                    </div>
                    {a.is_default && (
                      <span className="badge bg-success">Utama</span>
                    )}
                  </div>

                  <p className="mb-2 small">
                    {a.alamat_lengkap}, {a.kecamatan}, {a.kota_kab}, {a.provinsi}, ID {a.kode_pos}
                  </p>

                  <div className="d-flex gap-2">
                    <button
                      className="btn btn-sm btn-outline-warning"
                     onClick={(e) => {
                      e.stopPropagation()

                      setIsEdit(true)
                      setEditId(a.id)
                      setShowModal(true)

                      // isi form
                      setFormAlamat({
                        nama_penerima: a.nama_penerima,
                        no_hp: a.no_hp,
                        kode_pos: a.kode_pos,
                        alamat_lengkap: a.alamat_lengkap,
                        provinsi: a.provinsi,
                        kota_kab: a.kota_kab,
                        kecamatan: a.kecamatan,
                        is_default: a.is_default,
                      })

                      // cari ID dari nama (karena yg disimpan name, bukan id)
                      const prov = provinces.find((p: any) => p.name === a.provinsi)
                      if (prov) {
                        setProvModal(prov.id.toString())

                        // load kota
                        getCities(prov.id).then((res) => {
                          setCitiesModal(res)

                          const city = res.find((c: any) => c.name === a.kota_kab)
                          if (city) {
                            setCityModal(city.id.toString())

                            // load kecamatan
                            getDistricts(city.id).then((resDist) => {
                              setDistrictsModal(resDist)

                              const dist = resDist.find((d: any) => d.name === a.kecamatan)
                              if (dist) {
                                setDistrictModal(dist.id.toString())
                              }
                            })
                          }
                        })
                      }
                    }}

                    >
                      Edit
                    </button>

                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleDeleteAlamat(a.id)
                      }}
                    >
                      Hapus
                    </button>
                  </div>
                </div>
              ))}

              <button
                className="btn btn-outline-primary w-100 mt-2"
                onClick={openTambahModal}
              >
                + Tambah Alamat Baru
              </button>

              {/* ================= ONGKIR ================= */}
              <div className="mt-3">

                <select className="form-control mb-2" onChange={(e) => setKurir(e.target.value)}>
                  <option value="">Pilih Kurir</option>
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
            </>
          )}
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

          {metode === "dikirim" && (
          <div className="d-flex justify-content-between">
            <span>Ongkir</span>
            <span>Rp {data.ongkir.toLocaleString()}</span>
          </div>
          )}

          {metode === "dikirim" && (
            <div className="d-flex justify-content-between">
              <span>Berat Total</span>
              <span>
                {data?.berat_total !== undefined
                  ? `${data.berat_total} gr`
                  : "-"}
              </span>
            </div>
          )}

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

      {showModal && (
  <div className="modal fade show d-block" style={{ background: "rgba(0,0,0,0.5)" }}>
    <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content rounded-4">

        <div className="modal-header">
          <h5 className="modal-title">
            {isEdit ? "Edit Alamat" : "Tambah Alamat"}
          </h5>
          <button className="btn-close" onClick={closeModal}></button>
        </div>

        <div className="modal-body">

          <input
            name="nama_penerima"
            placeholder="Nama Penerima"
            className="form-control mb-2"
            value={formAlamat.nama_penerima}
            onChange={handleChangeAlamat}
          />

          <input
            name="no_hp"
            placeholder="No HP"
            className="form-control mb-2"
            value={formAlamat.no_hp}
            onChange={handleChangeAlamat}
          />

          <input
            name="kode_pos"
            placeholder="Kode Pos"
            className="form-control mb-2"
            value={formAlamat.kode_pos}
            onChange={handleChangeAlamat}
          />

          <textarea
            name="alamat_lengkap"
            placeholder="Alamat Lengkap"
            className="form-control mb-2"
            value={formAlamat.alamat_lengkap}
            onChange={handleChangeAlamat}
          />

          {/* PROVINSI */}
          <select className="form-control mb-2" value={provModal} onChange={(e) => handleProvinceModal(e.target.value)}>
            <option value="">Pilih Provinsi</option>
            {provinces.map((p: any) => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>

          {/* KOTA */}
          <select className="form-control mb-2" value={cityModal} onChange={(e) => handleCityModal(e.target.value)}>
            <option value="">Pilih Kota</option>
            {citiesModal.map((c: any) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>

          {/* KECAMATAN */}
          <select className="form-control mb-2" value={districtModal} onChange={(e) => setDistrictModal(e.target.value)}>
            <option value="">Pilih Kecamatan</option>
            {districtsModal.map((d: any) => (
              <option key={d.id} value={d.id}>{d.name}</option>
            ))}
          </select>

          <div className="form-check mt-2">
            <input
              type="checkbox"
              className="form-check-input"
              checked={formAlamat.is_default}   // 🔥 INI WAJIB
              onChange={(e) =>
                setFormAlamat((prev: any) => ({
                  ...prev,
                  is_default: e.target.checked,
                }))
              }
            />
            <label className="form-check-label">
              Jadikan alamat utama
            </label>
          </div>

        </div>

        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={closeModal}>
            Batal
          </button>

          <button className="btn btn-primary" onClick={handleSubmitAlamat}>
            Simpan
          </button>
        </div>

      </div>
    </div>
  </div>
)}
    </div>
  )
}