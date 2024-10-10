import { IIngredients } from "./IIngredients";

export type IIngredientUsage = {
  id_penggunaan_bahan_baku: number;
  tanggal_penggunaan: string;
  jumlah_penggunaan: number;
  bahan_baku: IIngredients;
};
