import {
  getDailySales,
  getMonthlySales,
  getThreeMonthSales,
  getWeeklySales,
  getWeeklySalesData,
  topSellingProducts,
} from "@/apicalls/client/sales";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export const useGetTodaySales = (
  token: string | undefined,
  pageParams: number,
  limit: number,
  day: number
) => {
  const { data, isLoading, isPending } = useQuery({
    queryKey: ["salesToday", pageParams, limit],
    queryFn: () => getDailySales(day, limit, token),
    placeholderData: keepPreviousData,
    enabled: !!token,
  });

  return {
    data,
    isLoading,
    isPending,
  };
};

export const useGetWeekSales = (
  token: string | undefined,
  pageParams: number,
  limit: number,
  week: number
) => {
  const { data, isLoading, isPending } = useQuery({
    queryKey: ["salesWeekly", pageParams, limit],
    queryFn: () => getWeeklySales(week, limit, token),
    placeholderData: keepPreviousData,
    enabled: !!token,
  });

  return {
    data,
    isLoading,
    isPending,
  };
};

export const useGetWeekSalesData = (token: string | undefined) => {
  const { data, isLoading, isPending } = useQuery({
    queryKey: ["salesWeekly"],
    queryFn: () => getWeeklySalesData(token),
    placeholderData: keepPreviousData,
    enabled: !!token,
  });

  return {
    data,
    isLoading,
    isPending,
  };
};

export const useGetMonthSales = (
  token: string | undefined,
  pageParams: number,
  limit: number,
  month: number
) => {
  const { data, isLoading, isPending } = useQuery({
    queryKey: ["salesMonthly", pageParams, limit],
    queryFn: () => getMonthlySales(month, limit, token),
    placeholderData: keepPreviousData,
    enabled: !!token,
  });

  return {
    data,
    isLoading,
    isPending,
  };
};

export const useGetThreeMonthlySales = (
  token: string | undefined,
  pageParams: number,
  limit: number,
  month: number
) => {
  const { data, isLoading, isPending } = useQuery({
    queryKey: ["salesThreeMonth", pageParams, limit],
    queryFn: () => getThreeMonthSales(month, limit, token),
    placeholderData: keepPreviousData,
    enabled: !!token,
  });

  return {
    data,
    isLoading,
    isPending,
  };
};

export const useGetTopSellingProducts = (
  token: string | undefined,
  pageParams: number,
  limit: number,
  day: number
) => {
  const { data, isLoading, isPending } = useQuery({
    queryKey: ["topSales", pageParams, limit],
    queryFn: () => topSellingProducts(day, limit, token),
    placeholderData: keepPreviousData,
    enabled: !!token,
  });

  return {
    data,
    isLoading,
    isPending,
  };
};
