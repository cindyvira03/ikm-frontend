import Link from "next/link";
import {
  FaHome,
  FaBoxOpen,
  FaUser,
  FaNewspaper,
  FaInfoCircle,
  FaEnvelope,
  FaShieldAlt,
  FaFileContract,
  FaQuestionCircle,
  FaMapMarkerAlt // Icon baru untuk alamat
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="footer-custom pt-4 pb-3">
      <div className="container">
        <div className="row gy-4">

          {/* BRAND & DESKRIPSI (Optimasi Keyword) */}
          <div className="col-md-4">
            <div className="fw-bold text-dark mb-2 fs-5">
              Jelajah Probolinggo
            </div>
            <p className="small text-secondary">
              Platform e-katalog resmi produk unggulan dan pusat belanja 
              <strong> batik khas Probolinggo</strong> online dari para pelaku 
              Industri Kecil dan Menengah (IKM) binaan Disperinaker Kota Probolinggo.
            </p>
            <div className="footer-accent" />
          </div>

          {/* NAVIGASI (Ubah dari h6 menjadi div untuk SEO) */}
          {/* NAVIGASI (Ubah class pada bagian <Link> agar sejajar dan tidak biru) */}
          <div className="col-md-2 col-sm-6">
            <div className="fw-semibold text-dark footer-column-title">Navigasi</div>
            <ul className="list-unstyled mt-3 footer-list">
              <li className="mb-2">
                <Link href="/" className="text-secondary text-decoration-none d-flex align-items-center gap-2">
                  <FaHome /> <span>Beranda</span>
                </Link>
              </li>
              <li className="mb-2">
                <Link href="/produk-ikm" className="text-secondary text-decoration-none d-flex align-items-center gap-2">
                  <FaBoxOpen /> <span>Produk IKM</span>
                </Link>
              </li>
              <li className="mb-2">
                <Link href="/profil-ikm" className="text-secondary text-decoration-none d-flex align-items-center gap-2">
                  <FaUser /> <span>Profil IKM</span>
                </Link>
              </li>
              <li className="mb-2">
                <Link href="/artikel" className="text-secondary text-decoration-none d-flex align-items-center gap-2">
                  <FaNewspaper /> <span>Artikel</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* INFORMASI (Ubah class pada bagian <Link> agar sejajar dan tidak biru) */}
          <div className="col-md-2 col-sm-6">
            <div className="fw-semibold text-dark footer-column-title">Informasi</div>
            <ul className="list-unstyled mt-3 footer-list">
              <li className="mb-2">
                <Link href="/tentang-kami" className="text-secondary text-decoration-none d-flex align-items-center gap-2">
                  <FaInfoCircle /> <span>Tentang Kami</span>
                </Link>
              </li>
              <li className="mb-2">
                <Link href="/kebijakan-privasi" className="text-secondary text-decoration-none d-flex align-items-center gap-2">
                  <FaShieldAlt /> <span>Kebijakan Privasi</span>
                </Link>
              </li>
              <li className="mb-2">
                <Link href="/syarat-ketentuan" className="text-secondary text-decoration-none d-flex align-items-center gap-2">
                  <FaFileContract /> <span>Syarat & Ketentuan</span>
                </Link>
              </li>
              <li className="mb-2">
                <Link href="/faq" className="text-secondary text-decoration-none d-flex align-items-center gap-2">
                  <FaQuestionCircle /> <span>FAQ</span>
                </Link>
              </li>
            </ul>
          </div>


          {/* ALAMAT & KONTAK (KUNCI UTAMA E-E-A-T TRUSTWORTHINESS) */}
          <div className="col-md-4">
            <div className="fw-semibold text-dark footer-column-title">Kantor Layanan IKM</div>
            <p className="small text-secondary mt-3 mb-2 d-flex gap-2 align-items-start">
              <FaMapMarkerAlt className="mt-1 text-primary flex-0" />
              <span>
                Rumah Sentra Batik,<br />
                Jl. Mastrip, RT 07 / RW 11, Kanigaran, Kota Probolinggo, Jawa Timur 67213
              </span>
            </p>
            
            {/* BUTTON KONTAK */}
            <Link href="/kontak" className="footer-btn mt-3 d-inline-flex">
              <FaEnvelope /> Hubungi Kami
            </Link>
          </div>

        </div>

        <hr className="border-secondary-subtle my-3" />

        <p className="text-center small text-secondary mb-0">
          © {new Date().getFullYear()} Industri Kecil Menengah Kota Probolinggo. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
