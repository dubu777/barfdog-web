import { useSuspenseQuery } from "@tanstack/react-query";
import { queryKeys } from "@/constants";
import { getSubscriptionList } from "../subscription";
import { SubscriptionListData, UseSuspenseQueryCustomOptions } from "@/types";

function useGetSubscriptionList(page: number, size?: number, queryOptions?: UseSuspenseQueryCustomOptions<SubscriptionListData[]>) {
  return useSuspenseQuery<SubscriptionListData[]>({
    queryKey: [queryKeys.SUBSCRIPTION.BASE, queryKeys.SUBSCRIPTION.GET_SUBSCRIPTION_LIST, page, size],
    queryFn: () => getSubscriptionList(page, size),
    ...queryOptions,
  });
}

export { useGetSubscriptionList };