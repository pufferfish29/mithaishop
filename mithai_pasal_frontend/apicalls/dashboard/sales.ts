"use server";

import axiosInstance from "@/lib/axios/interceptor";
import { baseUrl } from "@/lib/baseUrl";
import { SalesDataResponse } from "@/types/Sales";

export const addSales = async (data: SalesDataResponse) => {
  try {
    const response = await axiosInstance.post(`${baseUrl}/sale`, data, {
      withCredentials: true,
    });
    if (response.status !== 201) {
      return {
        status: response.status,
        var: response?.data,
      };
    }
    console.log(response);

    return {
      status: response.status,
      var: response?.data,
    };
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Internal server error";
    console.log(errorMessage);
  }
};
