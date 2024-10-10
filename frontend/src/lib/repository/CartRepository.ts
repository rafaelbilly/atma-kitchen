import useSWR, { mutate } from "swr";
import { axiosInstance, fetcher } from "../utils/utils";
import { ICustomer } from "../interfaces/ICustomer";
import { ICart } from "../interfaces/ICart";
import { toast } from "sonner";

export const getCart = (date: string) => {
  const customer = JSON.parse(localStorage.getItem("customer_id") || "{}")
    .customer as ICustomer;
  let { data, error, isLoading, isValidating, mutate } = useSWR(
    `${import.meta.env.VITE_BASE_API}/keranjang?id=${
      customer.id_customer
    }&date=${date}`,
    fetcher
  );
  console.log(data);
  return {
    data: data?.keranjang as ICart[],
    error,
    isLoading,
    isValidating,
    mutate,
  };
};

export const incrementCart = async (id: number, date: string) => {
  const customer = JSON.parse(localStorage.getItem("customer_id") || "{}")
    .customer as ICustomer;
  const response = await axiosInstance().put(
    `${import.meta.env.VITE_BASE_API}/keranjang/increment/${id}`
  );

  if (response.status.toString().startsWith("20")) {
    toast.success("Successfully Add Quantity");
    mutate(
      `${import.meta.env.VITE_BASE_API}/keranjang?id=${
        customer.id_customer
      }&date=${date}`
    );
  } else {
    toast.error("Failed to Edit Employee");
  }
};

export const decrementCart = async (id: number, date: string) => {
  const customer = JSON.parse(localStorage.getItem("customer_id") || "{}")
    .customer as ICustomer;
  const response = await axiosInstance().put(
    `${import.meta.env.VITE_BASE_API}/keranjang/decrement/${id}`
  );

  if (response.status.toString().startsWith("20")) {
    toast.success("Successfully Decrease Quantity");
    mutate(
      `${import.meta.env.VITE_BASE_API}/keranjang?id=${
        customer.id_customer
      }&date=${date}`
    );
  } else {
    toast.error("Failed to Edit Employee");
  }
};

export const deleteCart = async (id: number, date: string) => {
  const customer = JSON.parse(localStorage.getItem("customer_id") || "{}")
    .customer as ICustomer;
  const response = await axiosInstance().delete(
    `${import.meta.env.VITE_BASE_API}/keranjang/${id}`
  );

  if (response.status.toString().startsWith("20")) {
    toast.success("Successfully Remove Quantity");
    mutate(
      `${import.meta.env.VITE_BASE_API}/keranjang?id=${
        customer.id_customer
      }&date=${date}`
    );
  } else {
    toast.error("Failed to Edit Employee");
  }
};

export const addCart = async (
  product_id: string,
  qty: number,
  date: string
) => {
  const customer = JSON.parse(localStorage.getItem("customer_id") || "{}")
    .customer as ICustomer;
  const data = {
    id_customer: customer.id_customer,
    id_produk: product_id,
    jumlah_item_keranjang: qty,
    tanggal_keranjang: date,
  };
  try {
    const response = await axiosInstance().post(
      `${import.meta.env.VITE_BASE_API}/keranjang`,
      data
    );
    if (response.status.toString().startsWith("20")) {
      toast.success("Successfully Added Cart");
    } else {
      toast.error("Failed to Add Cart");
    }
  } catch (error) {
    toast.error("Error", (error as any).response.data);
  }
};
