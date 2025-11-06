import { useSuspenseQuery } from "@tanstack/react-query";
import { queryKeys } from "@/constants/queryKeys";
import {
  SubscriptionCheckoutSheetResponse,
  UseSuspenseQueryCustomOptions,
} from "@/types";
import { getSubscriptionCheckoutSheet } from "../checkout";

export function useGetSubscriptionCheckoutSheet(
  subscribeId: number,
  queryOptions?: UseSuspenseQueryCustomOptions<SubscriptionCheckoutSheetResponse>
) {
  return useSuspenseQuery({
    queryFn: () => getSubscriptionCheckoutSheet(subscribeId),
    queryKey: [
      queryKeys.CHECKOUT.BASE,
      queryKeys.CHECKOUT.GET_SUBSCRIPTION_CHECKOUT_SHEET,
      subscribeId,
    ],
    ...queryOptions,
  });
}
