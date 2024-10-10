import { toast } from "sonner";
import { mutate } from "swr";
import { axiosInstance } from "../utils/utils";

export const addIngredientUse = async (data: any) => {
  try {
    const response = await axiosInstance().post(
      `${import.meta.env.VITE_BASE_API}/penggunaan-bahan-baku/add`,
      {
        ...data,
      }
    );
    console.log(response);

    if (response.status.toString().startsWith("20")) {
      toast.success("Successfully Added Ingredient Use");
      mutate(`${import.meta.env.VITE_BASE_API}/penggunaan-bahan-baku`);
    } else {
      toast.error("Failed to Add Ingredient Use");
    }
  } catch (error) {
    console.error(error);
  }
};
