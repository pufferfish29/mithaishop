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
      `${baseUrl}/sale?day=${day}day`,
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
  week = 1,
  limit = 10,
  token: string | undefined
) => {
  try {
    const response = await GetRequest(
      `${baseUrl}/sale?day=${week}week`,
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

export const getMonthlySales = async (
  month = 1,
  limit = 10,
  token: string | undefined
) => {
  try {
    const response = await GetRequest(
      `${baseUrl}/sale?day=${month}month`,
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
      `${baseUrl}/sale?day=${month}month`,
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
