import Link from "next/link"
import { getProfilIkmDetail } from "@/services/profilIkmService"
import { ProfilIkm } from "@/types/profilIkm"

export default async function ProfilIkmDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const { ikm }: { ikm: ProfilIkm } =
    await getProfilIkmDetail(id)

  return (
    <div className="container-fluid px-5 py-4">

      {/* Breadcrumb */}
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item fs-5">
            <Link href="/" className="text-decoration-none">
              Home
            </Link>
          </li>
          <li className="breadcrumb-item fs-5">
            <Link href="/profil-ikm" className="text-decoration-none">
              Daftar Profil IKM
            </Link>
          </li>
          <li className="breadcrumb-item active fs-5">
            {ikm.nama_usaha}
          </li>
        </ol>
      </nav>

      <h2 className="text-dark fw-semibold mb-4 fs-1">
        {ikm.nama_usaha}
      </h2>

      {/* ===================== */}
      {/* INFORMASI IKM */}
      {/* ===================== */}
      <div className="card border mb-3">
        <div className="card-header bg-white py-3">
          <p className="mb-0 fw-semibold">Informasi IKM</p>
        </div>

        <div className="card-body">
          <div className="row g-3">
            
            {/* Gambar */}
            <div className="col-md-2">
              <img
                src={
                  ikm.gambar
                    ? `${process.env.NEXT_PUBLIC_STORAGE_URL}/ikm/${ikm.gambar}`
                    : "/no-image.png"
                }
                alt={ikm.nama_usaha}
                className="img-thumbnail"
                style={{ width: "100%", objectFit: "cover" }}
              />
            </div>

            {/* Detail */}
            <div className="col-md-10">
              <div className="row g-3">

                <div className="col-md-6">
                  <p className="mb-0 small text-secondary">
                    Nama Usaha
                  </p>
                  <p className="mb-0 fw-semibold">
                    {ikm.nama_usaha}
                  </p>
                </div>

                <div className="col-md-6">
                  <p className="mb-0 small text-secondary">
                    No Telp
                  </p>
                  <p className="mb-0 fw-semibold">
                    {ikm.no_telp || "-"}
                  </p>
                </div>

                <div className="col-md-6">
                  <p className="mb-0 small text-secondary">
                    Kategori
                  </p>
                  <p className="mb-0 fw-semibold">
                    {ikm.kategori?.nama_kategori}
                  </p>
                </div>

                <div className="col-md-6">
                  <p className="mb-0 small text-secondary">
                    Merek
                  </p>
                  <p className="mb-0 fw-semibold">
                    {ikm.merek || "-"}
                  </p>
                </div>

                <div className="col-12">
                  <p className="mb-0 small text-secondary">
                    Deskripsi Singkat
                  </p>
                  <p className="mb-0 fw-semibold">
                    {ikm.deskripsi_singkat || "-"}
                  </p>
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ===================== */}
      {/* OUTLET */}
      {/* ===================== */}
      <div className="card border mb-3">
        <div className="card-header bg-white py-3">
          <p className="mb-0 fw-semibold">Outlet</p>
        </div>

        <div className="card-body">
          {ikm.outlets && ikm.outlets.length > 0 ? (
            ikm.outlets.map((item) => (
              <div key={item.id} className="card border mb-1">
                <div className="card-body row align-items-center g-2 g-md-5">

                  <div className="col-3 col-md-2">
                    <img
                      src={
                        item.foto_lokasi_tampak_depan
                          ? `${process.env.NEXT_PUBLIC_STORAGE_URL}/${item.foto_lokasi_tampak_depan}`
                          : "/no-image.png"
                      }
                      alt={item.alamat}
                      className="img-thumbnail rounded-3"
                      style={{ width: "100%" }}
                    />
                  </div>

                  <div className="col-7 col-md-6">
                    <p className="fw-semibold mb-0">
                      {item.alamat}
                    </p>
                    <p className="small text-secondary mb-0 d-none d-md-block">
                      {item.lokasi_googlemap}
                    </p>
                  </div>

                  <div className="col-12 col-md-2">
                    <a
                      href={item.lokasi_googlemap}
                      target="_blank"
                      className="btn btn-success btn-sm mt-3 w-100 rounded-3"
                    >
                      Google Maps
                    </a>
                  </div>

                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-5">
              <h5 className="text-muted mb-0">
                Belum ada data outlet
              </h5>
              <p className="text-muted">
                Belum ada outlet yang ditambahkan.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* ===================== */}
      {/* PRODUK */}
      {/* ===================== */}
      <div className="card border">
        <div className="card-header bg-white py-3">
          <p className="mb-0 fw-semibold">Produk</p>
        </div>

        <div className="card-body">
          {ikm.produk && ikm.produk.length > 0 ? (
            ikm.produk.map((item) => (
              <Link
                key={item.id}
                href={`/produk-ikm/${item.id}`}
                className="card border mb-1 text-decoration-none text-dark"
              >
                <div className="card-body row align-items-center g-2 g-md-5">

                  <div className="col-2 col-md-1">
                    <img
                      src={
                        item.foto
                          ? `${process.env.NEXT_PUBLIC_STORAGE_URL}/${item.foto}`
                          : "/no-image.png"
                      }
                      alt="No Image"
                      className="img-thumbnail rounded-3"
                    />
                  </div>

                  <div className="col-6 col-md-5">
                    <p className="fw-semibold mb-0 fs-5">
                      {item.nama_produk}
                    </p>
                    <p className="text-secondary small mb-0">
                      {item.jenis_produk}
                    </p>
                  </div>

                  <div className="col-4">
                    <p className="fw-semibold mb-0">
                      Rp {Number(item.harga).toLocaleString("id-ID")}
                    </p>
                  </div>

                </div>
              </Link>
            ))
          ) : (
            <div className="text-center py-5">
              <h5 className="text-muted mb-0">
                Belum ada data produk
              </h5>
              <p className="text-muted">
                Belum ada produk yang ditambahkan.
              </p>
            </div>
          )}
        </div>
      </div>

    </div>
  )
}