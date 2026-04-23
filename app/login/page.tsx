"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { login } from "@/services/authService"
import Link from "next/link"
import { toast } from "react-toastify"

export default function LoginPage() {
  const router = useRouter()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const data = await login(email, password)

      localStorage.setItem("token", data.token)
      localStorage.setItem("user", JSON.stringify(data.user))

      if (data.user.role === "admin") {
        toast.success("Login Berhasil!")
        router.push("/admin")
      } else if (data.user.role === "ikm") {
        toast.success("Login Berhasil!")
        router.push("/ikm")
      } else if (data.user.role === "pembeli") {
        toast.success("Login Berhasil!")
        router.push("/")
      } else {
        router.push("/")
      }
    } catch (err: any) {
      setError(err.message)
      toast.error(err.message || "Login gagal")
    } finally {
      setLoading(false)
    }
  }

  return (
  <div className="vh-100 d-flex justify-content-center align-items-center bg-light">

    <div className="w-100" style={{ maxWidth: "400px" }}>
      <div className="card shadow border-0">
        <div className="card-body p-4">

          {/* Logo + Title */}
          <div className="text-center mb-4">
            <img
              src="/logo_probolinggo.png"
              width="60"
              alt="Logo"
              className="d-block mx-auto mb-2"
            />
            {/* <h5 className="fw-semibold mb-0 text-center">
              Jelajah Probolinggo
            </h5> */}
            <Link href="/" className="text-dark text-decoration-none">
              <h5 className="fw-semibold mb-0 text-center">
                  Jelajah Probolinggo
              </h5>
            </Link>
          </div>

          <form onSubmit={handleLogin}>


            <div className="mb-3">
              <label className="form-label">
                Alamat Email
              </label>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">
                Password
              </label>

              <div className="input-group">
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="btn btn-light border"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "🙈" : "👁"}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary w-100"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2"></span>
                  Memproses...
                </>
              ) : (
                "Masuk"
              )}
            </button>

            <p className="text-center text-secondary mt-3 mb-0">
              Belum memiliki akun?{" "}
              <a href="/register" className="text-primary">
                Daftar
              </a>
            </p>

          </form>
        </div>
      </div>
    </div>

  </div>
)
}