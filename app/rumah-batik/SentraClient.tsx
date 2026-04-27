"use client"

import { MapPin, Coffee, Palette, BookOpen } from "lucide-react"
import Image from "next/image";
import Link from "next/link"

export default function SentraClient({ seo }: any) {
  return (
    <div className="w-full">

      {/* HERO */}
      <section className="relative h-[80vh] flex items-center justify-center text-white">
        <Image
        src={
          seo?.hero_image
            ? `${process.env.NEXT_PUBLIC_STORAGE_URL}/${seo.hero_image}`
            : "/no-image.webp"
        }
        alt={seo?.image_alt || "Rumah Sentra Batik Kota Probolinggo"}
        fill
        sizes="100vw"
        className="object-cover"
        priority
        
      />
        <div className="absolute inset-0 bg-black/60" />

        <div className="relative z-10 text-center px-6">
          {/* ✅ H1 tetap */}
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            {seo?.heading_h1 || "Rumah Sentra Batik Kota Probolinggo"}
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-gray-200">
            Pusat batik Probolinggo untuk pengembangan IKM (Industri Kecil dan Menengah) 
            yang menghadirkan beragam motif batik khas Probolinggo, tempat belajar membatik, 
            berkarya, serta menikmati kekayaan budaya lokal.
          </p>
        </div>
      </section>

      {/* TENTANG */}
      <section className="py-16 px-6 max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6">Tentang Rumah Sentra Batik</h2>
        <p className="text-gray-600 leading-relaxed">
          Rumah Sentra Batik Kota Probolinggo merupakan pusat pengembangan 
          batik Probolinggo yang menjadi wadah bagi pelaku IKM (Industri Kecil dan Menengah) 
          dalam menghasilkan batik khas Probolinggo dengan beragam motif batik khas Probolinggo 
          yang unik dan bernilai budaya. Diresmikan pada September 2025, tempat ini tidak hanya 
          berfungsi sebagai pusat produksi, tetapi juga sebagai sarana edukasi, promosi, dan 
          pelestarian warisan budaya batik lokal kepada masyarakat dan generasi muda.
        </p>
         <p className="text-gray-600 mb-3">
        Selain Rumah Sentra Batik sebagai pusat pengembangan produk IKM, setiap pelaku IKM juga memiliki outlet atau lokasi usaha masing-masing di Kota Probolinggo, sehingga masyarakat dapat melihat dan membeli produk secara langsung.
      </p>

      {/* CTA LINK */}
      <div className="text-center">
        <Link
          href="/outlet-ikm"
          className="inline-flex align-items-center gap-2 fw-semibold text-decoration-none"
          style={{
            color: "#2563eb",
            background: "#eff6ff",
            padding: "10px 16px",
            borderRadius: "999px",
            fontSize: "14px",
            transition: "0.2s ease",
          }}
        >
          📍 Lihat Lokasi Outlet IKM →
        </Link>
      </div>

      </section>

      {/* FITUR */}
      <section className="bg-gray-50 py-4 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-6">

          <article className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
            <BookOpen className="mb-3 text-indigo-600" />
            <h3 className="font-semibold text-lg mb-2">Edukasi Batik</h3>
            <p className="text-sm text-gray-500">
              Mempelajari sejarah batik Probolinggo dan proses pembuatan batik khas Probolinggo 
              langsung dari pengrajin IKM (Industri Kecil dan Menengah).
            </p>
          </article>

          <article className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
            <Palette className="mb-3 text-pink-600" />
            <h3 className="font-semibold text-lg mb-2">Galeri UMKM</h3>
            <p className="text-sm text-gray-500">
              Menampilkan produk unggulan IKM dengan berbagai motif batik khas Probolinggo 
              seperti Batik Manggur yang memiliki ciri khas daerah.
            </p>
          </article>

          <article className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
            <Coffee className="mb-3 text-yellow-600" />
            <h3 className="font-semibold text-lg mb-2">Griya Batik Cafe</h3>
            <p className="text-sm text-gray-500">
              Menikmati kuliner khas sambil menikmati suasana sentra batik Probolinggo 
              yang nyaman dan edukatif.
            </p>
          </article>

          <article className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
            <MapPin className="mb-3 text-green-600" />
            <h3 className="font-semibold text-lg mb-2">Pemberdayaan IKM</h3>
            <p className="text-sm text-gray-500">
              Mendukung pertumbuhan IKM (Industri Kecil dan Menengah) batik Probolinggo 
              melalui pembinaan dan kolaborasi bersama Disperinaker.
            </p>
          </article>

        </div>
      </section>

      {/* MAP */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">
          Lokasi Rumah Sentra Batik
        </h2>

        <div className="rounded-2xl overflow-hidden shadow-lg">
          <iframe
            src="https://www.google.com/maps?q=Jl.%20Mastrip%20No.%20159%20Probolinggo&output=embed"
            width="100%"
            height="400"
            loading="lazy"
          />
        </div>

        <p className="text-center text-gray-600 mt-4">
          Jl. Mastrip, RT 07 / RW 11, Kanigaran, Kota Probolinggo, Jawa Timur 67213
        </p>
      </section>

      {/* FOOTER */}
      <footer className="mt-5 pb-3">
        <div className="container">
          <hr className="border-secondary-subtle mb-3" />

          <p className="text-center small text-secondary mb-0">
            © {new Date().getFullYear()} {process.env.NEXT_PUBLIC_APP_NAME || "IKM Kota Probolinggo"}. All rights reserved.
          </p>
        </div>
      </footer>

    </div>
  )
}