import { ICustomer } from "./ICustomer";
import { IDelivery } from "./IDelivery";
import { IPayment } from "./IPayment";
import { ITransactionDetails } from "./ITransactionDetails";

export type ITransaction = {
  id_transaksi: string;
  tanggal_nota_dibuat: string;
  tanggal_diterima: string;
  tanggal_diproses: string;
  tanggal_ditolak: string;
  tanggal_siap: string;
  tanggal_ambil: string;
  tanggal_selesai: string;
  tanggal_diambil: string;
  poin_digunakan: number;
  poin_diperoleh: number;
  total: number;
  jenis_pengiriman: string;
  status_transaksi: string;
  pembayaran: IPayment;
  customer: ICustomer;
  detail_transaksi: ITransactionDetails[];
  pengiriman: IDelivery;
};
