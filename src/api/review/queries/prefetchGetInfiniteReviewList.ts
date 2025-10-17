import { createSSRRequest } from "@/api/withAuthSSR";
import { queryKeys } from "@/constants";
import { QueryClient } from "@tanstack/react-query";
import { getReviewList } from "../review";

export async function prefetchGetInfiniteReviewList(queryClient: QueryClient) {
  const ssrAxios = createSSRRequest();
  await queryClient.prefetchInfiniteQuery({
    queryKey: [queryKeys.REVIEW.BASE, queryKeys.REVIEW.GET_REVIEW_LIST],
    queryFn: async ({ pageParam = 0 }) =>
      await getReviewList({
        page: pageParam,
        size: 20,
        instance: ssrAxios
      }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      const currentPage = lastPage.page.page ?? 0;
      const totalPages = lastPage.page.totalPages ?? 0;
      return currentPage + 1 < totalPages ? currentPage + 1 : undefined;
    },
  });
}
