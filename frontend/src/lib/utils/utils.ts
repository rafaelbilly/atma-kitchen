import axios from "axios";
import { ICustomer } from "../interfaces/ICustomer";

export const fetcher = async (url: string) => {
  const token = localStorage.getItem("token");

  try {
    const response = await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data;
  } catch (error) {
    console.error(error);
  }
};

export const axiosInstance = () => {
  const token = localStorage.getItem("token");

  const axiosClient = axios.create({
    baseURL: `${import.meta.env.VITE_BASE_API}`,
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return axiosClient;
};

export const localCustomer = () => {
  return JSON.parse(localStorage.getItem("customer_id") || "{}")
    .customer as ICustomer;
};
