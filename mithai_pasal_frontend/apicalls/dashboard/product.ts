"use server";

import axiosInstance from "@/lib/axios/interceptor";
import { baseUrl } from "@/lib/baseUrl";
import { productType } from "@/types/Product";

export const addProduct = async (data: productType) => {
  try {
    const response = await axiosInstance.post(`${baseUrl}/product`, data, {
      withCredentials: true,
    });
    if (response.status !== 201) {
      return {
        status: response.status,
        var: response?.data,
      };
    }

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

export const deleteProductById = async (id: string) => {
  try {
    const response = await axiosInstance.delete(`${baseUrl}/product/${id}`, {
      withCredentials: true,
    });
    if (response.status !== 200) {
      return {
        status: response.status,
      };
    }

    return {
      status: response.status,
    };
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Internal server error";
    console.log(errorMessage);
  }
};
