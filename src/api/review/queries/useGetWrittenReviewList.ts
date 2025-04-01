import { WrittenReviewList } from "@/types";
import { QueryClient, useInfiniteQuery } from "@tanstack/react-query";
import { queryKeys } from "@/constants";
import { getWrittenReviewList } from "@/api/review/review";

export { useGetWrittenReviewList, prefetchGetWrittenReviewList };

const getWrittenReviewListQueryKey = [queryKeys.REVIEW.BASE, queryKeys.REVIEW.GET_WRITTEN_REVIEW_LIST];

function useGetWrittenReviewList() {
  return useInfiniteQuery<WrittenReviewList>({
    queryKey: getWrittenReviewListQueryKey,
    queryFn: async ({ pageParam = 0 }) => {
      const pageNumber = typeof pageParam === 'number' ? pageParam : 0;
      return await getWrittenReviewList({pageParam: pageNumber, size: 6});
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

async function prefetchGetWrittenReviewList(queryClient: QueryClient) {
  return queryClient.prefetchQuery({
    queryKey: getWrittenReviewListQueryKey,
    queryFn: async () => {
      const data = await getWrittenReviewList({ pageParam: 0, size: 6 });
      return {
        pages: [data],
        pageParams: [0],
      }
    },
  })
}