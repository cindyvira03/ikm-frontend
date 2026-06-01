import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kebijakan Privasi & Perlindungan Data",
  description:
    "Kebijakan privasi Jelajah Probolinggo. Pelajari bagaimana data Anda dikumpulkan, digunakan, dan dilindungi dengan aman dalam sistem e-commerce IKM kami.",
};

export default function PrivacyPolicyPage() {
  return (
    <main style={{ background: "#f8fafc" }}>
      
      {/* HERO */}
      <section className="py-5 text-center bg-white border-bottom">
        <div className="container">
          <h1 className="fw-bold">Kebijakan Privasi</h1>
          <p className="text-secondary">
            Informasi mengenai bagaimana data pengguna dikelola dalam platform ini.
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="py-5">
        <div className="container">
          <div className="policy-card">

            <h2 className="text-primary fs-4">1. Informasi yang Dikumpulkan</h2>
            <p>
              Kami dapat mengumpulkan informasi seperti nama, email, serta data
              yang diberikan saat melakukan pemesanan, termasuk bukti pembayaran.
            </p>

            <h2 className="text-primary fs-4">2. Penggunaan Informasi</h2>
            <p>
              Informasi digunakan untuk memproses pesanan, mengelola transaksi,
              dan meningkatkan layanan platform.
            </p>

            <h2 className="text-primary fs-4">3. Keamanan Data</h2>
            <p>
              Kami berupaya menjaga keamanan data pengguna dan tidak
              menyalahgunakan informasi yang diberikan.
            </p>

            <h2 className="text-primary fs-4">4. Cookies</h2>
            <p>
              Website ini dapat menggunakan cookies untuk meningkatkan pengalaman pengguna.
            </p>

            <h2 className="text-primary fs-4">5. Perubahan Kebijakan</h2>
            <p>
              Kebijakan ini dapat diperbarui sewaktu-waktu sesuai pengembangan sistem.
            </p>

            <h2 className="text-primary fs-4">6. Kontak</h2>
            <p>
              Untuk pertanyaan, silakan hubungi melalui halaman kontak yang tersedia.
            </p>

          </div>
        </div>
      </section>

    </main>
  );
}