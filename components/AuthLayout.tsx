"use client"

import { usePathname } from "next/navigation"
import Navbar from "./layout/Navbar"
import AdminNavbar from "./layout/AdminNavbar"
import IkmNavbar from "./layout/IkmNavbar"


export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  const hideNavbar =
    pathname === "/login" || pathname === "/register"

  const isAdminPage = pathname.startsWith("/admin")
  const isIkmPage = pathname.startsWith("/ikm")

  return (
    <>
      {!hideNavbar && (
        isAdminPage ? (
          <AdminNavbar />
        ) : isIkmPage ? (
          <IkmNavbar />
        ) : (
          <Navbar />
        )
      )}

      {children}
    </>
  )
}