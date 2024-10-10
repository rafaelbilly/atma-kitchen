import { toast } from "sonner";
import { mutate } from "swr";
import { ICustomer } from "../interfaces/ICustomer";
import { axiosInstance } from "../utils/utils";

export const payTransaction = async (data: any, id: string) => {
  const customer = JSON.parse(localStorage.getItem("customer_id") || "{}")
    .customer as ICustomer;

  try {
    const response = await axiosInstance().post(
      `${import.meta.env.VITE_BASE_API}/pembayaran/bayar/${id}`,
      data
    );

    if (response.status.toString().startsWith("20")) {
      mutate(
        `${import.meta.env.VITE_BASE_API}/transaksi/customer/${
          customer.id_customer
        }`
      );
      toast.success("Successfully Payment This Order");
    } else {
      toast.error("Failed to Payment This Order");
    }
  } catch (error) {
    console.error(error);
  }
};

export const confirmTransaction = async (data: any, id: string) => {
  try {
    const response = await axiosInstance().put(
      `${import.meta.env.VITE_BASE_API}/pembayaran/konfirm/${id}`,
      data
    );

    if (response.status.toString().startsWith("20")) {
      toast.success("Successfully Confirm Payment This Order");
    } else {
      toast.error("Failed to Payment This Order");
    }
  } catch (error) {
    toast.error("Error", (error as any).response.data);
  }
};
