import { IBalance } from "./IBalance";

export type IProfileCustomer = {
  id_user: string;
  id_customer: string;
  nama_customer: string;
  no_telp: number;
  tanggal_lahir: string;
  jenis_kelamin: string;
  poin: number;
  saldo?: IBalance;
};
