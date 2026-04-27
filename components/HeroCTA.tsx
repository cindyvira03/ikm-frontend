"use client"

import Link from "next/link"

export default function HeroCTA() {
  return (
    <Link
      href="/profil-ikm"
      className="btn btn-primary mt-3"  style={{ position: "relative", zIndex: 1 }}
    >
      Jelajahi IKM →
    </Link>
  )
}