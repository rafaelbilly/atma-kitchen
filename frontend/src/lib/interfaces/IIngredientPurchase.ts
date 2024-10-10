import { IIngredients } from "./IIngredients";

export type IIngredientPurchase = {
  id_pembelian_bahan_baku: string;
  tanggal_pembelian: string;
  jumlah_pembelian: number;
  harga_beli: number;
  bahan_baku: IIngredients;
};
