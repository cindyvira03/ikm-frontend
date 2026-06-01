import { FaCheckCircle } from "react-icons/fa";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tentang Kami",
  description:
    "Mengenal Jelajah Probolinggo, platform e-katalog e-commerce resmi produk IKM. Temukan koleksi batik khas, fitur keranjang belanja, dan transaksi online aman.",
};

export default function TentangKamiPage() {
  return (
    <main style={{ background: "#f8fafc" }}>

      {/* HERO */}
    <section className="py-5 border-top">
        <div className="container">

            <div className="row align-items-center g-4">

            {/* KIRI - DESKRIPSI */}
            <div className="col-md-6">
                <h1 className="fw-bold mb-3 text-primary">
                Tentang Jelajah Probolinggo <br />
                <span className="text-muted fs-3">
                  Platform IKM Kota Probolinggo
                </span> 
                </h1>

                <p className="text-secondary">
                Jelajah Probolinggo adalah platform katalog digital dan e-commerce IKM di Kota Probolinggo 
                yang bertujuan membantu pelaku IKM lokal memasarkan produk secara online dan 
                menjangkau pasar yang lebih luas.
                </p>

                <p className="text-secondary">
                Melalui platform ini, pelaku usaha dapat menampilkan produk mereka
                secara online, sementara pengguna dapat dengan mudah menemukan,
                memilih, dan melakukan pemesanan produk lokal secara praktis.
                </p>

                <p className="text-secondary">
                Sistem yang digunakan menggabungkan katalog digital dengan fitur
                pemesanan online sederhana, termasuk keranjang belanja dan
                konfirmasi pembayaran melalui upload bukti transfer.
                </p>

                <h2 className="fw-semibold text-muted mt-4">
                Manfaat Platform Jelajah Probolinggo
                </h2>

                <ul className="text-secondary list-unstyled">
                <li className="d-flex align-items-start gap-2 mb-2">
                    <FaCheckCircle className="text-primary mt-1" />
                    <span>Membantu promosi produk UMKM lokal Probolinggo</span>
                </li>
                <li className="d-flex align-items-start gap-2 mb-2">
                    <FaCheckCircle className="text-primary mt-1" />
                    <span>Menyediakan katalog produk yang mudah diakses</span>
                </li>
                <li className="d-flex align-items-start gap-2">
                    <FaCheckCircle className="text-primary mt-1" />
                    <span>Mempermudah transaksi melalui sistem pemesanan online</span>
                </li>
                </ul>

                <p className="mt-3">
                Lihat juga <a href="/produk-ikm">produk IKM Probolinggo</a> yang tersedia di platform ini.
                </p>

                {/* highlight badge */}
                <div className="mt-3">
                <span className="badge bg-primary-subtle text-primary me-2">
                    E-Katalog
                </span>
                <span className="badge bg-success-subtle text-success me-2">
                    E-Commerce
                </span>
                <span className="badge bg-warning-subtle text-warning">
                    IKM Lokal
                </span>
                </div>
            </div>

            {/* KANAN - CARD */}
            <div className="col-md-6">
                <div className="info-card p-4">

                <h2 className="fw-semibold mb-3 fs-5">
                Didukung oleh Program Disperinaker Kota Probolinggo
                </h2>

                <p className="small text-secondary">
                    Dikembangkan sebagai bagian dari program digitalisasi IKM (Industri Kecil Menengah) oleh
                    Disperinaker Kota Probolinggo untuk meningkatkan akses pasar
                    dan daya saing produk lokal.
                </p>

                <hr />

                <h2 className="fw-semibold mt-3 fs-6">Kontak</h2>

                <p className="small mb-1">
                    📧 disperinnaker@probolinggokota.go.id
                </p>

                <p className="small">
                    📞 0335 – 421 921
                </p>

                </div>

                <div className="info-card p-4 mt-4">

                    <h2 className="fw-semibold mb-3 fs-6">
                        Tim Pengembang Sistem
                    </h2>

                    <p className="small text-secondary">
                        💻 Platform ini dikembangkan melalui kolaborasi tim pengembang sebagai bagian dari
                        pengembangan sistem digital berbasis kebutuhan industri dari PT Onlenkan Teknologi Indonesia.
                    </p>

                    </div>
            </div>

            </div>

        </div>
        </section>
    </main>
  );
}