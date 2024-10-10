/* eslint-disable prefer-const */
import useSWR, { mutate } from "swr";
import { axiosInstance, fetcher } from "../utils/utils";
import { toast } from "sonner";
import { IProduct } from "../interfaces/IProducts";
import axios from "axios";

export const getAllProcuts = (date?: string) => {
  const endpoint = date
    ? `${import.meta.env.VITE_BASE_API}/products?date=${date}`
    : `${import.meta.env.VITE_BASE_API}/products`;
  let { data, error, isLoading, isValidating } = useSWR(endpoint, fetcher);

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

export const addProducts = async (data: any) => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_API}/products/add`,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status.toString().startsWith("20")) {
      toast.success("Successfully Added Products");
      mutate(`${import.meta.env.VITE_BASE_API}/products`);
    } else {
      toast.error("Failed to Add Products");
    }
  } catch (error) {
    console.error(error);
  }
};

export const getProductsById = (id: string, date?: string) => {
  const endpoint = date
    ? `${import.meta.env.VITE_BASE_API}/products/${id}?date=${date}`
    : `${import.meta.env.VITE_BASE_API}/products/${id}`;

  let { data, error, isLoading, isValidating } = useSWR(endpoint, fetcher);

  if (!isLoading && error) {
    toast.error("Gagal mengambil data");
  }

  return {
    data: data?.product as IProduct,
    error,
    isLoading,
    isValidating,
  };
};

export const deleteProduct = async (id: string) => {
  try {
    const response = await axiosInstance().delete(
      `${import.meta.env.VITE_BASE_API}/products/delete/${id}`
    );

    if (response.status.toString().startsWith("20")) {
      toast.success("Successfully Deleted Product");
      mutate(`${import.meta.env.VITE_BASE_API}/products`);
    } else {
      toast.error("Failed to Delete Product");
    }
  } catch (error) {
    console.error(error);
  }
};

export const uploadPicture = async (data: any): Promise<any> => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_API}/product/upload-photo`,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
        },
      }
    );

    if (response.status.toString().startsWith("20")) {
      return response.data.data.url;
    } else {
      toast.error("Failed to Add Products");
    }
  } catch (error) {
    console.error(error);
  }
};

export const updateProduct = async (id: string, data: any) => {
  try {
    const response = await axiosInstance().put(
      `${import.meta.env.VITE_BASE_API}/products/edit/${id}`,
      data
    );

    if (response.status.toString().startsWith("20")) {
      toast.success("Successfully Updated Product");
      mutate(`${import.meta.env.VITE_BASE_API}/products`);
    } else {
      toast.error("Failed to Update Product");
    }
  } catch (error) {
    console.error(error);
  }
};

export const getRandomProducts = () => {
  const endpoint = `${import.meta.env.VITE_BASE_API}/products/random`;
  let { data, error, isLoading, isValidating } = useSWR(endpoint, fetcher);

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

export const getCakesProducts = () => {
  const endpoint = `${import.meta.env.VITE_BASE_API}/products/cakes`;
  let { data, error, isLoading, isValidating } = useSWR(endpoint, fetcher);

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

export const getRotiProducts = () => {
  const endpoint = `${import.meta.env.VITE_BASE_API}/products/roti`;
  let { data, error, isLoading, isValidating } = useSWR(endpoint, fetcher);

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

export const getMinumanProducts = () => {
  const endpoint = `${import.meta.env.VITE_BASE_API}/products/minuman`;
  let { data, error, isLoading, isValidating } = useSWR(endpoint, fetcher);

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

export const getHampersProducts = () => {
  const endpoint = `${import.meta.env.VITE_BASE_API}/products/hampers`;
  let { data, error, isLoading, isValidating } = useSWR(endpoint, fetcher);

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

export const getSnackProducts = () => {
  const endpoint = `${import.meta.env.VITE_BASE_API}/products/snack`;
  let { data, error, isLoading, isValidating } = useSWR(endpoint, fetcher);

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

export const getTopProducts = () => {
  const endpoint = `${import.meta.env.VITE_BASE_API}/products/getTopProduct`;
  let { data, error, isLoading, isValidating } = useSWR(endpoint, fetcher);

  if (!isLoading && error) {
    toast.error("Gagal mengambil data produk teratas");
  }

  return {
    data: data?.products as IProduct[],
    error,
    isLoading,
    isValidating,
  };
};
