import { IRecipe } from "./IRecipe";

export type IProduct = {
  id_produk: string;
  nama_produk: string;
  deskripsi: string;
  harga: number;
  limit_produksi: number;
  jenis_produk: string;
  id_penitip?: string;
  foto: string;
  stok: number;
  items?: [IProduct];
  resep: IRecipe;
};
