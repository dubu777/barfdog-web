import { QueryClient, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { queryKeys } from "@/constants";
import { getSubscribeList } from "../subscription";
import { SubscribeListData } from "@/types";

export { useGetSubscribeList, prefetchGetSubscribeList };

function useGetSubscribeList(page: number, size?: number) {
  const queryClient = useQueryClient();
  return useSuspenseQuery<SubscribeListData[]>({
    queryKey: [queryKeys.SUBSCRIPTION, queryKeys.GET_SUBSCRIBE_LIST, page],
    queryFn: () => getSubscribeList(page, size),
    initialData: () => queryClient.getQueryData([queryKeys.SUBSCRIPTION, queryKeys.GET_SUBSCRIBE_LIST, 0]) || [],
  });
}

async function prefetchGetSubscribeList(queryClient: QueryClient, page: number, size?: number) {
  await queryClient.prefetchQuery<SubscribeListData[]>({
    queryKey: [queryKeys.SUBSCRIPTION, queryKeys.GET_SUBSCRIBE_LIST, page],
    queryFn: () => getSubscribeList(page, size),
  });
}