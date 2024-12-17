import { QueryClient, useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/constants";
import { MainInfoData } from "@/types/main";
import { getMainInfo } from "@/api/main/main";
import { UseQueryCustomOptions } from "@/types";

export { useGetMainInfo, prefetchGetMainInfo }

const getMainInfoQueryKey = [queryKeys.MAIN.BASE, queryKeys.MAIN.GET_MAIN_INFO];

function useGetMainInfo(queryOptions?: UseQueryCustomOptions<MainInfoData>) {
  return useQuery<MainInfoData>({
    queryKey: getMainInfoQueryKey,
    queryFn: getMainInfo,
    ...queryOptions,
  });
}

async function prefetchGetMainInfo(queryClient: QueryClient) {
  await queryClient.prefetchQuery<MainInfoData>({
    queryKey: getMainInfoQueryKey,
    queryFn: getMainInfo,
  });
}