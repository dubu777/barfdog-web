import { QueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { queryKeys } from "@/constants";
import { getSubscriptionList } from "../subscription";
import { SubscriptionListData, UseSuspenseQueryCustomOptions } from "@/types";

export { useGetSubscriptionList, prefetchGetSubscriptionList };

function useGetSubscriptionList(page: number, size?: number, queryOptions?: UseSuspenseQueryCustomOptions<SubscriptionListData[]>) {
  return useSuspenseQuery<SubscriptionListData[]>({
    queryKey: [queryKeys.SUBSCRIPTION.BASE, queryKeys.SUBSCRIPTION.GET_SUBSCRIPTION_LIST, page],
    queryFn: () => getSubscriptionList(page, size),
    ...queryOptions,
  });
}

async function prefetchGetSubscriptionList(queryClient: QueryClient, page: number, size?: number) {
  await queryClient.prefetchQuery<SubscriptionListData[]>({
    queryKey: [queryKeys.SUBSCRIPTION.BASE, queryKeys.SUBSCRIPTION.GET_SUBSCRIPTION_LIST, page],
    queryFn: () => getSubscriptionList(page, size),
  });
}