import { IProduct } from "./IProducts";

export type ITransactionDetails = {
  id_detail_transaksi: string;
  jumlah_item: number;
  harga_satuan: number;
  produk: IProduct;
};
