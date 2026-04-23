"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { getPesananPembeli, selesaiPesanan } from "@/services/pembeliService"
import { Pesanan } from "@/types/pesanan"

export default function PesananPage() {

  const router = useRouter()

  const [data, setData] = useState<Pesanan[]>([])
  const [loading, setLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState("")
  const [selected, setSelected] = useState<Pesanan | null>(null)

  // =========================
  const fetchData = async () => {
    setLoading(true)
    setData([])
    
    try {
      const res = await getPesananPembeli()
      let list = res.data || []

      if (statusFilter) {
        list = list.filter((item: Pesanan) => item.status_pesanan === statusFilter)
      }

      setData(list)

    } catch (err) {
      console.log(err)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchData()
  }, [statusFilter])

  // =========================
  const rupiah = (val: number) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(val)

  const badge = (status: string) => {
    switch (status) {
      case "pending": return "secondary"
      case "diproses": return "warning"
      case "dikirim": return "info"
      case "selesai": return "success"
      case "batal": return "danger"
      default: return "secondary"
    }
  }

  const badgeBayar = (status?: string) => {
    switch (status) {
      case "valid": return "success"
      case "pending": return "warning"
      case "ditolak": return "danger"
      default: return "secondary"
    }
  }

  // =========================
  const getNamaProduk = (item: Pesanan) => {
    if (!item.detail || item.detail.length === 0) return "-"

    const first = item.detail[0].produk.nama_produk
    const shortName = first.length > 20 ? first.substring(0, 20) + "..." : first

    if (item.detail.length > 1) {
      return `${shortName} (+${item.detail.length - 1} lainnya)`
    }

    return shortName
  }

  // =========================
  const handleSelesai = async (id: number) => {
    try {
      const confirm = window.confirm("Apakah pesanan sudah diterima?")
      if (!confirm) return

      await selesaiPesanan(id)

      alert("Pesanan selesai ✅")

      fetchData()

      const modal = document.getElementById("detailModal")
      const bsModal = (window as any).bootstrap.Modal.getInstance(modal)
      bsModal?.hide()

      setSelected(null)

    } catch (err: any) {
      alert(err.message)
    }
  }

  const handleHubungi = (phone: string) => {
  if (!phone) return alert("Nomor penjual tidak tersedia")

  // format ke 62
  let wa = phone.replace(/^0/, "62")

  const text = encodeURIComponent(
    `Halo, saya ingin bertanya terkait pesanan ${selected?.no_pesanan}`
  )

  window.open(`https://wa.me/${wa}?text=${text}`, "_blank")
}

  // =========================
  return (
    <div className="container py-4">

      <h4 className="mb-3 fw-semibold">Pesanan Saya</h4>

      {/* FILTER */}
      <div className="card mb-3 rounded-4">
        <div className="card-body">
          <div className="row">
            <div className="col-md-3">
              <select
                className="form-select"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="">Semua Status</option>
                <option value="pending">Pending</option>
                <option value="diproses">Diproses</option>
                <option value="dikirim">Dikirim</option>
                <option value="selesai">Selesai</option>
                <option value="batal">Batal</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* TABLE */}
      <div className="card rounded-4">
        <div className="card-body">
          <div className="table-responsive">
            <table className="table align-middle">
              <thead>
                <tr>
                  <th>No Pesanan</th>
                  <th>Tanggal</th>
                  <th>Produk</th>
                  <th>Total Bayar</th>
                  <th>Status Pesanan</th>
                  <th>Status Pembayaran</th>
                  <th>Detail</th>
                </tr>
              </thead>

              <tbody>

                {loading && (
                  <tr>
                    <td colSpan={7} className="text-center py-4">
                      <div className="spinner-border text-primary"></div>
                      <div className="mt-2">Memuat data...</div>
                    </td>
                  </tr>
                )}

                {!loading && data.length === 0 && (
                  <tr>
                    <td colSpan={6} className="text-center">
                      Tidak ada pesanan
                    </td>
                  </tr>
                )}

                {data.map((item) => (
                  <tr key={item.id}>
                    <td>{item.no_pesanan}</td>
                    <td>
                      {new Date(item.created_at).toLocaleString("id-ID", {
                        timeZone: "Asia/Jakarta",
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                    <td>{getNamaProduk(item)}</td>
                    <td>{rupiah(item.total_bayar)}</td>
                    <td>
                      <span className={`badge bg-${badge(item.status_pesanan)}`}>
                        {item.status_pesanan}
                      </span>
                    </td>
                    <td>
                      {!item.status_pembayaran ? (
                        <button
                          className="btn btn-sm btn-primary"
                          onClick={() => router.push(`/pembayaran/${item.id}`)}
                        >
                          Bayar
                        </button>
                      ) : (
                        <span className={`badge bg-${badgeBayar(item.status_pembayaran)}`}>
                          {item.status_pembayaran}
                        </span>
                      )}
                    </td>
                    <td>
                      <button
                        className="btn btn-sm btn-outline-primary"
                        data-bs-toggle="modal"
                        data-bs-target="#detailModal"
                        onClick={() => setSelected(item)}
                      >
                        Detail
                      </button>
                    </td>
                  </tr>
                ))}

              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ================= MODAL ================= */}
      <div className="modal fade" id="detailModal">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">

            <div className="modal-header">
              <h5>Detail Pesanan</h5>
              <button className="btn-close" data-bs-dismiss="modal"></button>
            </div>

            <div className="modal-body">
              {selected && (
                <>

                  <div className="row g-3">
                    <div className="col-md-6">
                      <strong>ID Pesanan</strong>
                      <div>{selected.no_pesanan}</div>
                    </div>
                    <div className="col-md-6">
                      <strong>Total Bayar</strong>
                      <div>{rupiah(selected.total_bayar)}</div>
                    </div>
                    <div className="col-md-6">
                      <strong>Metode Pengiriman</strong>
                      <div>
                        {selected.metode_pengiriman === "diambil"
                          ? "Ambil di Outlet"
                          : "Dikirim"}
                      </div>
                    </div>
                    <div className="col-md-6">
                      <strong>Status Pesanan</strong>
                      <div>
                        <span className={`badge bg-${badge(selected.status_pesanan)}`}>
                          {selected.status_pesanan}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* DETAIL PRODUK */}
                  <div className="mt-4">
                    <hr />
                    <h6>Detail Produk</h6>
                    <table className="table table-sm">
                      <thead>
                        <tr>
                          <th>Produk</th>
                          <th>Qty</th>
                          <th>Harga</th>
                          <th>Subtotal</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selected.detail?.map((d) => (
                          <tr key={d.id}>
                            <td>{d.produk.nama_produk}</td>
                            <td>{d.qty}</td>
                            <td>{rupiah(d.harga)}</td>
                            <td>{rupiah(d.qty * d.harga)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* PENGIRIMAN */}
                  {selected.metode_pengiriman === "dikirim" && (
                    <div className="mt-4">
                      <hr />
                      <div className="row g-3">

                        {selected.alamat && (
                          <div className="col-md-6">
                            <strong>Alamat Pengiriman</strong>
                            <div className="mt-2">
                              <div><b>{selected.alamat.nama_penerima}</b></div>
                              <div>{selected.alamat.no_hp}</div>
                              <div className="mt-1">{selected.alamat.alamat_lengkap}</div>
                              <div>{selected.alamat.kecamatan}, {selected.alamat.kota_kab}</div>
                              <div>{selected.alamat.provinsi} {selected.alamat.kode_pos}</div>
                            </div>
                          </div>
                        )}

                        {selected.pengiriman && (
                          <div className="col-md-6">
                            <strong>Detail Pengiriman</strong>
                            <div className="mt-2">
                              <div>Kurir: {selected.pengiriman.kurir}</div>
                              <div>Ongkir: {rupiah(selected.pengiriman.ongkir || 0)}</div>
                              <div>No Resi: {selected.pengiriman.no_resi || "-"}</div>
                            </div>
                          </div>
                        )}

                      </div>
                    </div>
                  )}

                  {/* AMBIL DI OUTLET */}
                  {selected.metode_pengiriman === "diambil" && selected.outlet && (
                    <div className="mt-4">
                      <hr />
                      <strong>Ambil di Outlet</strong>

                      <div className="mt-2">
                        <div>{selected.outlet.kecamatan}</div>
                        <div>{selected.outlet.kota_kab}</div>
                        <div>{selected.outlet.provinsi}</div>
                      </div>

                      {/* {selected.outlet.lokasi_googlemap && (
                        <div className="mt-3">
                          <a
                            href={selected.outlet.lokasi_googlemap}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-sm btn-outline-primary"
                          >
                            📍 Lihat di Google Maps
                          </a>
                        </div>
                      )} */}
                    </div>
                  )}

                  {/* {selected?.ikm?.no_telp && (
                    <button
                      className="btn btn-outline-success"
                      onClick={() => handleHubungi(selected?.ikm?.no_telp || "")}
                    >
                      <i className="bi bi-whatsapp me-2"></i> Hubungi Penjual
                    </button>
                  )} */}

                  <div className="mt-4 text-center">

                    <div className="d-flex justify-content-center gap-2 flex-wrap">

                      {/* 📍 BUTTON LOKASI (HANYA DIAMBIL) */}
                      {selected.metode_pengiriman === "diambil" && selected.outlet?.lokasi_googlemap && (
                        <a
                          href={selected.outlet.lokasi_googlemap}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-outline-primary"
                        >
                          📍 Lihat Lokasi
                        </a>
                      )}

                      {/* 💬 BUTTON WA */}
                      {selected?.ikm?.no_telp && (
                        <button
                          className="btn btn-outline-success"
                          onClick={() => handleHubungi(selected?.ikm?.no_telp || "")}
                        >
                          <i className="bi bi-whatsapp me-2"></i> Hubungi Penjual
                        </button>
                      )}

                    </div>

                  </div>

                  {/* 🔥 PINDAH KE PALING BAWAH */}
                  {(selected.status_pesanan === "dikirim" ||
                    (selected.metode_pengiriman === "diambil" && selected.status_pesanan === "diproses")
                    ) && (
                    <div className="mt-4 pt-3 border-top text-center">
                      <div className="mb-2 fw-semibold">
                        Apakah pesanan sudah diterima?
                      </div>

                      <button
                        className="btn btn-success"
                        onClick={() => handleSelesai(selected.id)}
                      >
                        Ya, Sudah Diterima
                      </button>
                    </div>
                  )}

                </>
              )}
            </div>

          </div>
        </div>
      </div>

    </div>
  )
}