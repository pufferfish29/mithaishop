import { GetRequest } from "@/lib/axios/axios";
import { baseUrl } from "@/lib/baseUrl";
import { SalesClientResponse } from "@/types/Sales";

export const getDailySales = async (
  day = 1,
  limit = 10,
  token: string | undefined
) => {
  try {
    const response = await GetRequest(
      `${baseUrl}/sales?day=${day}day`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data as SalesClientResponse;
  } catch (error) {
    throw error;
  }
};

export const getWeeklySales = async (
  day = 1,
  limit = 10,
  token: string | undefined
) => {
  try {
    const response = await GetRequest(
      `${baseUrl}/sales?day=${day}week`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data as SalesClientResponse;
  } catch (error) {
    throw error;
  }
};

export const getmonthlySales = async (
  month = 1,
  limit = 10,
  token: string | undefined
) => {
  try {
    const response = await GetRequest(
      `${baseUrl}/sales?day=${month}month`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data as SalesClientResponse;
  } catch (error) {
    throw error;
  }
};

export const getThreeMonthSales = async (
  month = 1,
  limit = 10,
  token: string | undefined
) => {
  try {
    const response = await GetRequest(
      `${baseUrl}/sales?day=${month}month`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data as SalesClientResponse;
  } catch (error) {
    throw error;
  }
};
