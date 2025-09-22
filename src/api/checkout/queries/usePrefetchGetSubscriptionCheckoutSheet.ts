import { createSSRRequest } from "@/api/withAuthSSR";
import { queryKeys } from "@/constants";
import { SubscriptionCheckoutSheetResponse } from "@/types";
import { QueryClient } from "@tanstack/react-query";
import { getSubscriptionCheckoutSheet } from "../checkout";

export async function prefetchGetSubscriptionCheckoutSheet(
  queryClient: QueryClient,
  subscribeId: number
) {
  const ssrAxios = createSSRRequest();
  await queryClient.prefetchQuery<SubscriptionCheckoutSheetResponse>({
    queryKey: [
      queryKeys.CHECKOUT.BASE,
      queryKeys.CHECKOUT.GET_SUBSCRIPTION_CHECKOUT_SHEET,
    ],
    queryFn: () => getSubscriptionCheckoutSheet(subscribeId, ssrAxios),
  });
}
