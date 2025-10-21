import { createSSRRequest } from "@/api/withAuthSSR";
import { QueryClient } from "@tanstack/react-query";
import { getSubscriptionDetail } from "../subscription";
import { queryKeys } from "@/constants";

export async function prefetchGetSubscriptionDetail(queryClient: QueryClient, subscriptionId: number) {
	const ssrAxios = createSSRRequest();
	return await queryClient.prefetchQuery({
		queryKey: [
      queryKeys.MYPAGE.BASE, 
      queryKeys.MYPAGE.SUBSCRIPTION.BASE, 
      queryKeys.MYPAGE.SUBSCRIPTION.GET_SUBSCRIPTION_DETAIL, 
      subscriptionId
    ],
		queryFn: () => getSubscriptionDetail(subscriptionId, ssrAxios),
	});
}
