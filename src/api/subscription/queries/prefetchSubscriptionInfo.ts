import { QueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/constants";
import { getSubscriptionInfo } from "@/api/subscription/subscription";
import { createSSRRequest } from "@/api/withAuthSSR";

export async function prefetchSubscriptionInfo(
  queryClient: QueryClient,
  subscribeId: number
) {
  const ssrAxios = createSSRRequest();
  return await queryClient.prefetchQuery({
    queryKey: [
      queryKeys.SUBSCRIPTION.BASE,
      queryKeys.SUBSCRIPTION.GET_SUBSCRIPTION_INFO,
      subscribeId,
    ],
    queryFn: () => getSubscriptionInfo(subscribeId, ssrAxios),
  });
}
