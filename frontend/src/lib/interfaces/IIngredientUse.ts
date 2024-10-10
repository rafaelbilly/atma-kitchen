import { IIngredients } from "./IIngredients";

export type IIngredientUse = {
  id_penggunaan_bahan_baku: string;
  tanggal_penggunaan: string;
  jumlah_penggunaan: number;
  bahan_baku: IIngredients;
};