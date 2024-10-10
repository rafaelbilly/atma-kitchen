import { toast } from "sonner";
import useSWR from "swr";
import { ISalesReport } from "../interfaces/ISalesReport";
import { fetcher } from "../utils/utils";

export const getAllSalesReport = (year: string) => {
  let { data, error, isLoading, isValidating, mutate } = useSWR(
    `${import.meta.env.VITE_BASE_API}/laporan/monthly-sales?year=${year}`,
    fetcher
  );

  console.log(data);

  if (!isLoading && error) {
    toast.error("Gagal mengambil data");
  }

  return {
    data: data?.sales as ISalesReport[],
    error,
    isLoading,
    isValidating,
    mutate,
  };
};
