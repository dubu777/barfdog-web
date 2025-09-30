import { QueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { queryKeys } from "@/constants/queryKeys";
import { getSubscriptionDetailV2 } from "../subscription";
import { SubscriptionDetail } from "@/types/subscription";
import { UseSuspenseQueryCustomOptions } from "@/types";

export function useGetSubscriptionDetailV2(
  reportId: number,
  queryOptions?: UseSuspenseQueryCustomOptions<SubscriptionDetail>
) {
  return useSuspenseQuery<SubscriptionDetail>({
    queryKey: [
      queryKeys.SUBSCRIPTION.BASE,
      queryKeys.SUBSCRIPTION.GET_SUBSCRIPTION_DETAIL,
      reportId,
    ],
    queryFn: () => getSubscriptionDetailV2(reportId),
    ...queryOptions,
  });
}
