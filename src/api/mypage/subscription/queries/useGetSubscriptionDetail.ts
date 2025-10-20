import { useSuspenseQuery } from "@tanstack/react-query";
import { queryKeys } from "@/constants";
import { UseSuspenseQueryCustomOptions } from "@/types";
import { getSubscriptionDetail } from "../subscription";
import { SubscriptionDetail } from "@/types/mypage/subscription";

export function useGetSubscriptionDetail(subscriptionId: number, queryOptions?: UseSuspenseQueryCustomOptions<SubscriptionDetail>) {
  return useSuspenseQuery<SubscriptionDetail>({
    queryKey: [
      queryKeys.MYPAGE.BASE, 
      queryKeys.MYPAGE.SUBSCRIPTION.BASE, 
      queryKeys.MYPAGE.SUBSCRIPTION.GET_SUBSCRIPTION_DETAIL, 
      subscriptionId
    ],
    queryFn: () => getSubscriptionDetail(subscriptionId),
    ...queryOptions,
  })
}
