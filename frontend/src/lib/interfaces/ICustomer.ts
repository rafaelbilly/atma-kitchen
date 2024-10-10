import { IUser } from "./IUsers";

export type ICustomer = {
  id_customer: string;
  nama_customer: string;
  tanggal_lahir: string;
  jenis_Kelamin: string;
  poin: number;
  no_telp: string;
  user: IUser;
};
