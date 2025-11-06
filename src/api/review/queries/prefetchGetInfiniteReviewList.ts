import { createSSRRequest } from "@/api/withAuthSSR";
import { queryKeys } from "@/constants";
import { QueryClient } from "@tanstack/react-query";
import { getReviewList } from "../review";
import { prefetchInfiniteQuery } from "@/utils/api/infiniteQueryConfig";

export async function prefetchGetInfiniteReviewList(queryClient: QueryClient) {
  const ssrAxios = createSSRRequest();
  return await prefetchInfiniteQuery(queryClient, {
    queryKey: [queryKeys.REVIEW.BASE, queryKeys.REVIEW.GET_REVIEW_LIST],
    queryFn: async ({ pageParam, instance }) =>
      await getReviewList({
        page: pageParam,
        size: 20,
        instance
      }),
  }, ssrAxios);
}
