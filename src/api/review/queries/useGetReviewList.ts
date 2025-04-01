import { UseSuspenseQueryCustomOptions } from "@/types";
import { QueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { queryKeys } from "@/constants";
import { ReviewList } from "@/types/review";
import { getReviewList } from "@/api/review/review";

export { useGetReviewList, prefetchGetReviewList };

function useGetReviewList(page: number, queryOptions?: UseSuspenseQueryCustomOptions<ReviewList>) {
  return useSuspenseQuery<ReviewList>({
    queryKey: [queryKeys.REVIEW.BASE, queryKeys.REVIEW.GET_REVIEW_LIST, page],
    queryFn: () => getReviewList(page),
    keepPreviousData: true,
    ...queryOptions,
  })
}

async function prefetchGetReviewList(queryClient: QueryClient, page: number) {
  return queryClient.prefetchQuery<ReviewList>({
    queryKey: [queryKeys.REVIEW.BASE, queryKeys.REVIEW.GET_REVIEW_LIST, page],
    queryFn: () => getReviewList(page),
  })
}