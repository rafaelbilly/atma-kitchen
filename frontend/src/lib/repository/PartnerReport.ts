import { toast } from "sonner";
import useSWR from "swr";
import { IPartnerReport } from "../interfaces/IPartnerReport";
import { fetcher } from "../utils/utils";

export const getAllPartnerReport = (year: string, month: string) => {
  let { data, error, isLoading, isValidating, mutate } = useSWR(
    `${
      import.meta.env.VITE_BASE_API
    }/laporan/partner-transaction-reports?year=${year}&month=${month}`,
    fetcher
  );

  console.log(data);

  if (!isLoading && error) {
    toast.error("Gagal mengambil data");
  }

  return {
    data: data?.Report as IPartnerReport[],
    error,
    isLoading,
    isValidating,
    mutate,
  };
};
