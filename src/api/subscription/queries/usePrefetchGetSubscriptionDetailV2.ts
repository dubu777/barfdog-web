import { QueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/constants";
import { getSubscriptionDetailV2 } from "@/api/subscription/subscription";
import { createSSRRequest } from "@/api/withAuthSSR";

export async function prefetchGetSubscriptionDetailV2(
  queryClient: QueryClient,
  reportId: number
) {
  const ssrAxios = createSSRRequest();
  await queryClient.prefetchQuery({
    queryKey: [
      queryKeys.SUBSCRIPTION.BASE,
      queryKeys.SUBSCRIPTION.GET_SUBSCRIPTION_DETAIL,
      reportId,
    ],
    queryFn: () => getSubscriptionDetailV2(reportId, ssrAxios),
  });
}
