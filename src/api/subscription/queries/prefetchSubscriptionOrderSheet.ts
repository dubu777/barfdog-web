import { QueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/constants";
import { getSubscriptionOrderSheet } from "@/api/subscription/subscription";
import { createSSRRequest } from "@/api/withAuthSSR";

export async function prefetchSubscriptionOrderSheet(
  queryClient: QueryClient,
  surveyId: number
) {
  const ssrAxios = createSSRRequest();
  return await queryClient.prefetchQuery({
    queryKey: [
      queryKeys.SUBSCRIPTION.BASE,
      queryKeys.SUBSCRIPTION.GET_SUBSCRIPTION_ORDER_SHEET,
      surveyId,
    ],
    queryFn: () => getSubscriptionOrderSheet(surveyId, ssrAxios),
  });
}
