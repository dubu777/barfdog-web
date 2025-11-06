import { QueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/constants";
import { createSSRRequest } from "@/api/withAuthSSR";
import { getSubscriptionList } from "../subscription";
import { prefetchInfiniteQuery } from "@/utils/api/infiniteQueryConfig";

export async function prefetchGetInfiniteSubscriptionList(queryClient: QueryClient) {
	const ssrAxios = createSSRRequest();
  return await prefetchInfiniteQuery(queryClient, {
    queryKey: [
			queryKeys.MYPAGE.BASE, 
			queryKeys.MYPAGE.SUBSCRIPTION.BASE, 
			queryKeys.MYPAGE.SUBSCRIPTION.GET_SUBSCRIPTION_LIST
		],
    queryFn: async ({ pageParam, instance }) =>
      await getSubscriptionList(pageParam, 50, instance),
  }, ssrAxios);
}