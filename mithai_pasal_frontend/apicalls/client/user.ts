import { GetRequest } from "@/lib/axios/axios";
import { baseUrl } from "@/lib/baseUrl";

export const getAllUsers = async (
  token: string | undefined,
  pageParams: number,
  limit: number
) => {
  try {
    const response = await GetRequest(
      `${baseUrl}/auth/users`,
      {},
      {
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};
