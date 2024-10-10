import { toast } from "sonner";
import useSWR, { mutate } from "swr";
import { ITransaction } from "../interfaces/ITransaction";
import { axiosInstance, fetcher } from "../utils/utils";

export const getAllTransactionByIdCustomer = (id: string) => {
  let { data, error, isLoading, isValidating, mutate } = useSWR(
    `${import.meta.env.VITE_BASE_API}/transaksi/customer/${id}`,
    fetcher
  );

  if (!isLoading && error) {
    toast.error("Gagal mengambil data");
  }

  return {
    data: data?.transaksi as ITransaction[],
    error,
    isLoading,
    isValidating,
    mutate,
  };
};

export const getAllTransactionAdminToDo = () => {
  let { data, error, isLoading, isValidating, mutate } = useSWR(
    `${import.meta.env.VITE_BASE_API}/transaksi-admin/todo`,
    fetcher
  );

  if (!isLoading && error) {
    toast.error("Gagal mengambil data");
  }

  return {
    data: data?.transaksi as ITransaction[],
    error,
    isLoading,
    isValidating,
    mutate,
  };
};

export const updateDeliveryRange = async (
  id: string,
  range: number,
  fee: number
) => {
  const body = {
    jarak_pengiriman: range,
    biaya_pengiriman: fee,
  };
  try {
    const response = await axiosInstance().put(
      `${import.meta.env.VITE_BASE_API}/delivery/edit/range/${id}`,
      {
        ...body,
      }
    );

    if (response.status.toString().startsWith("20")) {
      toast.success("Successfully Updated Delivery Range");
      mutate(`${import.meta.env.VITE_BASE_API}/transaksi-admin/todo`);
    }
  } catch (error) {
    console.log(error);

    toast.error(`Failed to update delivery range: ${error}`);
  }
};

export const getOnProcessTransaction = () => {
  let { data, error, isLoading, isValidating, mutate } = useSWR(
    `${import.meta.env.VITE_BASE_API}/transaksi-admin/on-process`,
    fetcher
  );

  if (!isLoading && error) {
    toast.error("Gagal mengambil data");
    console.log(error);
  }

  return {
    data: data?.transaksi as ITransaction[],
    error,
    isLoading,
    isValidating,
    mutate,
  };
};

export const getOnProcessTransactionToday = () => {
  let { data, error, isLoading, isValidating, mutate } = useSWR(
    `${import.meta.env.VITE_BASE_API}/transaksi-mo/on-process-today`,
    fetcher
  );

  if (!isLoading && error) {
    toast.error("Gagal mengambil data");
    console.log(error);
  }

  return {
    data: data?.transaksi as ITransaction[],
    error,
    isLoading,
    isValidating,
    mutate,
  };
};

export const updateTransactionReady = async (
  id: string,
  idCustomer: string,
  deliveryMethod: string
) => {
  switch (deliveryMethod) {
    case "Delivery":
      deliveryMethod = "delivered";
      break;
    case "Pickup":
      deliveryMethod = "picked up";
      break;
    default:
      deliveryMethod = "delivered or picked up";
      break;
  }
  try {
    const response = await axiosInstance().put(
      `${import.meta.env.VITE_BASE_API}/transaksi/ready/${id}`
    );

    if (response.status.toString().startsWith("20")) {
      //Send Notificatoin
      toast.success("Successfully Updated Transaction Status");
      await axiosInstance().post(
        `${import.meta.env.VITE_BASE_API}/notification/send/${idCustomer}`,
        {
          header: "Order Ready",
          message: `Your order is ready to be ${deliveryMethod}`,
        }
      );
      mutate(`${import.meta.env.VITE_BASE_API}/transaksi-admin/on-process`);
      mutate(`${import.meta.env.VITE_BASE_API}/transaksi-admin/ready`);
    }
  } catch (error) {
    console.log(error);

    toast.error(`Failed to update delivery range: ${error}`);
  }
};

export const addTransaction = async (data: any) => {
  try {
    const response = await axiosInstance().post(
      `${import.meta.env.VITE_BASE_API}/transaksi`,
      data
    );

    if (response.status.toString().startsWith("20")) {
      toast.success("Checkout success, Please wait for the admin to confirm");
    }
  } catch (error) {
    toast.error(`Failed to Checkout: ${error}`);
  }
};

export const getTransactionById = (id: string) => {
  let { data, error, isLoading, isValidating } = useSWR(
    `${import.meta.env.VITE_BASE_API}/transaksi/id/${id}`,
    fetcher
  );
  console.log(data);

  if (!isLoading && error) {
    toast.error("Gagal mengambil data");
  }

  return {
    data: data?.transaksi as ITransaction,
    error,
    isLoading,
    isValidating,
    mutate,
  };
};

