import { ICustomer } from "./ICustomer";

export type IRefund = {
  id_pengembalian_dana: string;
  tanggal_pengembalian_diajukan: string;
  tanggal_pengembalian_diterima: string;
  jumlah_pengembalian: number;
  nomor_rekening_tujuan: number;
  status_pengembalian: string;
  customer: ICustomer;
};
