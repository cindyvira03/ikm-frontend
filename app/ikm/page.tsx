"use client"

import { useEffect, useState } from "react"
import { getDashboardIkm } from "@/services/ikmService"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts"

export default function IkmDashboard() {

  const today = new Date()

  const [data, setData] = useState<any>(null)
  const [user, setUser] = useState<any>(null)
  const [greeting, setGreeting] = useState("")
  const [loading, setLoading] = useState(true)

  const [bulan, setBulan] = useState(today.getMonth() + 1)
  const [tahun, setTahun] = useState(today.getFullYear())

  useEffect(() => {

    const fetchData = async () => {
      const res = await getDashboardIkm(bulan, tahun)
      setData(res)
      setLoading(false)
    }
    
    fetchData()

  }, [bulan, tahun])

  useEffect(() => {

    const hour = new Date().getHours()

    if (hour >= 5 && hour < 11) setGreeting("Selamat Pagi")
    else if (hour >= 11 && hour < 15) setGreeting("Selamat Siang")
    else if (hour >= 15 && hour < 18) setGreeting("Selamat Sore")
    else setGreeting("Selamat Malam")

    const storedUser = localStorage.getItem("user")
    if (storedUser) setUser(JSON.parse(storedUser))

  }, [])

  const formatRupiah = (angka: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0
  }).format(angka || 0)
}

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "60vh" }}>
        <div className="text-center">
          <div className="spinner-border text-primary"></div>
          <div className="mt-2">Memuat dashboard...</div>
        </div>
      </div>
    )
  }

  return (
    <div>

      {/* Greeting */}
      <div className="container-fluid mt-4 mb-4">
        <h2 className="fw-semibold">
          {greeting}, {user?.name} 👋
        </h2>
        <p className="text-secondary mb-0">
          Berikut ringkasan usaha Anda
        </p>
      </div>

      {/* ROW 1 */}
      <div className="row g-3 mb-4">

        {/* Produk */}
        <div className="col-md-4">
          <div className="card border h-100">
            <div className="card-body d-flex align-items-center gap-3">

              <div className="bg-primary text-white rounded-4 d-flex justify-content-center align-items-center"
                style={{ width: 70, height: 70 }}>
                <i className="bi bi-box-seam fs-3"></i>
              </div>

              <div>
                <h4 className="fw-semibold mb-0">{data?.totalProduk ?? 0}</h4>
                <p className="text-secondary mb-0">Total Produk</p>
              </div>

            </div>
          </div>
        </div>

        {/* Outlet */}
        <div className="col-md-4">
          <div className="card border h-100">
            <div className="card-body d-flex align-items-center gap-3">

              <div className="bg-success text-white rounded-4 d-flex justify-content-center align-items-center"
                style={{ width: 70, height: 70 }}>
                <i className="bi bi-shop fs-3"></i>
              </div>

              <div>
                <h6 className="fw-semibold mb-1">
                  Status Outlet
                </h6>

                <p className="text-secondary mb-0">
                  {data?.hasOutlet ?  (
                  <span className="text-success small">
                      <i className="bi bi-check-circle me-1"></i>
                      Sudah tersedia
                  </span>
                  ) : (
                  <span className="text-warning small">
                      <i className="bi bi-exclamation-triangle me-1"></i>
                      Belum tersedia, tambahkan outlet sekarang!
                  </span>
                  )}
                </p>

              </div>

            </div>
          </div>
        </div>

        {/* Profil */}
        <div className="col-md-4">
          <div className="card border h-100">
            <div className="card-body">

              <h6 className="fw-semibold mb-2">Status Profil</h6>

              <div className="progress mb-2">
                <div
                  className="progress-bar"
                  style={{ width: `${data?.profilProgress ?? 0}%` }}
                />
              </div>

              {data?.profilLengkap ? (
                <span className="text-success small">
                    <i className="bi bi-check-circle me-1"></i>
                    Profil sudah lengkap
                </span>
                ) : (
                <span className="text-warning small">
                    <i className="bi bi-exclamation-triangle me-1"></i>
                    Profil belum lengkap! Segera lengkapi profil Anda
                </span>
                )}

            </div>
          </div>
        </div>

      </div>

      {/* ROW 2 */}
      <div className="row g-3 mb-4">

        {/* Pesanan Hari Ini */}
        <div className="col-md-4">
          <div className="card border h-100">
            <div className="card-body d-flex align-items-center gap-3">

              <div className="bg-warning text-white rounded-4 d-flex justify-content-center align-items-center"
                style={{ width: 70, height: 70 }}>
                <i className="bi bi-receipt fs-3"></i>
              </div>

              <div>
                <h4 className="fw-semibold mb-0">{data?.pesananHariIni ?? 0}</h4>
                <p className="text-secondary mb-0">Pesanan Hari Ini</p>
              </div>

            </div>
          </div>
        </div>

        {/* Pending */}
        <div className="col-md-4">
          <div className="card border h-100">
            <div className="card-body d-flex align-items-center gap-3">

              <div className="bg-danger text-white rounded-4 d-flex justify-content-center align-items-center"
                style={{ width: 70, height: 70 }}>
                <i className="bi bi-clock-history fs-3"></i>
              </div>

              <div>
                <h4 className="fw-semibold mb-0">{data?.pesananPending ?? 0}</h4>
                <p className="text-secondary mb-0">Pesanan Pending</p>
              </div>

            </div>
          </div>
        </div>

        {/* Terjual */}
        <div className="col-md-4">
          <div className="card border h-100">
            <div className="card-body d-flex align-items-center gap-3">

              <div className="bg-info text-white rounded-4 d-flex justify-content-center align-items-center"
                style={{ width: 70, height: 70 }}>
                <i className="bi bi-trophy fs-3"></i>
              </div>

              <div>
                <small className="text-secondary">
                    Produk Terlaris
                </small>
                <h6 className="fw-semibold mb-1">
                    {data?.produkTerlaris?.produk?.nama_produk ?? "Belum ada penjualan"}
                </h6>

                <p className="text-secondary mb-0">
                    Terjual {data?.produkTerlaris?.total_terjual ?? 0} kali
                </p>
              </div>

            </div>
          </div>
        </div>

      </div>

      {/* ROW 3 CHART */}
      <div className="card border">

        <div className="card-body">

          {/* Filter */}
          <div className="d-flex justify-content-between align-items-center mb-3">

            <h5 className="fw-semibold mb-0">
              Grafik Omset
            </h5>

            <small className="text-secondary">
                Total Omset Bulan Ini: <strong>{formatRupiah(data?.omsetBulan)}</strong>
            </small>

            <div className="d-flex gap-2">

              <select
                className="form-select"
                value={bulan}
                onChange={(e) => setBulan(Number(e.target.value))}
              >
                {[
                  "Januari","Februari","Maret","April","Mei","Juni",
                  "Juli","Agustus","September","Oktober","November","Desember"
                ].map((b, i) => (
                  <option key={i} value={i + 1}>
                    {b}
                  </option>
                ))}
              </select>

              <select
                className="form-select"
                value={tahun}
                onChange={(e) => setTahun(Number(e.target.value))}
              >
                {[2024,2025,2026,2027].map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>

            </div>

          </div>

          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data?.grafikOmset ?? []}>

              <XAxis
                dataKey="tanggal"
                tickFormatter={(v) => v?.slice(-2)}
              />

              <YAxis />

              <Tooltip />

              <Line
                type="monotone"
                dataKey="omset"
                stroke="#0d6efd"
                strokeWidth={3}
              />

            </LineChart>
          </ResponsiveContainer>

        </div>

      </div>

    </div>
  )
}