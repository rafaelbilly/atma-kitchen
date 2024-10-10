import { toast } from "sonner";
import useSWR from "swr";
import { IAttendanceReport } from "../interfaces/IAttendanceReport";
import { fetcher } from "../utils/utils";

export const getAllAttendanceReport = (year: string, month: string) => {
  let { data, error, isLoading, isValidating, mutate } = useSWR(
    `${
      import.meta.env.VITE_BASE_API
    }/laporan/attendance-report?year=${year}&month=${month}`,
    fetcher
  );

  console.log(data);

  if (!isLoading && error) {
    toast.error("Gagal mengambil data");
  }

  return {
    data: data as IAttendanceReport[],
    error,
    isLoading,
    isValidating,
    mutate,
  };
};
