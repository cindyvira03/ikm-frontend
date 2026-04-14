import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import 'bootstrap/dist/css/bootstrap.min.css'
import "bootstrap-icons/font/bootstrap-icons.css"
import Script from "next/script"
import Navbar from '../components/layout/Navbar'
import AdminNavbar from '../components/layout/AdminNavbar'
import AuthLayout from '../components/AuthLayout'
// import Footer from '../components/layout/Footer'
// import { ToastContainer } from "react-toastify"
// import "react-toastify/dist/ReactToastify.css"
import ToastProvider from "../components/ToastProvider"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
   title: {
    default: "Jelajah Probolinggo",
    template: "%s | Jelajah Probolinggo",
  },
  description:
    "Jelajahi batik Probolinggo dan berbagai produk unggulan dari Industri Kecil dan Menengah (IKM) Kota Probolinggo dengan kualitas terbaik dari pelaku usaha lokal.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
   return (
     <html lang="id" data-scroll-behavior="smooth">
      <body className="bg-body-tertiary">
        <AuthLayout>
          {/* <div className="container-fluid px-2"> */}
            {children}
          {/* </div> */}
          <ToastProvider />
        </AuthLayout>
        <Script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"
          strategy="afterInteractive"
        />
        {/* <Footer /> */}
      </body>
    </html>
  )
}
