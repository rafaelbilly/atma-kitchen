export type IHistory = {
  id_transaksi: string;
  tanggal_diterima: string;
  tanggal_ditolak: string;
  total: number;
  status_transaksi: string;
  detail_transaksi?: string[];
};
