import { getAllProducts } from "@/apicalls/client/products";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export const useGetAllProducts = (
  token: string | undefined,
  pageParams: number,
  limit: number
) => {
  const { data, isPending, isLoading } = useQuery({
    queryKey: ["products", pageParams, limit],
    queryFn: () => getAllProducts(pageParams, limit, token),
    placeholderData: keepPreviousData,
    enabled: !!token,
  });

  return {
    data,
    isLoading,
    isPending,
  };
};
