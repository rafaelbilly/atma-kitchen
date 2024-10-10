/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable prefer-const */
import useSWR, { mutate } from "swr";
import { axiosInstance, fetcher } from "../utils/utils";
import { toast } from "sonner";
import { IHampers } from "../interfaces/IHampers";

export const getAllHampers = () => {
  let { data, error, isLoading, isValidating } = useSWR(
    `${import.meta.env.VITE_BASE_API}/hampers`,
    fetcher
  );

  if (!isLoading && error) {
    toast.error("Gagal mengambil data");
  }

  return {
    data: data?.hampers as IHampers[],
    error,
    isLoading,
    isValidating,
  };
};

export const addHampers = async (data: any) => {
  try {
    const response = await axiosInstance().post(
      `${import.meta.env.VITE_BASE_API}/hampers/add`,
      data
    );
    if (response.status.toString().startsWith("20")) {
      toast.success("Successfully Added Hampers");
      mutate(`${import.meta.env.VITE_BASE_API}/hampers`);
    } else {
      toast.error("Failed to Add Products");
    }
  } catch (error) {
    console.error(error);
  }
};

export const deleteHampers = async (id: string) => {
  try {
    const response = await axiosInstance().delete(
      `${import.meta.env.VITE_BASE_API}/hampers/delete/${id}`
    );
    console.log(response);

    if (response.status.toString().startsWith("20")) {
      toast.success("Successfully Deleted Hampers");
      mutate(`${import.meta.env.VITE_BASE_API}/hampers`);
    } else {
      toast.error("Failed to Delete Hampers");
    }
  } catch (error) {
    console.error(error);
  }
};

export const getHampersById = (id: string) => {
  let { data, error, isLoading, isValidating } = useSWR(
    `${import.meta.env.VITE_BASE_API}/hampers/${id}`,
    fetcher
  );

  if (!isLoading && error) {
    toast.error("Gagal mengambil data");
  }

  return {
    data: data?.hampers,
    error,
    isLoading,
    isValidating,
  };
};

export const editHampers = async (id: string, data: any) => {
  try {
    const response = await axiosInstance().put(
      `${import.meta.env.VITE_BASE_API}/hampers/edit/${id}`,
      data
    );
    if (response.status.toString().startsWith("20")) {
      toast.success("Successfully Updated Hampers");
      mutate(`${import.meta.env.VITE_BASE_API}/hampers`);
    } else {
      toast.error("Failed to Update Hampers");
    }
  } catch (error) {
    console.error(error);
  }
};
