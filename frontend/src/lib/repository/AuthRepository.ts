import axios, { AxiosResponse } from "axios";
import { toast } from "sonner";
import { mutate } from "swr";

export const login = async (data: any): Promise<AxiosResponse<any, any>> => {
  var response;
  try {
    response = await axios.post(
      `${import.meta.env.VITE_BASE_API}/login`,
      {
        ...data,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    toast.error("Username or password invalid!");
  }

  return response!;
};

export const register = async (data: any) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_API}/register`,
      {
        ...data,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const send = async (data: any) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_API}/reset-password`,
      {
        ...data,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const isUsernameAvailable = async (username: string) => {
  const response = await axios.get(
    `${import.meta.env.VITE_BASE_API}/auth/usermame/is-available/${username}`
  );
  return response.data.success;
};

export const isEmailAvailable = async (email: string) => {
  const response = await axios.get(
    `${import.meta.env.VITE_BASE_API}/auth/email/is-available/${email}`
  );
  return response.data.success;
};

export const isEmailVerified = async (username: string) => {
  const response = await axios.get(
    `${import.meta.env.VITE_BASE_API}/auth/email/is-verified/${username}`
  );
  return response.data.success;
};

export const editEmployee = async (data: any, id: String) => {
  try {
    const response = await axios.put(
      `${import.meta.env.VITE_BASE_API}/karyawan/edit/${id}`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer uA9DY4RBb5IUrR8sF4ZIG3DyjbNjDP6MF4z9FbNYe40a13b5",
        },
      }
    );

    if (response.status === 200) {
      toast.success("Successfully Edited Employee");
      mutate(`${import.meta.env.VITE_BASE_API}/employee`);
    } else {
      toast.error("Failed to Edit Employee");
    }
  } catch (error) {
    console.error(error);
  }
};

export const deleteEmployee = async (id: string) => {
  try {
    const response = await axios.delete(
      `${import.meta.env.VITE_BASE_API}/karyawan/delete/${id}`,
      {
        headers: {
          Authorization:
            "Bearer uA9DY4RBb5IUrR8sF4ZIG3DyjbNjDP6MF4z9FbNYe40a13b5",
        },
      }
    );

    if (response.status === 200) {
      toast.success("Successfully Deleted Employee");
    } else {
      toast.error("Failed to Delete Employee");
    }
  } catch (error) {
    console.error(error);
    toast.error("An error occurred while deleting the employee");
  }
};

export const getProfile = async () => {
  const response = await axios.get(
    `${import.meta.env.VITE_BASE_API}/auth/profile`
  );
  return response.data.data;
};
