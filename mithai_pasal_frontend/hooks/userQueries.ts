import { getAllUsers } from "@/apicalls/client/user";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export const useGetUsers = (
  token: string | undefined,
  pageParams: number,
  limit: number
) => {
  const { data, isLoading, isPending } = useQuery({
    queryKey: ["users", pageParams, limit],
    queryFn: () => getAllUsers(token, pageParams, limit),
    placeholderData: keepPreviousData,
    enabled: !!token,
  });

  return {
    data,
    isLoading,
    isPending,
  };
};
