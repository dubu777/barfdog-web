import { QueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { queryKeys } from "@/constants/queryKeys";
import { getSubscriptionDetailV2 } from "../subscription";
import { SubscriptionDetailDto } from "@/types/subscription";
import { UseSuspenseQueryCustomOptions } from "@/types";

export function useGetSubscriptionDetailV2(
  reportId: number,
  orderId: number,
  queryOptions?: UseSuspenseQueryCustomOptions<SubscriptionDetailDto>
) {
  return useSuspenseQuery<SubscriptionDetailDto>({
    queryKey: [
      queryKeys.SUBSCRIPTION.BASE,
      queryKeys.SUBSCRIPTION.GET_SUBSCRIPTION_DETAIL,
      reportId,
      orderId,
    ],
    queryFn: () => getSubscriptionDetailV2(reportId, orderId),
    ...queryOptions,
  });
}
