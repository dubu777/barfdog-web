import { QueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { queryKeys } from "@/constants/queryKeys";
import { getSubscriptionDetail } from "../subscription";
import { SubscriptionDetailDto } from "@/types/subscription";
import { UseSuspenseQueryCustomOptions } from "@/types";

export { useGetSubscriptionDetail, prefetchGetSubscriptionDetail };

function useGetSubscriptionDetail(subscriptionId: number, queryOptions?: UseSuspenseQueryCustomOptions<SubscriptionDetailDto>) {
  return useSuspenseQuery<SubscriptionDetailDto>({
    queryKey: [queryKeys.SUBSCRIPTION.BASE, queryKeys.SUBSCRIPTION.GET_SUBSCRIPTION_DETAIL, subscriptionId],
    queryFn: () => getSubscriptionDetail(subscriptionId),
    ...queryOptions,
  });
}

async function prefetchGetSubscriptionDetail(queryClient: QueryClient, subscriptionId: number) {
  await queryClient.prefetchQuery({
    queryKey: [queryKeys.SUBSCRIPTION.BASE, queryKeys.SUBSCRIPTION.GET_SUBSCRIPTION_DETAIL, subscriptionId],
    queryFn: () => getSubscriptionDetail(subscriptionId),
  });
}

