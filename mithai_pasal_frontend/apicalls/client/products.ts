import { GetRequest } from "@/lib/axios/axios";
import { baseUrl } from "@/lib/baseUrl";
import { productGetResponseType } from "@/types/Product";

export const getAllProducts = async (
  pageParams = 1,
  limit = 10,
  token: string | undefined
) => {
  try {
    const response = await fetch(`${baseUrl}/product?page=${pageParams}`, {
      method: "GET",
      // headers: {
      //   "Content-Type": "application/json",
      //   Authorization: `Bearer ${token}`,
      // },
      credentials: "include",
    });
    const data = await response.json();

    return data as productGetResponseType;
  } catch (error) {
    throw error;
  }
};
