import Link from "next/link";
import {
  FaHome,
  FaBoxOpen,
  FaUser,
  FaNewspaper,
  FaInfoCircle,
  FaEnvelope,
  FaShieldAlt,
  FaFileContract
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="footer-custom pt-4 pb-3">

      <div className="container">
        <div className="row gy-4">

          {/* BRAND */}
          <div className="col-md-4">
            <h5 className="fw-bold text-dark mb-2">
              Jelajah Probolinggo
            </h5>

            <p className="small text-secondary">
              Platform katalog digital untuk menampilkan produk unggulan
              IKM (Industri Kecil dan Menengah) di Kota Probolinggo.
            </p>

            <div className="footer-accent" />
          </div>

          {/* NAVIGASI */}
          <div className="col-md-4">
            <h6 className="fw-semibold text-dark">Navigasi</h6>

            <ul className="list-unstyled mt-3 footer-list">

              <li>
                <Link href="/" className="footer-link">
                  <FaHome /> Beranda
                </Link>
              </li>

              <li>
                <Link href="/produk-ikm" className="footer-link">
                  <FaBoxOpen /> Produk IKM
                </Link>
              </li>

              <li>
                <Link href="/profil-ikm" className="footer-link">
                  <FaUser /> Profil IKM
                </Link>
              </li>

              <li>
                <Link href="/artikel" className="footer-link">
                  <FaNewspaper /> Artikel
                </Link>
              </li>

            </ul>
          </div>

          {/* INFORMASI */}
          <div className="col-md-4">
            <h6 className="fw-semibold text-dark">Informasi</h6>

            <ul className="list-unstyled mt-3 footer-list">

              <li>
                <Link href="/tentang-kami" className="footer-link">
                  <FaInfoCircle /> Tentang Kami
                </Link>
              </li>

              <li>
                <Link href="/kebijakan-privasi" className="footer-link">
                  <FaShieldAlt /> Kebijakan Privasi
                </Link>
              </li>

              <li>
                <Link href="/syarat-ketentuan" className="footer-link">
                  <FaFileContract /> Syarat & Ketentuan
                </Link>
              </li>

            </ul>

            {/* BUTTON KONTAK */}
            <Link href="/kontak" className="footer-btn mt-3">
              <FaEnvelope /> Hubungi Kami
            </Link>

          </div>

        </div>


        <hr className="border-secondary-subtle my-3" />

        <p className="text-center small text-secondary mb-0">
          © {new Date().getFullYear()} Industri Kecil Menengah Kota Probolinggo.
        </p>

      </div>
    </footer>
  );
}