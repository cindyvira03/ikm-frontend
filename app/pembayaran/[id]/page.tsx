"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { uploadPembayaran, getDetailPembayaran } from "@/services/pembeliService"
import { toast } from "react-toastify"

export default function PembayaranPage() {
  const { id } = useParams()
  const router = useRouter()

  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState("")
  const [loading, setLoading] = useState(false)
  const [ikmRekening, setIkmRekening] = useState<{
    nama_rekening: string
    no_rekening: string
    jenis_rekening: string
  } | null>(null)

  // =========================
  // Ambil data rekening IKM
  // =========================
  useEffect(() => {
    const fetchRekening = async () => {
      try {
        const res = await getDetailPembayaran(Number(id))
        if (res.success && res.data.ikm_rekening) {
          setIkmRekening(res.data.ikm_rekening)
        }
      } catch (err) {
        console.error("Gagal ambil rekening IKM", err)
      }
    }
    fetchRekening()
  }, [id])

  // =========================
  // HANDLE FILE
  // =========================
  const handleFile = (f: File) => {
    if (!f.type.startsWith("image/")) {
      toast.warning("File harus gambar")
      return
    }

    if (f.size > 2000000) {
      toast.warning("Maksimal 2MB")
      return
    }

    setFile(f)

    const reader = new FileReader()
    reader.onload = () => setPreview(reader.result as string)
    reader.readAsDataURL(f)
  }

  // =========================
  // SUBMIT UPLOAD
  // =========================
  const handleUpload = async () => {
    if (!file) {
      toast.warning("Upload bukti transfer dulu!")
      return
    }

    setLoading(true)

    try {
      const res = await uploadPembayaran(Number(id), file)

      if (res.success) {
        toast.success("Bukti transfer berhasil dikirim!")
        router.push("/pesanan")
      } else {
        toast.error(res.message)
      }
    } catch (err) {
      console.error(err)
      toast.error("Gagal upload")
    }

    setLoading(false)
  }

  return (
    <div className="container py-4">
      <h4 className="mb-4 fw-semibold">Pembayaran</h4>

      {/* CARD REKENING */}
      {ikmRekening && (
        <div className="card p-4 mb-4 rounded-4 shadow-sm border-0">
          <h6 className="fw-bold mb-3">Informasi Rekening IKM</h6>
          <p><strong>Nama Rekening:</strong> {ikmRekening.nama_rekening}</p>
          <p><strong>No. Rekening:</strong> {ikmRekening.no_rekening}</p>
          <p><strong>Jenis Rekening:</strong> {ikmRekening.jenis_rekening}</p>
        </div>
      )}

      {/* CARD UPLOAD */}
      <div className="card p-4 rounded-4 shadow-sm border-0">
        <h6 className="fw-bold mb-3">Upload Bukti Transfer</h6>

        {/* INPUT FILE */}
        {!preview && (
          <input
            type="file"
            className="form-control mb-3"
            accept="image/*"
            onChange={(e) =>
              e.target.files && handleFile(e.target.files[0])
            }
          />
        )}

        {/* PREVIEW */}
        {preview && (
          <div className="text-center mb-3">
            <img
              src={preview}
              style={{
                width: "100%",
                maxWidth: 300,
                borderRadius: 12,
              }}
            />

            <button
              className="btn btn-danger btn-sm mt-2"
              onClick={() => {
                setPreview("")
                setFile(null)
              }}
            >
              Hapus
            </button>
          </div>
        )}

        {/* BUTTON UPLOAD */}
        <button
          className="btn btn-primary w-100"
          onClick={handleUpload}
          disabled={loading}
        >
          {loading ? "Mengupload..." : "Kirim Bukti Transfer"}
        </button>
      </div>
    </div>
  )
}