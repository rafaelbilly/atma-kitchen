import useSWR from "swr";
import { axiosInstance, fetcher } from "../utils/utils";
import { toast } from "sonner";
import { IProduct } from "../interfaces/IProducts";
import { IRecipe } from "../interfaces/IRecipe";

export const getOwnProducts = () => {
  let { data, error, isLoading, isValidating } = useSWR(
    `${import.meta.env.VITE_BASE_API}/products/own-products`,
    fetcher
  );

  if (!isLoading && error) {
    toast.error("Gagal mengambil data");
  }

  return {
    data: data?.products as IProduct[],
    error,
    isLoading,
    isValidating,
  };
};

export const addRecipes = async (data: any) => {
  try {
    const response = await axiosInstance().post(
      `${import.meta.env.VITE_BASE_API}/recipes/add`,
      {
        ...data,
      }
    );

    if (response.status.toString().startsWith("20")) {
      toast.success("Successfully Added Recipes");
    } else {
      toast.error("Failed to Add Recipes");
    }
  } catch (error) {
    console.error(error);
  }
};

export const getRecipesById = (id: string) => {
  let { data, error, isLoading, isValidating } = useSWR(
    `${import.meta.env.VITE_BASE_API}/recipes/${id}`,
    fetcher
  );

  if (!isLoading && error) {
    toast.error("Gagal mengambil data");
  }

  return {
    data: data,
    error,
    isLoading,
    isValidating,
  };
};

export const editRecipes = async (id: string, data: any) => {
  try {
    const response = await axiosInstance().put(
      `${import.meta.env.VITE_BASE_API}/recipes/edit/${id}`,
      data
    );

    if (response.status.toString().startsWith("20")) {
      toast.success("Successfully Edited Recipes");
    } else {
      toast.error("Failed to Edit Recipes");
    }
  } catch (error) {
    console.error(error);
  }
};

export const getRecipesByTransactions = (transactionId: string) => {
  let { data, error, isLoading, isValidating } = useSWR(
    `${import.meta.env.VITE_BASE_API}/recipes-transactions/${transactionId}`,
    fetcher
  );

  if (!isLoading && error) {
    toast.error("Gagal mengambil data");
  }

  return {
    data: data?.ingredients as IRecipe[],
    error,
    isLoading,
    isValidating,
  };
};
