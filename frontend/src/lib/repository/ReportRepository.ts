import { toast } from "sonner";
import useSWR from "swr";
import { IIngredientUsage } from "../interfaces/IIngredientUsage";
import { IProductSales } from "../interfaces/IProductSales";
import { fetcher } from "../utils/utils";

export const getIngredientsUsage = (startDate: string, endDate: string) => {
  let { data, error, isLoading, isValidating } = useSWR(
    `${
      import.meta.env.VITE_BASE_API
    }/laporan/ingredients-usage?start-date=${startDate}&end-date=${endDate}`,
    fetcher
  );

  if (!isLoading && error) {
    toast.error("Gagal mengambil data");
    console.log(data);
  }

  return {
    data: data?.usage as IIngredientUsage[],
    error,
    isLoading,
    isValidating,
  };
};

export const getProductSales = (month: number, year: number) => {
  let { data, error, isLoading, isValidating } = useSWR(
    `${
      import.meta.env.VITE_BASE_API
    }/laporan/monthly-sales-product?month=${month}&year=${year}`,
    fetcher
  );

  if (!isLoading && error) {
    toast.error("Gagal mengambil data");
    console.log(data);
  }

  return {
    data: data as IProductSales[],
    error,
    isLoading,
    isValidating,
  };
};
