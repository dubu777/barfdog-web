import { QueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/constants";
import { createSSRRequest } from "@/api/withAuthSSR";
import { getSubscriptionList } from "../subscription";

export async function prefetchGetInfiniteSubscriptionList(queryClient: QueryClient) {
	const ssrAxios = createSSRRequest();
	await queryClient.prefetchInfiniteQuery({
    queryKey: [queryKeys.MYPAGE.BASE, queryKeys.MYPAGE.SUBSCRIPTION.BASE, queryKeys.MYPAGE.SUBSCRIPTION.GET_SUBSCRIPTION_LIST],
    queryFn: async ({ pageParam = 0 }) =>
      await getSubscriptionList(pageParam, 50, ssrAxios),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      const currentPage = lastPage.page.page ?? 0;
      const totalPages = lastPage.page.totalPages ?? 0;
      return currentPage + 1 < totalPages ? currentPage + 1 : undefined;
    },
  });
}