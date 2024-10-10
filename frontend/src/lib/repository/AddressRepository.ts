import useSWR from "swr";
import { fetcher } from "../utils/utils";
import { IAddress } from "../interfaces/IAddress";
import { ICustomer } from "../interfaces/ICustomer";
import { toast } from "sonner";

export const getAddress = () => {
  const customer = JSON.parse(localStorage.getItem("customer_id") || "{}")
    .customer as ICustomer;
  let { data, error, isLoading, isValidating, mutate } = useSWR(
    `${import.meta.env.VITE_BASE_API}/alamat/${customer.id_customer}`,
    fetcher
  );

  if (!isLoading && error) {
    toast.error("Gagal mengambil data");
    console.log(error);
  }

  return {
    data: data as IAddress[],
    error,
    isLoading,
    isValidating,
    mutate,
  };
};
