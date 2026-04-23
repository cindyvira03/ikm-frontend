"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { getOutlets, deleteOutlet } from "@/services/ikmService"
import { Outlet } from "@/types/outlet"
import { toast } from "react-toastify"
import EditOutletInline from "@/components/EditOutletInline"

export default function OutletPage() {

  const [outlet, setOutlet] = useState<Outlet | null>(null)
  const [loading, setLoading] = useState(true)

  const [alert, setAlert] = useState<{
    type: "success" | "danger"
    message: string
  } | null>(null)


  // ALERT
  function showAlert(type: "success" | "danger", message: string) {
  
    if (type === "success") {
      toast.success(message)
    } else {
      toast.error(message)
    }
  
    setAlert({ type, message }) // biarin tetap ada (biar ga rusak struktur)
  }

  // GET DATA
 const fetchData = async () => {
  try {
    const res = await getOutlets()
    setOutlet(res || null)

  } catch (error) {
    showAlert("danger", "Gagal memuat data outlet")
  } finally {
    setLoading(false)
  }
}


  useEffect(() => {
    fetchData()
  }, [])



  // DELETE OUTLET
  const handleDelete = async (id: number) => {

    if (!confirm("Yakin hapus outlet ini?")) return

    try {

      await deleteOutlet(id)

      showAlert("success", "Outlet berhasil dihapus")

      // refresh data
      fetchData()

    } catch (error) {

      console.error(error)
      showAlert("danger", "Gagal menghapus outlet")

    }

  }



  // LOADING
  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary"></div>
        <p className="mt-2">Memuat data outlet...</p>
      </div>
    )
  }



  return (
  <div className="container-fluid mt-4">

    <h2 className="mb-3">Outlet Saya</h2>

    {!outlet ? (
      // ========================
      // EMPTY STATE
      // ========================
      <div className="text-center py-5">

        <h5 className="text-muted">Belum ada data outlet</h5>
        <p className="text-secondary">
          Tambahkan outlet untuk mulai berjualan
        </p>

        <Link href="/ikm/outlet/create" className="btn btn-primary">
          + Tambah Outlet
        </Link>

      </div>
    ) : (
      // ========================
      // EDIT FORM (INLINE)
      // ========================
      <EditOutletInline outlet={outlet} refresh={fetchData} />
    )}

  </div>
)
}