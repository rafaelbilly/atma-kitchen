import useSWR, { mutate } from "swr";
import { axiosInstance, fetcher } from "../utils/utils";
import { toast } from "sonner";
import { IOtherExpenses } from "../interfaces/IOtherExpenses";

export const getAllOtherExpenses = () => {
  let { data, error, isLoading, isValidating, mutate } = useSWR(
    `${import.meta.env.VITE_BASE_API}/pengeluaran-lain-lain`,
    fetcher
  );
  console.log(data);

  if (!isLoading && error) {
    toast.error("Gagal mengambil data");
  }

  return {
    data: data?.pengeluaranLainLain as IOtherExpenses[],
    error,
    isLoading,
    isValidating,
    mutate,
  };
};

export const getOtherExpensesById = (id: string) => {
  let { data, error, isLoading, isValidating, mutate } = useSWR(
    `${import.meta.env.VITE_BASE_API}/pengeluaran-lain-lain/${id}`,
    fetcher
  );

  if (!isLoading && error) {
    toast.error("Gagal mengambil data");
  }

  return {
    data: data?.pengeluaranLainLain as IOtherExpenses,
    error,
    isLoading,
    isValidating,
    mutate,
  };
};

export const addOtherExpenses = async (data: any) => {
  try {
    const response = await axiosInstance().post(
      `${import.meta.env.VITE_BASE_API}/pengeluaran-lain-lain/add`,
      {
        ...data,
      }
    );
    console.log(response);

    if (response.status.toString().startsWith("20")) {
      toast.success("Successfully Added Other Expenses");
      mutate(`${import.meta.env.VITE_BASE_API}/other-expenses`);
    } else {
      toast.error("Failed to Add Other Expenses");
    }
  } catch (error) {
    console.error(error);
  }
};

export const editOtherExpenses = async (data: any, id: String) => {
  try {
    const response = await axiosInstance().put(
      `${import.meta.env.VITE_BASE_API}/pengeluaran-lain-lain/edit/${id}`,
      data
    );

    if (response.status === 200) {
      toast.success("Successfully Edited Other Expense");
      mutate(`${import.meta.env.VITE_BASE_API}/pengeluaran-lain-lain`);
    } else {
      toast.error("Failed to Edit Other Expense");
    }
  } catch (error) {
    console.error(error);
  }
};

export const deleteOtherExpenses = async (id: string) => {
  try {
    const response = await axiosInstance().delete(
      `${import.meta.env.VITE_BASE_API}/pengeluaran-lain-lain/delete/${id}`
    );

    if (response.status === 200) {
      toast.success("Successfully Deleted Other Expenese");
      mutate(`${import.meta.env.VITE_BASE_API}/pengeluaran-lain-lain`);
    } else {
      toast.error("Failed to Delete Other Expenses");
    }
  } catch (error) {
    console.error(error);
    toast.error("An error occurred while deleting the other expense");
  }
};
