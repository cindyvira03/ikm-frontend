"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"

export default function IkmNavbar() {
  const router = useRouter()
  const pathname = usePathname()

  const [user, setUser] = useState<any>(null)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const storedUser = localStorage.getItem("user")

    if (!storedUser) {
      router.push("/login")
      return
    }

    setUser(JSON.parse(storedUser))
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    setIsOpen(false)
    router.push("/")
  }

  const isActive = (path: string) => {
    if (path === "/ikm") return pathname === "/ikm"
    return pathname.startsWith(path)
  }

  return (
    <>
      <nav className="navbar navbar-expand-md navbar-light bg-white py-3 border-bottom">
        <div className="container-fluid">

          {/* BRAND */}
          <Link className="navbar-brand fw-semibold d-flex align-items-center gap-2" href="/ikm">
            <span className="fs-5">
              {process.env.NEXT_PUBLIC_APP_NAME || "Jelajah Probolinggo"}
            </span>
          </Link>

          {/* TOGGLER */}
          <button
            className="navbar-toggler"
            onClick={() => setIsOpen(true)}
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* DESKTOP MENU */}
          <div className="navbar-collapse d-none d-md-flex align-items-center justify-content-between w-100">

            {/* LEFT */}
            <ul className="navbar-nav me-auto ms-0 ms-md-5 gap-2">

              <li className="nav-item">
                <Link className={`nav-link ${isActive("/ikm") ? "active" : ""}`} href="/ikm">
                  <i className="bi bi-house me-1"></i> Dashboard
                </Link>
              </li>

              <li className="nav-item">
                <Link className={`nav-link ${isActive("/ikm/pesanan") ? "active" : ""}`} href="/ikm/pesanan">
                  <i className="bi bi-receipt me-1"></i> Pesanan
                </Link>
              </li>

              <li className="nav-item">
                <Link className={`nav-link ${isActive("/ikm/produk") ? "active" : ""}`} href="/ikm/produk">
                  <i className="bi bi-box-seam me-1"></i> Produk
                </Link>
              </li>

              <li className="nav-item">
                <Link className={`nav-link ${isActive("/ikm/outlet") ? "active" : ""}`} href="/ikm/outlet">
                  <i className="bi bi-shop me-1"></i> Outlet
                </Link>
              </li>

              <li className="nav-item">
                <Link className={`nav-link ${isActive("/ikm/profil") ? "active" : ""}`} href="/ikm/profil">
                  <i className="bi bi-person-circle me-1"></i> Profil
                </Link>
              </li>

            </ul>

            {/* RIGHT */}
            <ul className="navbar-nav ms-auto">
              <li className="nav-item dropdown">
                <button className="nav-link dropdown-toggle btn btn-link" data-bs-toggle="dropdown">
                  {user?.name || "IKM"}
                </button>

                <div className="dropdown-menu dropdown-menu-end">
                  <button className="dropdown-item text-danger" onClick={handleLogout}>
                    Logout
                  </button>
                </div>
              </li>
            </ul>

          </div>
        </div>
      </nav>

      {/* ================= MOBILE SIDEBAR ================= */}

      {/* OVERLAY */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.4)",
            zIndex: 998,
          }}
        />
      )}

      {/* SIDEBAR */}
      <div
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          height: "100vh",
          width: "260px",
          background: "white",
          zIndex: 999,
          transform: isOpen ? "translateX(0)" : "translateX(100%)",
          transition: "0.3s ease",
          padding: "20px",
        }}
      >
        {/* HEADER */}
        <div className="d-flex justify-content-between mb-3">
          <strong>Menu IKM</strong>
          <button onClick={() => setIsOpen(false)} className="btn btn-sm">✕</button>
        </div>

        <ul className="nav flex-column gap-2">

          <Link href="/ikm" className="nav-link" onClick={() => setIsOpen(false)}>Dashboard</Link>
          <Link href="/ikm/pesanan" className="nav-link" onClick={() => setIsOpen(false)}>Pesanan</Link>
          <Link href="/ikm/produk" className="nav-link" onClick={() => setIsOpen(false)}>Produk</Link>
          <Link href="/ikm/outlet" className="nav-link" onClick={() => setIsOpen(false)}>Outlet</Link>
          <Link href="/ikm/profil" className="nav-link" onClick={() => setIsOpen(false)}>Profil</Link>

          <hr />

          <div className="fw-semibold">{user?.name || "IKM"}</div>
          <button className="btn btn-danger mt-2" onClick={handleLogout}>
            Logout
          </button>

        </ul>
      </div>
    </>
  )
}