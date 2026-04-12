"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { getOutlets, deleteOutlet } from "@/services/ikmService"
import { Outlet } from "@/types/outlet"
import { toast } from "react-toastify"

export default function OutletPage() {

  const [data, setData] = useState<Outlet[]>([])
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

      setData(res.data)

    } catch (error) {

      console.error("Gagal mengambil data outlet:", error)
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
    <div>

      {/* HEADER */}
      <div className="container-fluid mt-4 mb-3 d-flex justify-content-between align-items-center">
        <h2 className="mb-0">Daftar Outlet</h2>

        <Link href="/ikm/outlet/create" className="btn btn-primary">
          <i className="ai-plus"></i> + Tambah Outlet
        </Link>
      </div>


      {/* ALERT */}
      {/* {alert && (
        <div className={`alert alert-${alert.type} alert-dismissible fade show`}>
          {alert.message}
          <button
            className="btn-close"
            onClick={() => setAlert(null)}
          ></button>
        </div>
      )} */}



      {/* EMPTY STATE */}
      {data.length === 0 && (
        <div className="text-center py-5">

          <h5 className="text-muted mb-0">
            Belum ada data outlet
          </h5>

          <p className="text-muted">
            Belum ada outlet yang ditambahkan.
          </p>

          {/* <Link href="/ikm/outlet/create" className="btn btn-primary">
            <i className="ai-plus"></i> Tambah Outlet Pertama
          </Link> */}

        </div>
      )}



      {/* LIST */}
      {data.map((item) => (

        <div className="card border mb-1" key={item.id}>
          <div className="card-body">

            <div className="row align-items-center g-2">

              {/* FOTO */}
              <div className="col-3 col-md-1">

                <Link
                  href={`/ikm/outlet/edit/${item.id}`}
                  className="text-dark"
                >

                  <img
                    src={
                      item.foto_lokasi_tampak_depan
                        ? `${process.env.NEXT_PUBLIC_STORAGE_URL}/${item.foto_lokasi_tampak_depan}`
                        : "/no-image.jpg"
                    }
                    className="img-thumbnail"
                    style={{
                      width: "100%",
                      height: "80px",
                      objectFit: "cover"
                    }}
                  />

                </Link>

              </div>



              {/* ALAMAT */}
              <div className="col-7 col-md-8">

                <Link
                  href={`/ikm/outlet/edit/${item.id}`}
                  className="text-dark text-decoration-none"
                >

                  <p className="fw-semibold mb-0">
                    {item.alamat}
                  </p>

                  <p className="fs-7 text-secondary mb-0">
                    {item.lokasi_googlemap}
                  </p>

                </Link>

              </div>



              {/* ACTION */}
              <div className="col-2 col-md-3">

                <div className="d-flex justify-content-end gap-2">

                  <Link
                    href={`/ikm/outlet/edit/${item.id}`}
                    className="btn btn-sm btn-warning"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <i className="bi bi-pencil"></i>
                  </Link>

                  <button
                    className="btn btn-sm btn-danger"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleDelete(item.id)
                    }}
                  >
                    <i className="bi bi-trash"></i>
                  </button>

                </div>

              </div>


            </div>

          </div>
        </div>

      ))}

    </div>
  )
}