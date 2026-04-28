import {
  FaStore,
  FaShoppingCart,
  FaMoneyBillWave
} from "react-icons/fa";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tentang Kami",
  description:
    "Jelajah Probolinggo adalah platform e-katalog dan e-commerce sederhana untuk produk IKM Kota Probolinggo. Menampilkan produk lokal, fitur keranjang, serta sistem transaksi dengan konfirmasi pembayaran.",
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
                <h4 className="fw-bold mb-3 text-primary">
                Tentang Kami
                </h4>

                <p className="text-secondary">
                Jelajah Probolinggo merupakan platform digital yang dikembangkan
                untuk mendukung digitalisasi Industri Kecil dan Menengah (IKM)
                di Kota Probolinggo.
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

                <h6 className="fw-semibold mb-3">
                Didukung oleh Program Disperinaker Kota Probolinggo
                </h6>

                <p className="small text-secondary">
                    Dikembangkan sebagai bagian dari program digitalisasi IKM (Industri Kecil Menengah) oleh
                    Disperinaker Kota Probolinggo untuk meningkatkan akses pasar
                    dan daya saing produk lokal.
                </p>

                <hr />

                <h6 className="fw-semibold mt-3">Kontak</h6>

                <p className="small mb-1">
                    📧 disperinnaker@probolinggokota.go.id
                </p>

                <p className="small">
                    📞 0335 – 421 921
                </p>

                </div>

                <div className="info-card p-4 mt-4">

                    <h6 className="fw-semibold mb-3">
                        Tim Pengembang Sistem
                    </h6>

                    <p className="small text-secondary">
                        💻 Platform ini dikembangkan melalui kolaborasi tim pengembang sebagai bagian dari
                        program magang dan pengembangan sistem digital berbasis kebutuhan industri.
                    </p>

                    </div>
            </div>

            </div>

        </div>
        </section>
    </main>
  );
}