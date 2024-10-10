import { toast } from "sonner";
import useSWR from "swr";
import { ICustomer } from "../interfaces/ICustomer";
import { fetcher } from "../utils/utils";

export const getAllCustomer = () => {
  let { data, error, isLoading, isValidating, mutate } = useSWR(
    `${import.meta.env.VITE_BASE_API}/customer`,
    fetcher
  );

  if (!isLoading && error) {
    toast.error("Gagal mengambil data");
  }

  return {
    data: data?.customer as ICustomer[],
    error,
    isLoading,
    isValidating,
    mutate,
  };
};
