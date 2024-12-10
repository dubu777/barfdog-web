import { QueryClient, useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/constants";
import { MainInfoData } from "@/types/main";
import { getMainInfo } from "@/api/main/main";

export { useGetMainInfo, prefetchGetMainInfo }

const getMainInfoQueryKey = [queryKeys.MAIN, queryKeys.GET_MAIN_INFO];

function useGetMainInfo() {
  const queryClient = useQueryClient();
  return useQuery<MainInfoData>({
    queryKey: getMainInfoQueryKey,
    queryFn: getMainInfo,
    initialData: () => queryClient.getQueryData(getMainInfoQueryKey),
  });
}

async function prefetchGetMainInfo(queryClient: QueryClient) {
  await queryClient.prefetchQuery<MainInfoData>({
    queryKey: getMainInfoQueryKey,
    queryFn: getMainInfo,
  });
}