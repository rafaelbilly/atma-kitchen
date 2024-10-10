import useSWR, { mutate } from "swr";
import { axiosInstance, fetcher } from "../utils/utils";
import { toast } from "sonner";
import { IProfile } from "../interfaces/IProfile";
import { IProfileCustomer } from "../interfaces/IProfileCustomer";

export const getProfile = () => {
  let { data, error, isLoading, isValidating, mutate } = useSWR(
    `${import.meta.env.VITE_BASE_API}/auth/user`,
    fetcher
  );

  if (!isLoading && error) {
    toast.error("Gagal mengambil data");
  }

  return {
    data: data?.user as IProfile,
    error,
    isLoading,
    isValidating,
    mutate,
  };
};

export const getProfileCustomer = () => {
  let { data, error, isLoading, isValidating, mutate } = useSWR(
    `${import.meta.env.VITE_BASE_API}/auth/profile`,
    fetcher
  );

  // console.log(data);

  if (!isLoading && error) {
    toast.error("Gagal mengambil data");
  }

  return {
    data: data?.customer as IProfileCustomer,
    error,
    isLoading,
    isValidating,
    mutate,
  };
};

export const changePassword = async (data: any) => {
  try {
    const response = await axiosInstance().post(
      `${import.meta.env.VITE_BASE_API}/auth/user/change-password`,
      {
        ...data,
      }
    );

    if (response.status.toString().startsWith("20")) {
      toast.success("Successfully Change Password");
    } else {
      toast.error("Failed to Change Password");
    }
  } catch (error) {
    toast.error("Current Password doesn't Match the Old Password ");
  }
};

export const editProfile = async (data: any, id: String) => {
  try {
    const response = await axiosInstance().put(
      `${import.meta.env.VITE_BASE_API}/auth/user/edit-profile/${id}`,
      data
    );

    if (response.status === 200) {
      toast.success("Successfully Edited Customer");
      mutate(`${import.meta.env.VITE_BASE_API}/profile`);
    } else {
      toast.error("Failed to Edit Customer");
    }
  } catch (error) {
    console.error(error);
  }
};
