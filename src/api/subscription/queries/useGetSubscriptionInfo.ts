import { useSuspenseQuery } from "@tanstack/react-query";
import { queryKeys } from "@/constants";
import {
  SubscriptionInfoResponse,
  UseSuspenseQueryCustomOptions,
} from "@/types";
import { getSubscriptionInfo } from "../subscription";

export function useGetSubscriptionInfo(
  subscribeId: number,
  queryOptions?: UseSuspenseQueryCustomOptions<SubscriptionInfoResponse>
) {
  return useSuspenseQuery<SubscriptionInfoResponse>({
    queryKey: [
      queryKeys.SUBSCRIPTION.BASE,
      queryKeys.SUBSCRIPTION.GET_SUBSCRIPTION_INFO,
      subscribeId,
    ],
    queryFn: () => getSubscriptionInfo(subscribeId),
    ...queryOptions,
  });
}
