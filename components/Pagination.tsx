"use client" 

import Link from "next/link"
import { useSearchParams, usePathname } from "next/navigation" // 🔥 TAMBAHKAN usePathname

export default function Pagination({ 
  currentPage, 
  lastPage, 
}: { 
  currentPage: number 
  lastPage: number 
}) { 
  const searchParams = useSearchParams() 
  const pathname = usePathname() // 🔥 Ambil URL aktif saat ini (misal: /produk-ikm atau /produk-ikm/kategori/batik)

  // Fungsi bantu untuk membuat URL dinamis tanpa menghilangkan filter lain di URL
  const createPageUrl = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set("page", String(pageNumber))
    
    // 🔥 PERBAIKAN: Gunakan `pathname` agar tetap berada di segmen URL yang sama
    return `${pathname}?${params.toString()}`
  }

  if (lastPage <= 1) return null 

  return ( 
    <div className="d-flex justify-content-center mt-5"> 
      <nav> 
        <ul className="pagination"> 
          {/* Tombol Sebelumnya */} 
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}> 
            <Link 
              className="page-link" 
              href={currentPage > 1 ? createPageUrl(currentPage - 1) : "#"}
            > 
              ← 
            </Link> 
          </li> 

          {/* Nomor Halaman */} 
          {Array.from({ length: lastPage }, (_, i) => i + 1).map((p) => ( 
            <li key={p} className={`page-item ${currentPage === p ? "active" : ""}`}> 
              <Link className="page-link" href={createPageUrl(p)}> 
                {p} 
              </Link> 
            </li> 
          ))} 

          {/* Tombol Selanjutnya */} 
          <li className={`page-item ${currentPage === lastPage ? "disabled" : ""}`}> 
            <Link 
              className="page-link" 
              href={currentPage < lastPage ? createPageUrl(currentPage + 1) : "#"}
            > 
              → 
            </Link> 
          </li> 
        </ul> 
      </nav> 
    </div> 
  ) 
}
