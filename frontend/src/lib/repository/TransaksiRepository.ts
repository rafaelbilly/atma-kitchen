import { toast } from "sonner";
import useSWR from "swr";
import { IHistory } from "../interfaces/IHistory";
import { fetcher } from "../utils/utils";

export const getHistoryTransaction = (id_customer: string) => {
  let { data, error, isLoading, isValidating } = useSWR(
    `${import.meta.env.VITE_BASE_API}/transaksi/history/${id_customer}`,
    fetcher
  );

  if (!isLoading && error) {
    toast.error("Gagal mengambil data");
  }

  console.log(data);
  return {
    dataHistory: data as IHistory[],
    errorHistory: error,
    isLoadingHistory: isLoading,
    isValidatingHistory: isValidating,
  };
};
