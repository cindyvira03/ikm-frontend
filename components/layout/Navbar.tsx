"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { FaShoppingCart } from "react-icons/fa"
import { useCartStore } from "@/stores/cartStore"

type User = {
  id: number
  name: string
  role: string
}

export default function Navbar() {
  const pathname = usePathname()
  const router = useRouter()

  const [user, setUser] = useState<User | null>(null)
  const [isOpen, setIsOpen] = useState(false)

  const { cartCount, fetchCart } = useCartStore()

  const isActive = (path: string) => {
    if (path === "/") return pathname === "/"
    return pathname.startsWith(path)
  }

  useEffect(() => {
    const checkUser = async () => {
      const token = localStorage.getItem("token")

      if (!token) {
        setUser(null)
        return
      }

      try {
        const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

        const res = await fetch(`${BASE_URL}/user`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          localStorage.clear()
          setUser(null)
          return
        }

        const data = await res.json()

        if (data.role === "pembeli") {
          setUser(data)
          await fetchCart()
        } else {
          setUser(null)
        }
      } catch {
        setUser(null)
      }
    }

    checkUser()
  }, [])

  const handleLogout = () => {
    localStorage.clear()
    setUser(null)
    setIsOpen(false)
    router.push("/")
  }

  return (
    <>
      <nav className="navbar navbar-expand-md navbar-light bg-white py-3 border-bottom">
        <div className="container-fluid">

          {/* LOGO */}
          <Link className="navbar-brand fw-semibold" href="/">
            {process.env.NEXT_PUBLIC_APP_NAME || "Jelajah Probolinggo"}
          </Link>

          {/* TOGGLER */}
          <button
            className="navbar-toggler"
            onClick={() => setIsOpen(true)}
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* DESKTOP MENU */}
          <div className="navbar-collapse d-none d-md-flex">

            {/* LEFT */}
            <ul className="navbar-nav mx-auto gap-2">
              <li className="nav-item">
                <Link className={`nav-link ${isActive("/") ? "active" : ""}`} href="/">
                  Beranda
                </Link>
              </li>

              <li className="nav-item">
                <Link className={`nav-link ${isActive("/rumah-batik") ? "active" : ""}`} href="/rumah-batik">
                  Rumah Sentra Batik
                </Link>
              </li>

              <li className="nav-item">
                <Link className={`nav-link ${isActive("/produk-ikm") ? "active" : ""}`} href="/produk-ikm">
                  Produk IKM
                </Link>
              </li>

              <li className="nav-item">
                <Link className={`nav-link ${isActive("/outlet-ikm") ? "active" : ""}`} href="/outlet-ikm">
                  Outlet IKM
                </Link>
              </li>

              <li className="nav-item">
                <Link className={`nav-link ${isActive("/profil-ikm") ? "active" : ""}`} href="/profil-ikm">
                  Profil IKM
                </Link>
              </li>

              {user && (
                <li className="nav-item">
                  <Link className={`nav-link ${isActive("/pesanan") ? "active" : ""}`} href="/pesanan">
                    Pesanan Saya
                  </Link>
                </li>
              )}
            </ul>

            {/* RIGHT */}
            <ul className="navbar-nav gap-3 align-items-center">
              {user && (
                <li className="nav-item position-relative">
                  <Link href="/keranjang" className={`nav-link ${isActive("/keranjang") ? "active" : ""}`}>
                    <FaShoppingCart size={20} />
                    {cartCount > 0 && (
                      <span className="position-absolute bg-danger text-white rounded-pill"
                        style={{ top: 0, right: -5, fontSize: 10, padding: "2px 6px" }}>
                        {cartCount}
                      </span>
                    )}
                  </Link>
                </li>
              )}

              {user ? (
                <li className="nav-item dropdown">
                  <button className="nav-link dropdown-toggle btn btn-link" data-bs-toggle="dropdown">
                    {user.name}
                  </button>
                  <div className="dropdown-menu dropdown-menu-end">
                    <Link className="dropdown-item" href="/profile">Profil Saya</Link>
                    <button className="dropdown-item text-danger" onClick={handleLogout}>
                      Logout
                    </button>
                  </div>
                </li>
              ) : (
                <>
                  <li className="nav-item"><Link className="nav-link" href="/login">Login</Link></li>
                  <li className="nav-item"><Link className="nav-link" href="/register">Register</Link></li>
                </>
              )}
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
        {/* CLOSE */}
        <div className="d-flex justify-content-between mb-3">
          <strong>Menu</strong>
          <button onClick={() => setIsOpen(false)} className="btn btn-sm">✕</button>
        </div>

        <ul className="nav flex-column gap-2">

          <Link href="/" className={`nav-link ${isActive("/") ? "active" : ""}`} onClick={() => setIsOpen(false)}>Beranda</Link>
          <Link href="/rumah-batik" className={`nav-link ${isActive("/rumah-batik") ? "active" : ""}`} onClick={() => setIsOpen(false)}>Rumah Sentra Batik</Link>
          <Link href="/produk-ikm" className={`nav-link ${isActive("/produk-ikm") ? "active" : ""}`} onClick={() => setIsOpen(false)}>Produk IKM</Link>
          <Link href="/outlet-ikm" className={`nav-link ${isActive("/outlet-ikm") ? "active" : ""}`} onClick={() => setIsOpen(false)}>Outlet IKM</Link>
          <Link href="/profil-ikm" className={`nav-link ${isActive("/profil-ikm") ? "active" : ""}`} onClick={() => setIsOpen(false)}>Profil IKM</Link>

          {user && (
            <>
              <Link href="/pesanan" className={`nav-link ${isActive("/pesanan") ? "active" : ""}`} onClick={() => setIsOpen(false)}>Pesanan Saya</Link>
              <Link href="/keranjang" className={`nav-link ${isActive("/keranjang") ? "active" : ""}`} onClick={() => setIsOpen(false)}>
                Keranjang ({cartCount})
              </Link>
            </>
          )}

          <hr />

          {user ? (
            <>
              <div className="fw-semibold">{user.name}</div>
              <Link href="/profile" className="nav-link" onClick={() => setIsOpen(false)}>Profil Saya</Link>
              <button className="btn btn-danger mt-2" onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <Link href="/login" className={`nav-link ${isActive("/login") ? "active" : ""}`} onClick={() => setIsOpen(false)}>Login</Link>
              <Link href="/register" className={`nav-link ${isActive("/register") ? "active" : ""}`} onClick={() => setIsOpen(false)}>Register</Link>
            </>
          )}
        </ul>
      </div>
    </>
  )
}