import { useSuspenseQuery } from "@tanstack/react-query";
import { queryKeys } from "@/constants";
import { SubscriptionAddressData, UseSuspenseQueryCustomOptions } from "@/types";
import { getSubscriptionAddress } from "@/api/subscription/subscription";

export function useGetSubscriptionAddress(subscribeId: number, queryOptions?: UseSuspenseQueryCustomOptions<SubscriptionAddressData>) {
  return useSuspenseQuery<SubscriptionAddressData>({
    queryKey: [queryKeys.SUBSCRIPTION.BASE, queryKeys.SUBSCRIPTION.GET_SUBSCRIPTION_ADDRESS, subscribeId],
    queryFn: () => getSubscriptionAddress(subscribeId),
    ...queryOptions,
  })
}