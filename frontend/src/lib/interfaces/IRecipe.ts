import { IIngredients } from "./IIngredients";
import { IProduct } from "./IProducts";

export type IRecipe = {
  id_resep: string;
  jumlah_bahan: number;
  produk: IProduct;
  bahan_baku: IIngredients;
};
