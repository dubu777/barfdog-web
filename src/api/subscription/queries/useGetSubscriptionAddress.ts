import { QueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { queryKeys } from "@/constants";
import { SubscriptionAddressData, UseSuspenseQueryCustomOptions } from "@/types";
import { getSubscriptionAddress } from "@/api/subscription/subscription";

export { useGetSubscriptionAddress, prefetchGetSubscriptionAddress };

function useGetSubscriptionAddress(subscribeId: number, queryOptions?: UseSuspenseQueryCustomOptions<SubscriptionAddressData>) {
  return useSuspenseQuery<SubscriptionAddressData>({
    queryKey: [queryKeys.SUBSCRIPTION.BASE, queryKeys.SUBSCRIPTION.GET_SUBSCRIPTION_ADDRESS, subscribeId],
    queryFn: () => getSubscriptionAddress(subscribeId),
    ...queryOptions,
  })
}

async function prefetchGetSubscriptionAddress(queryClient: QueryClient, subscribeId: number) {
  await queryClient.prefetchQuery<SubscriptionAddressData>({
    queryKey: [queryKeys.SUBSCRIPTION.BASE, queryKeys.SUBSCRIPTION.GET_SUBSCRIPTION_ADDRESS, subscribeId],
    queryFn: () => getSubscriptionAddress(subscribeId),
  });
}
