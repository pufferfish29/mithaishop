import { GetRequest } from "@/lib/axios/axios";
import { baseUrl } from "@/lib/baseUrl";
import {
  SalesClientResponse,
  TopSellingProductResponse,
  WeeklySalesResponse,
} from "@/types/Sales";

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
        withCredentials: true,
      }
    );

    return response.data as SalesClientResponse;
  } catch (error) {
    throw error;
  }
};

export const getWeeklySalesData = async (token: string | undefined) => {
  try {
    const response = await GetRequest(
      `${baseUrl}/sale/weeklysale`,
      {},
      {
        withCredentials: true,
      }
    );

    return response.data as WeeklySalesResponse[];
  } catch (error) {
    throw error;
  }
};

export const getWeeklySales = async (
  week: number,
  limit: number,
  token: string | undefined
) => {
  try {
    const response = await GetRequest(
      `${baseUrl}/sale?day=${week}week`,
      {},
      {
        withCredentials: true,
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
        withCredentials: true,
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
        withCredentials: true,
      }
    );

    return response.data as SalesClientResponse;
  } catch (error) {
    throw error;
  }
};

export const topSellingProducts = async (
  day = 7,
  limit = 10,
  token: string | undefined
) => {
  try {
    const response = await GetRequest(
      `${baseUrl}/product/top/sales?day=${day}day`,
      {},
      {
        withCredentials: true,
      }
    );

    return response.data as TopSellingProductResponse[];
  } catch (error) {
    throw error;
  }
};
