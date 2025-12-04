import { GetRequest } from "@/lib/axios/axios";
import { baseUrl } from "@/lib/baseUrl";

export const getAllUsers = async (
  token: string | undefined,
  pageParams: number,
  limit: number
) => {
  try {
    const response = await fetch(`${baseUrl}/auth/users`, {
      method: "GET",
      // headers: {
      //   "Content-Type": "application/json",
      //   Authorization: `Bearer ${token}`,
      // },
      credentials: "include",
    });
    const data = await response.json();

    return data;
  } catch (error) {
    throw error;
  }
};