export const getTransactionForMOTodo = () => {
  let { data, error, isLoading, isValidating, mutate } = useSWR(
    `${import.meta.env.VITE_BASE_API}/transaksi-mo/todo`,
    fetcher
  );

  if (!isLoading && error) {
    toast.error("Gagal mengambil data");
  }

  return {
    data: data?.transaksi as ITransaction[],
    error,
    isLoading,
    isValidating,
    mutate,
  };
};

export const getTransactionRejectedByMO = () => {
  let { data, error, isLoading, isValidating, mutate } = useSWR(
    `${import.meta.env.VITE_BASE_API}/transaksi-mo/reject`,
    fetcher
  );

  if (!isLoading && error) {
    toast.error("Gagal mengambil data");
  }

  return {
    data: data?.transaksi as ITransaction[],
    error,
    isLoading,
    isValidating,
    mutate,
  };
};

export const updateTransactionConfirmed = async (id: string) => {
  try {
    const response = await axiosInstance().put(
      `${import.meta.env.VITE_BASE_API}/transaksi-mo/accept/${id}`
    );

    if (response.status.toString().startsWith("20")) {
      toast.success("Successfully Confirm Transaction");
    }
  } catch (error) {
    toast.error(`Failed to confirm transaction: ${error}`);
  }
};

export const updateTransactionOnProcess = async (id: string) => {
  try {
    const response = await axiosInstance().put(
      `${import.meta.env.VITE_BASE_API}/transaksi-mo/on-process/${id}`
    );

    if (response.status.toString().startsWith("20")) {
      toast.success("Successfully Confirm Transaction");
    }
  } catch (error) {
    toast.error(`Failed to confirm transaction: ${error}`);
  }
};

export const updateTransactionReject = async (id: string) => {
  try {
    const response = await axiosInstance().put(
      `${import.meta.env.VITE_BASE_API}/transaksi-mo/reject/${id}`
    );

    if (response.status.toString().startsWith("20")) {
      toast.success("Successfully Reject Transaction");
    }
  } catch (error) {
    toast.error(`Failed to reject transaction: ${error}`);
  }
};

export const getTransactionReady = () => {
  let { data, error, isLoading, isValidating, mutate } = useSWR(
    `${import.meta.env.VITE_BASE_API}/transaksi-admin/ready`,
    fetcher
  );

  if (!isLoading && error) {
    toast.error("Gagal mengambil data");
  }

  return {
    data: data?.transaksi as ITransaction[],
    error,
    isLoading,
    isValidating,
    mutate,
  };
};

export const updateTransactionAfterReady = async (id: string) => {
  try {
    const response = await axiosInstance().put(
      `${import.meta.env.VITE_BASE_API}/transaksi-admin/after-ready/${id}`
    );

    if (response.status.toString().startsWith("20")) {
      toast.success("Successfully Update Transaction Status");
      mutate(`${import.meta.env.VITE_BASE_API}/transaksi-admin/ready`);
    }
  } catch (error) {
    toast.error(`Failed to reject transaction: ${error}`);
  }
};

export const updateTransactionCompleted = async (id: string) => {
  try {
    const response = await axiosInstance().put(
      `${import.meta.env.VITE_BASE_API}/transaksi/completed/${id}`
    );

    if (response.status.toString().startsWith("20")) {
      toast.success(
        "Successfully completed the transaction, Thank you for shopping with us"
      );
      mutate(`${import.meta.env.VITE_BASE_API}/transaksi/id/${id}`);
      mutate(
        `${
          import.meta.env.VITE_BASE_API
        }/transaksi/customer/${localStorage.getItem("customer_id")}`
      );
    }
  } catch (error) {
    toast.error(`Failed to confirm transaction: ${error}`);
  }
};

export const getTransactionCancelled = () => {
  let { data, error, isLoading, isValidating, mutate } = useSWR(
    `${import.meta.env.VITE_BASE_API}/transaksi-cancelled`,
    fetcher
  );

  if (!isLoading && error) {
    toast.error("Gagal mengambil data");
  }

  return {
    data: data?.transaksi as ITransaction[],
    error,
    isLoading,
    isValidating,
    mutate,
  };
};

export const cancelledOrders = async () => {
  try {
    const response = await axiosInstance().put(
      `${import.meta.env.VITE_BASE_API}/transaksi/cancelled`
    );

    if (response.status.toString().startsWith("20")) {
      toast.success("Successfully cancelled all late payment transaction");
      mutate(`${import.meta.env.VITE_BASE_API}/transaksi-cancelled`);
    }
  } catch (error) {
    toast.error(`Failed to confirm transaction: ${error}`);
  }
};
