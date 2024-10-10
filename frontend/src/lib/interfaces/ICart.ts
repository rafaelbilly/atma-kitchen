import { IProduct } from "./IProducts";

export type ICart = {
  id_keranjang: number;
  tanggal_keranjang: string;
  jumlah_item_keranjang: number;
  id_customer: number;
  produk: IProduct;
};
