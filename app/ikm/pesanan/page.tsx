"use client"

import { useEffect, useState } from "react"
import { getPesanan, kirimPesanan, validasiPembayaran } from "@/services/ikmService"
import { Pesanan } from "@/types/pesanan"
import { toast } from "react-toastify"

export default function PesananPage() {
  const [pesanan, setPesanan] = useState<Pesanan[]>([])
  const [loadingTable, setLoadingTable] = useState(true)
  const [statusFilter, setStatusFilter] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [meta, setMeta] = useState<any>(null)
  const [selectedPesanan, setSelectedPesanan] = useState<Pesanan | null>(null)
  const [noResi, setNoResi] = useState("")
  const [keterangan, setKeterangan] = useState("")
  const [activeTab, setActiveTab] = useState("umum")

  const fetchData = async (page = 1) => {
    try {
      setLoadingTable(true)
      setPesanan([])
      const res = await getPesanan(page, statusFilter)
      setPesanan(res.data)
      setMeta(res.meta)
      setCurrentPage(page)
    } catch (err) {
      console.error(err)
    } finally {
      setLoadingTable(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [statusFilter])

  function formatRupiah(angka: number) {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(angka)
  }

  function statusBadge(status: string) {
    switch (status) {
      case "pending":
        return "secondary"
      case "diproses":
        return "warning"
      case "dikirim":
        return "info"
      case "selesai":
        return "success"
      case "batal":
        return "danger"
      default:
        return "secondary"
    }
  }

  return (
    <div className="container-fluid mt-4 py-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="fw-semibold mb-0">Riwayat Pesanan Masuk</h4>
      </div>

      {/* FILTER */}
      <div className="card border rounded-4 mb-3">
        <div className="card-body">
          <div className="row">
            <div className="col-md-3">
              <label className="form-label">Filter Status Pesanan</label>
              <select
                className="form-select"
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value)
                  setCurrentPage(1)
                }}
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
      <div className="card border rounded-4">
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-striped align-middle">
              <thead>
                <tr>
                  <th>No Pesanan</th>
                  <th>Tanggal</th>
                  <th>Pembeli</th>
                  <th>Total Bayar</th>
                  <th>Metode Pengiriman</th>
                  <th>Status</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {loadingTable && (
                  <tr>
                    <td colSpan={7} className="text-center">
                      <div className="spinner-border text-primary"></div>
                      <div className="mt-2">Memuat data...</div>
                    </td>
                  </tr>
                )}

                {pesanan.map((item) => (
                  <tr key={item.id}>
                    <td>{item.no_pesanan}</td>
                    {/* ✅ TAMBAHAN TANGGAL */}
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
                    <td>{item.pembeli?.nama_lengkap}</td>
                    <td>{formatRupiah(item.total_bayar)}</td>
                    <td>{item.metode_pengiriman === "diambil" ? "Ambil di Outlet" : "Dikirim"}</td>
                    <td>
                      <span className={`badge bg-${statusBadge(item.status_pesanan)}`}>
                        {item.status_pesanan}
                      </span>
                    </td>
                    <td>
                      <button
                        className="btn btn-sm btn-outline-primary"
                        data-bs-toggle="modal"
                        data-bs-target="#detailPesananModal"
                        onClick={() => {
                          setSelectedPesanan(item)
                          setActiveTab("umum")
                        }}
                      >
                        <i className="bi bi-eye"></i> Detail
                      </button>
                    </td>
                  </tr>
                ))}

                {!loadingTable && pesanan.length === 0 && (
                  <tr>
                    <td colSpan={6} className="text-center">
                      Tidak ada pesanan
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* PAGINATION */}
          {meta && meta.last_page > 1 && (
            <nav className="mt-3">
              <ul className="pagination justify-content-center">
                <li className={`page-item ${!meta.prev_page_url ? "disabled" : ""}`}>
                  <button className="page-link" onClick={() => fetchData(currentPage - 1)}>
                    Previous
                  </button>
                </li>
                <li className="page-item disabled">
                  <span className="page-link">
                    {meta.current_page} / {meta.last_page}
                  </span>
                </li>
                <li className={`page-item ${!meta.next_page_url ? "disabled" : ""}`}>
                  <button className="page-link" onClick={() => fetchData(currentPage + 1)}>
                    Next
                  </button>
                </li>
              </ul>
            </nav>
          )}
        </div>
      </div>

      {/* MODAL DETAIL PESANAN DENGAN TAB */}
      <div className="modal fade" id="detailPesananModal">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Detail Pesanan</h5>
              <button className="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div className="modal-body">
              {selectedPesanan && (
                <>
                  {/* NAV TABS */}
                  <ul className="nav nav-tabs mb-3">
                    <li className="nav-item">
                      <button
                        className={`nav-link ${activeTab === "umum" ? "active" : ""}`}
                        onClick={() => setActiveTab("umum")}
                      >
                        Informasi Pesanan
                      </button>
                    </li>
                    <li className="nav-item">
                      <button
                        className={`nav-link ${activeTab === "pembayaran" ? "active" : ""}`}
                        onClick={() => setActiveTab("pembayaran")}
                      >
                        Pembayaran & Pengiriman
                      </button>
                    </li>
                  </ul>

                  {/* TAB CONTENT */}
                  {activeTab === "umum" && (
                    <>
                      <div className="row g-3">
                        <div className="col-md-6">
                          <strong>No Pesanan</strong>
                          <div>{selectedPesanan.no_pesanan}</div>
                        </div>
                        <div className="col-md-6">
                          <strong>Nama Pembeli</strong>
                          <div>{selectedPesanan.pembeli?.nama_lengkap}</div>
                        </div>
                        <div className="col-md-6">
                          <strong>Total Bayar</strong>
                          <div>{formatRupiah(selectedPesanan.total_bayar)}</div>
                        </div>
                        <div className="col-md-6">
                          <strong>Metode Pengiriman</strong>
                          <div>
                            {selectedPesanan.metode_pengiriman === "diambil"
                              ? "Ambil di Outlet"
                              : "Dikirim"}
                          </div>
                        </div>
                        <div className="col-md-6">
                          <strong>Status Pesanan</strong>
                          <div>
                            <span className={`badge bg-${statusBadge(selectedPesanan.status_pesanan)}`}>
                              {selectedPesanan.status_pesanan}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* 🔽 TAMBAHAN: DETAIL PRODUK */}
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
                            {selectedPesanan.detail?.map((item) => (
                              <tr key={item.id}>
                                <td>{item.produk?.nama_produk}</td>
                                <td>{item.qty}</td>
                                <td>{formatRupiah(item.harga)}</td>
                                <td>{formatRupiah(item.qty * item.harga)}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </>
                  )}

                  {activeTab === "pembayaran" && (
                    <>
                      {/* Status Pembayaran */}
                      <div className="mb-3">
                        <strong>Status Pembayaran</strong>
                        <div>
                          <span
                            className={`badge bg-${
                              statusBadge(selectedPesanan.pembayaran?.status_pembayaran ?? "pending")
                            }`}
                          >
                            {selectedPesanan.pembayaran?.status_pembayaran ?? "Pembeli Belum Melakukan Pembayaran"}
                          </span>
                          {selectedPesanan.pembayaran?.status_pembayaran === "ditolak" &&
                            selectedPesanan.pembayaran?.keterangan && (
                              <div className="mt-2 text-danger small">
                                <i className="bi bi-exclamation-circle me-1"></i>
                                {selectedPesanan.pembayaran.keterangan}
                              </div>
                          )}
                        </div>
                      </div>

                      {/* Bukti Transfer */}
                      {selectedPesanan.pembayaran?.bukti_transfer_url && (
                        <div className="mb-3">
                          <strong>Bukti Transfer</strong>
                          <div className="mt-2">
                            <img
                              src={selectedPesanan.pembayaran.bukti_transfer_url}
                              alt="Bukti Transfer"
                              className="img-fluid rounded"
                              style={{ maxHeight: 300 }}
                            />
                          </div>
                        </div>
                      )}

                      {/* Tombol Validasi */}
                      {selectedPesanan.pembayaran?.status_pembayaran === "pending" && (
                        <div className="mt-3">
                          <button
                            className="btn btn-success btn-sm me-2"
                            onClick={async () => {
                              try {
                                if (selectedPesanan.pembayaran) {
                                  await validasiPembayaran(selectedPesanan.pembayaran.id, {
                                    status_pembayaran: "valid",
                                  })
                                  toast.success("Pembayaran divalidasi")
                                  fetchData(currentPage)

                                   // 🔽 tutup modal
                                    const modal = document.getElementById("detailPesananModal")
                                    const bsModal = (window as any).bootstrap.Modal.getInstance(modal)
                                    bsModal?.hide()

                                    // 🔽 reset state
                                    setSelectedPesanan(null)
                                    setKeterangan("")
                                }
                              } catch (err: any) {
                                toast.error(err.message || "Terjadi kesalahan")
                              }
                            }}
                          >
                            Valid
                          </button>

                          <button
                            className="btn btn-danger btn-sm"
                            onClick={async () => {
                              if (!keterangan) {
                                toast.warning("Keterangan wajib diisi jika pembayaran ditolak")
                                return
                              }

                              try {
                                if (selectedPesanan.pembayaran) {
                                  await validasiPembayaran(selectedPesanan.pembayaran.id, {
                                    status_pembayaran: "ditolak",
                                    keterangan,
                                  })
                                  toast.success("Pembayaran berhasil ditolak")
                                  fetchData(currentPage)

                                   // 🔽 tutup modal
                                    const modal = document.getElementById("detailPesananModal")
                                    const bsModal = (window as any).bootstrap.Modal.getInstance(modal)
                                    bsModal?.hide()

                                    // 🔽 reset state
                                    setSelectedPesanan(null)
                                    setKeterangan("")
                                }
                              } catch (err: any) {
                                toast.error(err.message || "Terjadi kesalahan")
                              }
                            }}
                          >
                            Tolak
                          </button>

                          <input
                            type="text"
                            className="form-control mt-2"
                            placeholder="Keterangan jika ditolak"
                            value={keterangan}
                            onChange={(e) => setKeterangan(e.target.value)}
                          />
                        </div>
                      )}

                      {/* Pengiriman */}
                      {selectedPesanan.metode_pengiriman === "dikirim" && (
                        <div className="mt-4">
                          <hr />

                          {/* 📍 Alamat */}
                          {selectedPesanan.alamat && (
                            <div className="mb-3">
                              <strong>Alamat Pengiriman</strong>
                              <div>{selectedPesanan.alamat.nama_penerima}</div>
                              <div>{selectedPesanan.alamat.no_hp}</div>
                              <div>
                                {selectedPesanan.alamat.alamat_lengkap},{" "}
                                {selectedPesanan.alamat.kecamatan},{" "}
                                {selectedPesanan.alamat.kota_kab},{" "}
                                {selectedPesanan.alamat.provinsi}{" "}
                                {selectedPesanan.alamat.kode_pos}
                              </div>
                            </div>
                          )}

                          {/* 🚚 Info Kurir */}
                          {selectedPesanan.pengiriman && (
                            <div className="mb-3">
                              <strong>Detail Pengiriman</strong>
                              <div>Kurir: {selectedPesanan.pengiriman.kurir}</div>
                              <div>
                                Ongkir:{" "}
                                {new Intl.NumberFormat("id-ID", {
                                  style: "currency",
                                  currency: "IDR",
                                }).format(selectedPesanan.pengiriman.ongkir ?? 0)}
                              </div>
                              <div>No Resi: {selectedPesanan.pengiriman.no_resi ?? "-"}</div>
                            </div>
                          )}

                          {/* ✍️ Input Resi (hanya saat diproses) */}
                          {selectedPesanan.status_pesanan === "diproses" && (
                            <>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Masukkan nomor resi"
                                value={noResi}
                                onChange={(e) => setNoResi(e.target.value)}
                              />
                              <button
                                className="btn btn-primary btn-sm mt-2"
                                onClick={async () => {
                                  try {
                                    if (!noResi) {
                                      toast.warning("Nomor resi wajib diisi")
                                      return
                                    }

                                    await kirimPesanan(selectedPesanan.id, noResi)

                                    toast.success("Pesanan berhasil dikirim")

                                    // refresh table
                                    await fetchData(currentPage)

                                    // update state biar langsung berubah TANPA reload
                                    setSelectedPesanan((prev) =>
                                      prev
                                        ? {
                                            ...prev,
                                            status_pesanan: "dikirim",
                                            pengiriman: {
                                              ...prev.pengiriman,
                                              no_resi: noResi,
                                            },
                                          }
                                        : prev
                                    )

                                    // reset input
                                    setNoResi("")
                                  } catch (err: any) {
                                    toast.error(err.message || "Terjadi kesalahan")
                                  }
                                }}
                              >
                                Kirim Pesanan
                              </button>
                            </>
                          )}
                        </div>
                      )}
                    </>
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