"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"

export default function AdminNavbar() {
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
    if (path === "/admin") return pathname === "/admin"
    return pathname === path || pathname.startsWith(path + "/")
  }

  return (
    <>
      <nav className="navbar navbar-expand-md navbar-light bg-white py-3 border-bottom">
        <div className="container-fluid">

          {/* BRAND */}
          <Link
            className="navbar-brand fw-semibold d-flex align-items-center gap-2"
            href="/admin"
          >
            <span className="mb-0 fs-5">
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
                <Link className={`nav-link ${isActive("/admin") ? "active" : ""}`} href="/admin">
                  <i className="bi bi-house me-1"></i> Dashboard
                </Link>
              </li>

              <li className="nav-item">
                <Link className={`nav-link ${isActive("/admin/kategori") ? "active" : ""}`} href="/admin/kategori">
                  <i className="bi bi-list me-1"></i> Kategori
                </Link>
              </li>

              <li className="nav-item dropdown">
                <button
                  className={`nav-link dropdown-toggle btn btn-link ${
                    isActive("/admin/kategori-artikel") || isActive("/admin/artikel") ? "active" : ""
                  }`}
                  data-bs-toggle="dropdown"
                >
                  <i className="bi bi-journal-text me-1"></i> Artikel
                </button>

                <div className="dropdown-menu">
                  <Link
                    className="dropdown-item"
                    href="/admin/kategori-artikel"
                  >
                    Kategori Artikel
                  </Link>

                  <Link
                    className="dropdown-item"
                    href="/admin/artikel"
                  >
                    Artikel
                  </Link>
                </div>
              </li>

              <li className="nav-item">
                <Link className={`nav-link ${isActive("/admin/profil-ikm") ? "active" : ""}`} href="/admin/profil-ikm">
                  <i className="bi bi-briefcase me-1"></i> Profil IKM
                </Link>
              </li>

              <li className="nav-item">
                <Link className={`nav-link ${isActive("/admin/seo") ? "active" : ""}`} href="/admin/seo">
                  <i className="bi bi-gear me-1"></i> SEO Settings
                </Link>
              </li>

              {/* <li className="nav-item dropdown">
                <button
                  className={`nav-link dropdown-toggle btn btn-link ${
                    isActive("/admin/seo") || isActive("/admin/cms") ? "active" : ""
                  }`}
                  data-bs-toggle="dropdown"
                >
                  <i className="bi bi-gear me-1"></i> CMS
                </button>

                <div className="dropdown-menu">

                  <Link
                    className="dropdown-item"
                    href="/admin/cms"
                  >
                    Konten Halaman
                  </Link>

                  <Link
                    className="dropdown-item"
                    href="/admin/seo"
                  >
                    Pengaturan SEO
                  </Link>

                </div>
              </li> */}

            </ul>

            {/* RIGHT */}
            <ul className="navbar-nav ms-auto">
              <li className="nav-item dropdown">
                <button className="nav-link dropdown-toggle btn btn-link" data-bs-toggle="dropdown">
                  {user?.name || "Admin"}
                </button>

                <div className="dropdown-menu dropdown-menu-end">
                  <button className="dropdown-item" onClick={handleLogout}>
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
          <strong>Menu Admin</strong>
          <button onClick={() => setIsOpen(false)} className="btn btn-sm">✕</button>
        </div>

        <ul className="nav flex-column gap-2">

          <Link href="/admin" className="nav-link" onClick={() => setIsOpen(false)}>Dashboard</Link>
          <Link href="/admin/kategori" className="nav-link" onClick={() => setIsOpen(false)}>Kategori</Link>
          <div className="mt-2">
            <div className="fw-semibold text-muted small">Artikel</div>

            <Link
              href="/admin/kategori-artikel"
              className="nav-link ps-3"
              onClick={() => setIsOpen(false)}
            >
              Kategori Artikel
            </Link>

            <Link
              href="/admin/artikel"
              className="nav-link ps-3"
              onClick={() => setIsOpen(false)}
            >
              Artikel
            </Link>
          </div>
          <Link href="/admin/profil-ikm" className="nav-link" onClick={() => setIsOpen(false)}>Profil IKM</Link>
          {/* <Link href="/admin/cms" className="nav-link" onClick={() => setIsOpen(false)}>
            CMS - Konten Halaman
          </Link> */}

          <Link href="/admin/seo" className="nav-link" onClick={() => setIsOpen(false)}>
            SEO Settings
          </Link>

          <hr />

          <div className="fw-semibold">{user?.name || "Admin"}</div>
          <button className="btn btn-danger mt-2" onClick={handleLogout}>
            Logout
          </button>

        </ul>
      </div>
    </>
  )
}