import useSWR, { mutate } from "swr";
import { axiosInstance, fetcher } from "../utils/utils";
import { toast } from "sonner";
import { IIngredientPurchase } from "../interfaces/IIngredientPurchase";

export const getAllIngredientPurchase = () => {
  let { data, error, isLoading, isValidating, mutate } = useSWR(
    `${import.meta.env.VITE_BASE_API}/pembelian-bahan-baku`,
    fetcher
  );
  console.log(data);

  if (!isLoading && error) {
    toast.error("Gagal mengambil data");
  }

  return {
    data: data?.pembelian_bahan_baku as IIngredientPurchase[],
    error,
    isLoading,
    isValidating,
    mutate,
  };
};

export const getIngredientPurchaseById = (id: string) => {
  let { data, error, isLoading, isValidating, mutate } = useSWR(
    `${import.meta.env.VITE_BASE_API}/pembelian-bahan-baku/${id}`,
    fetcher
  );

  if (!isLoading && error) {
    toast.error("Gagal mengambil data");
  }

  return {
    data: data?.pembelian_bahan_baku as IIngredientPurchase,
    error,
    isLoading,
    isValidating,
    mutate,
  };
};

export const addIngredientPurchase = async (data: any) => {
  try {
    const response = await axiosInstance().post(
      `${import.meta.env.VITE_BASE_API}/pembelian-bahan-baku/add`,
      {
        ...data,
      }
    );
    console.log(response);

    if (response.status.toString().startsWith("20")) {
      toast.success("Successfully Added Ingredient Purchase");
      mutate(`${import.meta.env.VITE_BASE_API}/pembelian-bahan-baku`);
    } else {
      toast.error("Failed to Add Ingredient Purchase");
    }
  } catch (error) {
    console.error(error);
  }
};

export const editIngredientPurchase = async (data: any, id: String) => {
  try {
    const response = await axiosInstance().put(
      `${import.meta.env.VITE_BASE_API}/pembelian-bahan-baku/edit/${id}`,
      data
    );

    if (response.status === 200) {
      toast.success("Successfully Edited Ingredient Purchase");
      mutate(`${import.meta.env.VITE_BASE_API}/pembelian-bahan-baku`);
    } else {
      toast.error("Failed to Edit Ingredient Purchase");
    }
  } catch (error) {
    console.error(error);
  }
};

export const deleteIngredientPurchase = async (id: string) => {
  try {
    const response = await axiosInstance().delete(
      `${import.meta.env.VITE_BASE_API}/pembelian-bahan-baku/delete/${id}`
    );

    if (response.status === 200) {
      toast.success("Successfully Deleted Ingredient Purchase");
      mutate(`${import.meta.env.VITE_BASE_API}/pembelian-bahan-baku`);
    } else {
      toast.error("Failed to Delete Ingredient Purchase");
    }
  } catch (error) {
    console.error(error);
    toast.error("An error occurred while deleting the ingredient purchase");
  }
};
