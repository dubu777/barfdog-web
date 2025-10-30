import { useSuspenseQuery } from "@tanstack/react-query";
import { queryKeys } from "@/constants";
import { SubscriptionOrderSheet, UseSuspenseQueryCustomOptions } from "@/types";
import { getSubscriptionOrderSheet } from "../subscription";

export function useGetSubscriptionOrderSheet(
  surveyId: number,
  queryOptions?: UseSuspenseQueryCustomOptions<SubscriptionOrderSheet>
) {
  return useSuspenseQuery<SubscriptionOrderSheet>({
    queryKey: [
      queryKeys.SUBSCRIPTION.BASE,
      queryKeys.SUBSCRIPTION.GET_SUBSCRIPTION_ORDER_SHEET,
      surveyId,
    ],
    queryFn: () => getSubscriptionOrderSheet(surveyId),
    ...queryOptions,
  });
}
