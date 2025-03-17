import { WritableReviewList } from "@/types";
import { QueryClient, useInfiniteQuery } from "@tanstack/react-query";
import { queryKeys } from "@/constants";
import { getWritableReviewList } from "@/api/review/review";

export { useGetWritableReviewList, prefetchGetWritableReviewList };

const getWritableReviewListQueryKey = [queryKeys.REVIEW.BASE, queryKeys.REVIEW.GET_WRITABLE_REVIEW_LIST];

function useGetWritableReviewList() {
  return useInfiniteQuery<WritableReviewList>({
    queryKey: getWritableReviewListQueryKey,
    queryFn: async ({ pageParam = 0 }) => {
      const pageNumber = typeof pageParam === 'number' ? pageParam : 0;
      return await getWritableReviewList({pageParam: pageNumber, size: 6});
    },
    getNextPageParam: (lastPage) => {
      if (!lastPage || !lastPage.page) return undefined;

      const nextPage = lastPage.page.number + 1;
      const totalPages = lastPage.page.totalPages;

      return nextPage < totalPages ? nextPage : undefined;
    },
    initialPageParam: 0,
  })
}

async function prefetchGetWritableReviewList(queryClient: QueryClient) {
  return queryClient.prefetchQuery({
    queryKey: getWritableReviewListQueryKey,
    queryFn: async () => {
      const data = await getWritableReviewList({ pageParam: 0, size: 6 });
      return {
        pages: [data],
        pageParams: [0],
      }
    },
  })
}