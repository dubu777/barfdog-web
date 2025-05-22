import { QueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { queryKeys } from "@/constants/queryKeys";
import { getSubscriptionDetail } from "../subscription";
import { SubscriptionDetailDto } from "@/types/subscription";
import { UseSuspenseQueryCustomOptions } from "@/types";
import { prefetchGetDogDetail } from "@/api/dog/queries/usePrefetchGetDogDetail";

export { useGetSubscriptionDetail, prefetchGetSubscriptionDetail, prefetchSubscriptionAndDogDetail };

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

async function prefetchSubscriptionAndDogDetail(queryClient: QueryClient, subscriptionId: number) {
  await prefetchGetSubscriptionDetail(queryClient, subscriptionId);

  const subscriptionDetail = queryClient.getQueryData<SubscriptionDetailDto>([
    queryKeys.SUBSCRIPTION.BASE,
    queryKeys.SUBSCRIPTION.GET_SUBSCRIPTION_DETAIL,
    subscriptionId,
  ]);

  if (subscriptionDetail?.dogId) {
    await prefetchGetDogDetail(queryClient, subscriptionDetail.dogId);
  }
}