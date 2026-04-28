import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kebijakan Privasi",
  description:
    "Kebijakan privasi Jelajah Probolinggo yang menjelaskan bagaimana data pengguna dikumpulkan, digunakan, dan dilindungi dalam platform e-katalog dan e-commerce IKM Kota Probolinggo.",
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

            <h6>1. Informasi yang Dikumpulkan</h6>
            <p>
              Kami dapat mengumpulkan informasi seperti nama, email, serta data
              yang diberikan saat melakukan pemesanan, termasuk bukti pembayaran.
            </p>

            <h6>2. Penggunaan Informasi</h6>
            <p>
              Informasi digunakan untuk memproses pesanan, mengelola transaksi,
              dan meningkatkan layanan platform.
            </p>

            <h6>3. Keamanan Data</h6>
            <p>
              Kami berupaya menjaga keamanan data pengguna dan tidak
              menyalahgunakan informasi yang diberikan.
            </p>

            <h6>4. Cookies</h6>
            <p>
              Website ini dapat menggunakan cookies untuk meningkatkan pengalaman pengguna.
            </p>

            <h6>5. Perubahan Kebijakan</h6>
            <p>
              Kebijakan ini dapat diperbarui sewaktu-waktu sesuai pengembangan sistem.
            </p>

            <h6>6. Kontak</h6>
            <p>
              Untuk pertanyaan, silakan hubungi melalui halaman kontak yang tersedia.
            </p>

          </div>
        </div>
      </section>

    </main>
  );
}