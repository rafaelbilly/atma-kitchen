import { ICustomer } from "./ICustomer";

export type IPayment = {
  id_pembayaran: string;
  jenis_pembayaran: string;
  bukti_pembayaran: string;
  tanggal_pembayaran: string;
  tanggal_pembayaran_valid: string;
  total_pembayaran: number;
  tip: number;
  customer: ICustomer;
};
