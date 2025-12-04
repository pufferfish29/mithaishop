"use server";

import axiosInstance from "@/lib/axios/interceptor";
import { baseUrl } from "@/lib/baseUrl";
import { UserAddFormInterface } from "@/types/User";

export async function addUser(data: UserAddFormInterface, acccess: string) {
  if (!acccess) {
    throw new Error("Unauthorized");
  }

  try {
    const response = await axiosInstance.post(`${baseUrl}/auth/signup`, data, {
      withCredentials: true,
    });

    console.log(response);
    const val = await response.data;

    if (response.status == 201) {
      return {
        status: response.status,
        value: val,
      };
    }

    return {
      status: response.status,
      value: val,
    };
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Internal server error";
    console.log(errorMessage);
  }
}
