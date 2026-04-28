import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Syarat & Ketentuan",
  description:
    "Syarat dan ketentuan penggunaan platform Jelajah Probolinggo, termasuk aturan transaksi, penggunaan website, dan tanggung jawab pengguna dalam sistem e-commerce IKM.",
};

export default function TermsPage() {
  return (
    <main style={{ background: "#f8fafc" }}>
      
      {/* HERO */}
      <section className="py-5 text-center bg-white border-bottom">
        <div className="container">
          <h1 className="fw-bold">Syarat & Ketentuan</h1>
          <p className="text-secondary">
            Ketentuan penggunaan platform Jelajah Probolinggo.
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="py-5">
        <div className="container">
          <div className="policy-card">

            <h6>1. Penggunaan Website</h6>
            <p>
              Website ini digunakan sebagai media katalog dan pemesanan produk IKM.
            </p>

            <h6>2. Transaksi</h6>
            <p>
              Pengguna dapat melakukan pemesanan melalui sistem keranjang dan
              melakukan pembayaran melalui transfer dengan upload bukti pembayaran.
            </p>

            <h6>3. Tanggung Jawab Pengguna</h6>
            <p>
              Pengguna bertanggung jawab atas data yang diberikan saat melakukan pemesanan.
            </p>

            <h6>4. Ketersediaan Produk</h6>
            <p>
              Produk dapat berubah sewaktu-waktu sesuai kondisi pelaku usaha.
            </p>

            <h6>5. Batasan Tanggung Jawab</h6>
            <p>
              Platform berfungsi sebagai perantara dan tidak bertanggung jawab
              atas kendala di luar sistem.
            </p>

            <h6>6. Perubahan Ketentuan</h6>
            <p>
              Ketentuan dapat diperbarui sesuai kebutuhan sistem.
            </p>

          </div>
        </div>
      </section>

    </main>
  );
}