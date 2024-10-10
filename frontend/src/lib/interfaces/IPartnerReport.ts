import { IPartnerProduct } from "./IPartnerProduct";

export type IPartnerReport = {
  nama_penitip: string;
  id_penitip: number;
  products: IPartnerProduct[];
};
