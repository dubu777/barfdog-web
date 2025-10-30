import { QueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/constants";
import { getSubscriptionDetailV2 } from "@/api/subscription/subscription";
import { createSSRRequest } from "@/api/withAuthSSR";

export async function prefetchGetSubscriptionDetailV2(
  queryClient: QueryClient,
  surveyId: number
) {
  const ssrAxios = createSSRRequest();
  return await queryClient.prefetchQuery({
    queryKey: [
      queryKeys.SUBSCRIPTION.BASE,
      queryKeys.SUBSCRIPTION.GET_SUBSCRIPTION_DETAIL,
      surveyId,
    ],
    queryFn: () => getSubscriptionDetailV2(surveyId, ssrAxios),
  });
}
