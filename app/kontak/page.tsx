import { Metadata } from "next";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaInstagram,
  FaTiktok,
} from "react-icons/fa";

export const metadata: Metadata = {
  title: "Kontak",
  description:
    "Hubungi Jelajah Probolinggo untuk informasi terkait produk IKM Kota Probolinggo, layanan platform, dan kerja sama.",
};

export default function KontakPage() {
  return (
    <main style={{ background: "#f8fafc" }}>
      
      {/* HERO */}
      <section className="py-5 text-center bg-white border-bottom">
        <div className="container">
          <h1 className="fw-bold">Kontak Kami</h1>
          <p className="text-secondary">
            Hubungi kami untuk informasi lebih lanjut terkait platform IKM.
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="py-5">
        <div className="container">
          <div className="row g-4 align-items-center">

            {/* LEFT */}
            <div className="col-md-5">
              <h4 className="fw-bold mb-3">Terhubung dengan Kami</h4>

              <p className="text-secondary">
                Jika Anda memiliki pertanyaan, saran, atau ingin mengetahui lebih
                lanjut mengenai produk IKM di Kota Probolinggo, silakan hubungi
                kami melalui kontak yang tersedia.
              </p>

              <p className="text-secondary">
                Tim kami siap membantu memberikan informasi yang Anda butuhkan.
              </p>
            </div>

            {/* RIGHT */}
            <div className="col-md-7">
              <div className="contact-card">

                {/* TELEPON */}
                <div className="contact-item">
                  <div className="icon">
                    <FaPhoneAlt />
                  </div>

                  <div className="content">
                    <p className="title">Telepon</p>
                    <p className="desc">0335 – 421 921</p>

                    <a
                      href="tel:0335421921"
                      className="btn-contact"
                    >
                      Hubungi Sekarang
                    </a>
                  </div>
                </div>

                {/* EMAIL */}
                <div className="contact-item">
                  <div className="icon">
                    <FaEnvelope />
                  </div>

                  <div className="content">
                    <p className="title">Email</p>
                    <p className="desc">
                      disperinnaker@probolinggokota.go.id
                    </p>

                    <a
                      href="mailto:disperinnaker@probolinggokota.go.id"
                      className="btn-contact"
                    >
                      Kirim Email
                    </a>
                  </div>
                </div>

                {/* INSTAGRAM */}
                <div className="contact-item">
                  <div className="icon">
                    <FaInstagram />
                  </div>

                  <div className="content">
                    <p className="title">Instagram</p>
                    <p className="desc">@disperinnakerkotaprob</p>

                    <a
                      href="https://www.instagram.com/disperinnakerkotaprob?igsh=bGQxcWswdDd4dDNu"
                      target="_blank"
                      className="btn-contact-outline"
                    >
                      Kunjungi
                    </a>
                  </div>
                </div>

                {/* TIKTOK */}
                {/* <div className="contact-item">
                  <div className="icon">
                    <FaTiktok />
                  </div>

                  <div className="content">
                    <p className="title">TikTok</p>
                    <p className="desc">@ikmprobolinggo</p>

                    <a
                      href="#"
                      target="_blank"
                      className="btn-contact-outline"
                    >
                      Lihat Konten
                    </a>
                  </div>
                </div> */}

              </div>
            </div>

          </div>
        </div>
      </section>

    </main>
  );
}