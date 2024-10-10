import useSWR, { mutate } from "swr";
import { axiosInstance, fetcher } from "../utils/utils";
import { toast } from "sonner";
import { IEmployee } from "../interfaces/IEmployee";

export const getAllEmployee = () => {
  let { data, error, isLoading, isValidating, mutate } = useSWR(
    `${import.meta.env.VITE_BASE_API}/karyawan`,
    fetcher
  );

  if (!isLoading && error) {
    toast.error("Gagal mengambil data");
  }

  return {
    data: data?.karyawan as IEmployee[],
    error,
    isLoading,
    isValidating,
    mutate,
  };
};

export const getKaryawanById = (id: string) => {
  let { data, error, isLoading, isValidating, mutate } = useSWR(
    `${import.meta.env.VITE_BASE_API}/karyawan/${id}`,
    fetcher
  );

  if (!isLoading && error) {
    toast.error("Gagal mengambil data");
  }

  return {
    data: data?.karyawan as IEmployee,
    error,
    isLoading,
    isValidating,
    mutate,
  };
};

export const addEmployee = async (data: any) => {
  try {
    const response = await axiosInstance().post(
      `${import.meta.env.VITE_BASE_API}/karyawan/add`,
      {
        ...data,
      }
    );

    if (response.status.toString().startsWith("20")) {
      toast.success("Successfully Added Employee");
    } else {
      toast.error("Failed to Add Employee");
    }
  } catch (error) {
    console.error(error);
  }
};

export const getEmployeeById = (id: string) => {
  let { data, error, isLoading, isValidating, mutate } = useSWR(
    `${import.meta.env.VITE_BASE_API}/karyawan/${id}`,
    fetcher
  );

  if (!isLoading && error) {
    toast.error("Gagal mengambil data");
  }

  return {
    data: data?.karyawan as IEmployee,
    error,
    isLoading,
    isValidating,
    mutate,
  };
};

export const editEmployee = async (data: any, id: String) => {
  try {
    const response = await axiosInstance().put(
      `${import.meta.env.VITE_BASE_API}/karyawan/edit/${id}`,
      data
    );

    if (response.status.toString().startsWith("20")) {
      toast.success("Successfully Edited Employee");
      mutate(`${import.meta.env.VITE_BASE_API}/karyawan`);
    } else {
      toast.error("Failed to Edit Employee");
    }
  } catch (error) {
    console.error(error);
  }
};

export const deleteEmployee = async (id: string) => {
  try {
    const response = await axiosInstance().delete(
      `${import.meta.env.VITE_BASE_API}/karyawan/delete/${id}`
    );

    if (response.status.toString().startsWith("20")) {
      toast.success("Successfully Deleted Employee");
      mutate(`${import.meta.env.VITE_BASE_API}/karyawan`);
    } else {
      toast.error("Failed to Delete Employee");
    }
  } catch (error) {
    console.error(error);
    toast.error("An error occurred while deleting the employee");
  }
};
