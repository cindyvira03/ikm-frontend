"use client"

import { useEffect, useState } from "react"
import { getDashboardAdmin } from "@/services/adminService"

export default function AdminDashboard() {

  const [data, setData] = useState({
    jumlahIKM: 0,
    jumlahOutlet: 0,
    jumlahProduk: 0,
  })

  const [greeting, setGreeting] = useState("")
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {

    const fetchData = async () => {
      const res = await getDashboardAdmin()
      setData(res)
      setLoading(false)
    }

    fetchData()

    const hour = new Date().getHours()

    if (hour >= 5 && hour < 11) setGreeting("Selamat Pagi")
    else if (hour >= 11 && hour < 15) setGreeting("Selamat Siang")
    else if (hour >= 15 && hour < 18) setGreeting("Selamat Sore")
    else setGreeting("Selamat Malam")

    // ambil user dari localStorage
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }

  }, [])

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
          Anda sebagai admin
        </p>
      </div>

      <h5 className="container-fluid mt-4 fw-semibold mb-3">Overview</h5>

      <div className="row g-3">

        {/* IKM */}
        <div className="col-md-4">
          <div className="card border">
            <div className="card-body p-4 d-flex align-items-center gap-4">

              <div
                className="bg-primary text-white rounded-4 d-flex justify-content-center align-items-center"
                style={{ width: 80, height: 80 }}
              >
                <i className="bi bi-shop fs-1"></i>
              </div>

              <div>
                <h4 className="fw-semibold mb-0">
                  {data.jumlahIKM} IKM
                </h4>
                <p className="text-secondary mb-0">
                  Total IKM yang terdaftar
                </p>
              </div>

            </div>
          </div>
        </div>

        {/* Outlet */}
        <div className="col-md-4">
          <div className="card border">
            <div className="card-body p-4 d-flex align-items-center gap-4">

              <div
                className="bg-primary text-white rounded-4 d-flex justify-content-center align-items-center"
                style={{ width: 80, height: 80 }}
              >
                <i className="bi bi-building fs-1"></i>
              </div>

              <div>
                <h4 className="fw-semibold mb-0">
                  {data.jumlahOutlet} Outlet
                </h4>
                <p className="text-secondary mb-0">
                  Total Outlet yang terdaftar
                </p>
              </div>

            </div>
          </div>
        </div>

        {/* Produk */}
        <div className="col-md-4">
          <div className="card border">
            <div className="card-body p-4 d-flex align-items-center gap-4">

              <div
                className="bg-primary text-white rounded-4 d-flex justify-content-center align-items-center"
                style={{ width: 80, height: 80 }}
              >
                <i className="bi bi-box-seam fs-1"></i>
              </div>

              <div>
                <h4 className="fw-semibold mb-0">
                  {data.jumlahProduk} Produk
                </h4>
                <p className="text-secondary mb-0">
                  Total produk yang terdaftar
                </p>
              </div>

            </div>
          </div>
        </div>

      </div>

    </div>
  )
}