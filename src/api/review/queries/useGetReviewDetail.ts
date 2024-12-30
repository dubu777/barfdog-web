import { UseSuspenseQueryCustomOptions } from "@/types";
import { QueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { queryKeys } from "@/constants";
import { ReviewDetail } from "@/types/review";
import { getReviewDetail } from "@/api/review/review";

export { useGetReviewDetail, prefetchGetReviewDetail };

function useGetReviewDetail(reviewId: number, queryOptions?: UseSuspenseQueryCustomOptions<ReviewDetail>) {
  return useSuspenseQuery<ReviewDetail>({
    queryKey: [queryKeys.REVIEW.BASE, queryKeys.REVIEW.GET_REVIEW_DETAIL, reviewId],
    queryFn: () => getReviewDetail(reviewId),
    keepPreviousData: true,
    ...queryOptions,
  })
}

async function prefetchGetReviewDetail(queryClient: QueryClient, reviewId: number) {
  return queryClient.prefetchQuery<ReviewDetail>({
    queryKey: [queryKeys.REVIEW.BASE, queryKeys.REVIEW.GET_REVIEW_DETAIL, reviewId],
    queryFn: () => getReviewDetail(reviewId),
  })
}