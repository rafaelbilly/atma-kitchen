import useSWR, { mutate } from "swr";
import { axiosInstance, fetcher } from "../utils/utils";
import { toast } from "sonner";
import { IIngredients } from "../interfaces/IIngredients";

export const getAllIngredients = () => {
  let { data, error, isLoading, isValidating, mutate } = useSWR(
    `${import.meta.env.VITE_BASE_API}/ingredients`,
    fetcher
  );

  if (!isLoading && error) {
    toast.error("Gagal mengambil data");
  }

  return {
    data: data?.ingredients as IIngredients[],
    error,
    isLoading,
    isValidating,
    mutate,
  };
};

export const getIngredientsById = (id: string) => {
  let { data, error, isLoading, isValidating, mutate } = useSWR(
    `${import.meta.env.VITE_BASE_API}/ingredients/${id}`,
    fetcher
  );

  if (!isLoading && error) {
    toast.error("Gagal mengambil data");
  }

  return {
    data: data?.ingredient as IIngredients,
    error,
    isLoading,
    isValidating,
    mutate,
  };
};

export const addIngredients = async (data: any) => {
  try {
    const response = await axiosInstance().post(
      `${import.meta.env.VITE_BASE_API}/ingredients/add`,
      {
        ...data,
      }
    );
    console.log(response);

    if (response.status.toString().startsWith("20")) {
      toast.success("Successfully Added Ingredients");
      mutate(`${import.meta.env.VITE_BASE_API}/ingredients`);
    } else {
      toast.error("Failed to Add Ingredients");
    }
  } catch (error) {
    console.error(error);
  }
};

export const editIngredients = async (data: any, id: String) => {
  try {
    const response = await axiosInstance().put(
      `${import.meta.env.VITE_BASE_API}/ingredients/edit/${id}`,
      data
    );

    if (response.status === 200) {
      toast.success("Successfully Edited Ingredients");
      mutate(`${import.meta.env.VITE_BASE_API}/ingredients`);
    } else {
      toast.error("Failed to Edit Ingredients");
    }
  } catch (error) {
    console.error(error);
  }
};

export const deleteIngredient = async (id: string) => {
  try {
    const response = await axiosInstance().delete(
      `${import.meta.env.VITE_BASE_API}/ingredients/delete/${id}`
    );

    if (response.status === 200) {
      toast.success("Successfully Deleted Ingredient");
      mutate(`${import.meta.env.VITE_BASE_API}/ingredients`);
    } else {
      toast.error("Failed to Delete Ingredient");
    }
  } catch (error) {
    console.error(error);
    toast.error("An error occurred while deleting the ingredient");
  }
};

export const getLowIngredients = () => {
  let { data, error, isLoading, isValidating, mutate } = useSWR(
    `${import.meta.env.VITE_BASE_API}/low-ingredeints`,
    fetcher
  );

  if (!isLoading && error) {
    toast.error("Gagal mengambil data");
  }

  return {
    data: data?.ingredients as IIngredients[],
    error,
    isLoading,
    isValidating,
    mutate,
  };
};
