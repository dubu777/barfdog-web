import { UseSuspenseQueryCustomOptions, WrittenReviewList } from "@/types";
import { QueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { queryKeys } from "@/constants";
import { getWrittenReviewList } from "@/api/review/review";

export { useGetWrittenReviewList, prefetchGetWrittenReviewList };

function useGetWrittenReviewList(page: number, queryOptions?: UseSuspenseQueryCustomOptions<WrittenReviewList>) {
  return useSuspenseQuery<WrittenReviewList>({
    queryKey: [queryKeys.REVIEW.BASE, queryKeys.REVIEW.GET_WRITTEN_REVIEW_LIST, page],
    queryFn: () => getWrittenReviewList(page),
    keepPreviousData: true,
    ...queryOptions,
  })
}

async function prefetchGetWrittenReviewList(queryClient: QueryClient, page: number) {
  return queryClient.prefetchQuery<WrittenReviewList>({
    queryKey: [queryKeys.REVIEW.BASE, queryKeys.REVIEW.GET_WRITTEN_REVIEW_LIST, page],
    queryFn: () => getWrittenReviewList(page),
  })
}