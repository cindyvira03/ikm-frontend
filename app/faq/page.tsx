import { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ - Jelajah Probolinggo",
  description:
    "Pertanyaan yang sering diajukan seputar Jelajah Probolinggo, platform katalog dan e-commerce IKM Kota Probolinggo. Temukan informasi tentang pemesanan, pembayaran, dan penggunaan website.",
};

export default function FAQPage() {
  return (
    <main style={{ background: "#f8fafc" }}>

      {/* HERO */}
      <section className="py-5 text-center bg-white border-bottom">
        <div className="container">
          <h1 className="fw-bold">
            FAQ – Pertanyaan Umum
          </h1>
          <p className="text-secondary">
            Temukan jawaban atas pertanyaan yang sering diajukan tentang penggunaan platform Jelajah Probolinggo.
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="py-5">
        <div className="container">
          <div className="policy-card">

            <h2 className="text-primary fs-4">1. Apa itu Jelajah Probolinggo?</h2>
            <p>
              Jelajah Probolinggo adalah platform katalog digital dan e-commerce yang menampilkan berbagai produk dari pelaku IKM (Industri Kecil dan Menengah) di Kota Probolinggo. Platform ini bertujuan membantu promosi produk lokal serta mempermudah masyarakat dalam menemukan dan memesan produk secara online.
            </p>

            <h2 className="text-primary fs-4">2. Bagaimana cara melakukan pemesanan produk?</h2>
            <p>
              Pengguna dapat memilih produk yang diinginkan, menambahkannya ke keranjang, kemudian melanjutkan ke proses checkout. Setelah itu, pengguna akan diminta untuk melakukan pembayaran sesuai instruksi yang tersedia.
            </p>

            <h2 className="text-primary fs-4">3. Metode pembayaran apa yang tersedia?</h2>
            <p>
              Saat ini pembayaran dilakukan melalui transfer bank. Setelah melakukan pembayaran, pengguna wajib mengunggah bukti transfer sebagai konfirmasi agar pesanan dapat diproses oleh pelaku usaha.
            </p>

            <h2 className="text-primary fs-4">4. Apakah saya harus membuat akun untuk berbelanja?</h2>
            <p>
              Iya, jika belum memiliki akun harus membuat akun terlebih dahulu. Memiliki akun akan mempermudah Anda dalam melacak pesanan, menyimpan data, dan melakukan transaksi lebih cepat di kemudian hari.
            </p>

            <h2 className="text-primary fs-4">5. Bagaimana jika produk yang saya pesan tidak tersedia?</h2>
            <p>
              Ketersediaan produk tergantung pada masing-masing pelaku IKM. Jika produk tidak tersedia, Anda dapat memilih produk lain atau menghubungi penjual melalui informasi yang tersedia.
            </p>

            <h2 className="text-primary fs-4">6. Bagaimana metode pengiriman produk di Jelajah Probolinggo?</h2>
            <p>
            Jelajah Probolinggo menyediakan dua metode pengambilan produk, yaitu ambil langsung di outlet dan pengiriman ke alamat pembeli.
            </p>

            <ul className="text-secondary list-unstyled">

            <li className="mb-2">
                <strong>• Ambil di Outlet: </strong> 
                Pembeli dapat mengambil produk langsung ke lokasi outlet IKM yang tertera pada detail produk atau transaksi. Metode ini cocok bagi pembeli yang berada di sekitar lokasi penjual.
            </li>

            <li>
                <strong>• Dikirim ke Alamat: </strong> 
                Produk akan dikirim oleh penjual ke alamat pembeli menggunakan jasa ekspedisi. Setelah pesanan dikirim, penjual biasanya akan menambahkan nomor resi pada detail transaksi, sehingga pembeli dapat melakukan pelacakan (tracking) melalui website resmi ekspedisi yang digunakan.
            </li>

            </ul>

            <h2 className="text-primary fs-4">7. Apakah harga produk sudah termasuk ongkir?</h2>
            <p>
              Harga yang tertera biasanya belum termasuk ongkos kirim. Biaya pengiriman akan disesuaikan dengan lokasi pembeli dan jenis ekspedisi yang dipilih.
            </p>

            <h2 className="text-primary fs-4">8. Bagaimana jika terjadi masalah pada pesanan?</h2>
            <p>
              Jika terjadi kendala seperti produk tidak sesuai atau masalah lainnya, pengguna dapat menghubungi kontak yang tersedia atau pihak pengelola platform untuk mendapatkan bantuan.
            </p>

            <h2 className="text-primary fs-4">9. Apakah data saya aman di platform ini?</h2>
            <p>
              Kami berkomitmen untuk menjaga keamanan data pengguna. Informasi yang diberikan hanya digunakan untuk keperluan transaksi dan tidak disebarluaskan tanpa izin.
            </p>

            <h2 className="text-primary fs-4">10. Bagaimana cara menghubungi pengelola platform?</h2>
            <p>
              Anda dapat menghubungi kami melalui halaman kontak atau melalui informasi email dan nomor telepon yang tersedia di website.
            </p>

          </div>
        </div>
      </section>

    </main>
  );
}