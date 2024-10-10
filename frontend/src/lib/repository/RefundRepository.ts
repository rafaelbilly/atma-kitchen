import useSWR, { mutate } from "swr";
import { axiosInstance, fetcher } from "../utils/utils";
import { toast } from "sonner";
import { IRefund } from "../interfaces/IRefund";

export const getWithdrawForAdminTodo = () => {
  let { data, error, isLoading, isValidating } = useSWR(
    `${import.meta.env.VITE_BASE_API}/pengembalian-dana-admin`,
    fetcher
  );
  console.log(data);

  if (!isLoading && error) {
    toast.error("Gagal mengambil data");
    console.log(data);
  }

  return {
    data: data?.refund as IRefund[],
    error,
    isLoading,
    isValidating,
  };
};

export const confirmWithdraw = async (id: string) => {
  try {
    const response = await axiosInstance().post(
      `${import.meta.env.VITE_BASE_API}/confirm-withdraw/${id}`
    );

    if (response.status.toString().startsWith("20")) {
      toast.success("Successfully Confirm Refund");
      mutate(`${import.meta.env.VITE_BASE_API}/refund`);
    } else {
      toast.error("Failed to Confirm Refund");
    }
  } catch (error) {
    console.error(error);
  }
};
