import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Syarat & Ketentuan",
  description:
    "Pahami syarat dan ketentuan resmi Jelajah Probolinggo. Aturan transaksi belanja e-commerce yang aman, penggunaan website, dan tanggung jawab pengguna IKM.",
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

            <h2 className="text-primary fs-4">1. Penggunaan Website</h2>
            <p>
              Website ini digunakan sebagai media katalog dan pemesanan produk IKM.
            </p>

            <h2 className="text-primary fs-4">2. Transaksi</h2>
            <p>
              Pengguna dapat melakukan pemesanan melalui sistem keranjang dan
              melakukan pembayaran melalui transfer dengan upload bukti pembayaran.
            </p>

            <h2 className="text-primary fs-4">3. Tanggung Jawab Pengguna</h2>
            <p>
              Pengguna bertanggung jawab atas data yang diberikan saat melakukan pemesanan.
            </p>

            <h2 className="text-primary fs-4">4. Ketersediaan Produk</h2>
            <p>
              Produk dapat berubah sewaktu-waktu sesuai kondisi pelaku usaha.
            </p>

            <h2 className="text-primary fs-4">5. Batasan Tanggung Jawab</h2>
            <p>
              Platform berfungsi sebagai perantara dan tidak bertanggung jawab
              atas kendala di luar sistem.
            </p>

            <h2 className="text-primary fs-4">6. Perubahan Ketentuan</h2>
            <p>
              Ketentuan dapat diperbarui sesuai kebutuhan sistem.
            </p>

          </div>
        </div>
      </section>

    </main>
  );
}