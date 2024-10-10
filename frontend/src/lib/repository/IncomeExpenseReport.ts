import { toast } from "sonner";
import useSWR from "swr";
import { IIncomeExpenseReport } from "../interfaces/IIncomeExpenseReport";
import { fetcher } from "../utils/utils";

export const getAllIncomeExpenseReport = (year: string, month: string) => {
  let { data, error, isLoading, isValidating, mutate } = useSWR(
    `${
      import.meta.env.VITE_BASE_API
    }/laporan/expenses-income-reports?year=${year}&month=${month}`,
    fetcher
  );

  console.log(data);

  if (!isLoading && error) {
    toast.error("Gagal mengambil data");
  }

  return {
    data: data?.report as IIncomeExpenseReport[],
    error,
    isLoading,
    isValidating,
    mutate,
  };
};
