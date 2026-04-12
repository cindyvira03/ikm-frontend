export interface Pembayaran {
  id: number
  status_pembayaran: string
  bukti_transfer: string
  bukti_transfer_url: string
  keterangan?: string
}

export interface PembayaranResponse {
  success: boolean
  message: string
  data: Pembayaran
}