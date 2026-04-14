"use client"

import { useEffect, useState } from "react"
import { Product } from "@/types/product"
import { getProduk, deleteProduk } from "@/services/ikmService"
import Link from "next/link"
import { toast } from "react-toastify"

export default function ProdukIKMPage() {

  const [produk, setProduk] = useState<Product[]>([])
  const [meta, setMeta] = useState<any>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [loadingTable, setLoadingTable] = useState(true)
  const [loading, setLoading] = useState(false)

  const [alert, setAlert] = useState<{
    type: "success" | "danger"
    message: string
  } | null>(null)


  function showAlert(type: "success" | "danger", message: string) {

  if (type === "success") {
    toast.success(message)
  } else {
    toast.error(message)
  }

  setAlert({ type, message }) // biarin tetap ada (biar ga rusak struktur)
}


  const fetchData = async (page: number = 1) => {

    setLoadingTable(true)

    try {

      const res = await getProduk(page)

      setProduk(res.data)
      setMeta(res.meta)
      setCurrentPage(page)

    } catch (error) {

      showAlert("danger", "Gagal memuat produk")

    }

    setLoadingTable(false)

  }


  useEffect(() => {
    fetchData()
  }, [])


  const handleDelete = async (id: number) => {

    if (!confirm("Yakin hapus produk ini?")) return

    setLoading(true)

    try {

      await deleteProduk(id)

      showAlert("success", "Produk berhasil dihapus")

      const newTotal = (meta?.total || 1) - 1
      const perPage = meta?.per_page || 10
      const lastPage = Math.ceil(newTotal / perPage)

      const pageToFetch =
        currentPage > lastPage ? lastPage : currentPage

      fetchData(pageToFetch || 1)

    } catch (error) {

      showAlert("danger", "Gagal menghapus produk")

    }

    setLoading(false)

  }


  return (
    <div>

      {/* HEADER */}
      <div className="container-fluid mt-4 d-flex justify-content-between align-items-center mb-3">
        <h2 className="mb-0">Daftar Produk</h2>

        <Link
          href="/ikm/produk/create"
          className="btn btn-primary"
        >
          <i className="bi bi-plus"></i> Tambah Produk
        </Link>
      </div>



      {/* ALERT */}
      {/* {alert && (
        <div className={`alert alert-${alert.type} alert-dismissible fade show mb-3`}>
          {alert.message}
          <button
            className="btn-close"
            onClick={() => setAlert(null)}
          ></button>
        </div>
      )} */}



      {/* LOADING */}
      {loadingTable ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary"></div>
          <div className="mt-2">Memuat produk...</div>
        </div>
      ) : produk.length > 0 ? (
        <>

          {/* LIST PRODUK */}
          {produk.map((item) => (

            <div className="card border mb-1" key={item.id}>
              <div className="card-body">

                <div className="row align-items-center g-2">

                  {/* FOTO */}
                  <div className="col-3 col-md-1">

                    <Link
                      href={`/ikm/produk/${item.id}`}
                      className="text-dark"
                    >

                      <img
                        src={
                          item.foto
                            ? `${process.env.NEXT_PUBLIC_STORAGE_URL}/${item.foto}`
                            : "/no-image.webp"
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



                  {/* NAMA PRODUK */}
                  <div className="col-7 col-md-8">

                    <Link
                      href={`/ikm/produk/${item.id}`}
                      className="text-dark text-decoration-none"
                    >

                      <p className="fw-semibold mb-0">
                        {item.nama_produk}
                      </p>

                      <p className="fs-7 text-secondary mb-0">
                        Rp {Number(item.harga).toLocaleString()}
                      </p>

                      <p
                      className={`fs-7 mb-0 ${
                        !item.stok || item.stok === 0
                          ? "text-danger"
                          : "text-muted"
                      }`}
                    >
                      {!item.stok || item.stok === 0
                        ? "Stok habis"
                        : `Stok: ${item.stok}`}
                    </p>

                    </Link>

                  </div>



                  {/* ACTION */}
                  <div className="col-2 col-md-3">

                    <div className="d-flex justify-content-end gap-2">

                      <Link
                        href={`/ikm/produk/edit/${item.id}`}
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



          {/* PAGINATION */}
          {meta && meta.last_page > 1 && (
            <nav className="mt-3">
              <ul className="pagination justify-content-center">

                <li className={`page-item ${!meta.prev_page_url ? "disabled" : ""}`}>
                  <button
                    className="page-link"
                    onClick={() => fetchData(currentPage - 1)}
                    disabled={!meta.prev_page_url}
                  >
                    Prev
                  </button>
                </li>

                {Array.from({ length: meta.last_page }, (_, i) => i + 1).map((page) => (
                  <li
                    key={page}
                    className={`page-item ${currentPage === page ? "active" : ""}`}
                  >
                    <button
                      className="page-link"
                      onClick={() => fetchData(page)}
                    >
                      {page}
                    </button>
                  </li>
                ))}

                <li className={`page-item ${!meta.next_page_url ? "disabled" : ""}`}>
                  <button
                    className="page-link"
                    onClick={() => fetchData(currentPage + 1)}
                    disabled={!meta.next_page_url}
                  >
                    Next
                  </button>
                </li>

              </ul>
            </nav>
          )}

        </>
      ) : (
        <div className="text-center py-5">
          <h5 className="text-muted mb-0">Belum ada data produk</h5>
          <p className="text-muted">
            Belum ada produk yang ditambahkan.
          </p>
        </div>
      )}

    </div>
  )
}