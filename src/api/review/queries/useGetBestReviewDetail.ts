import { UseSuspenseQueryCustomOptions } from "@/types";
import { QueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { queryKeys } from "@/constants";
import { BestReviewDetail } from "@/types/review";
import { getBestReviewDetail } from "@/api/review/review";

export { useGetBestReviewDetail, prefetchGetBestReviewDetail };

function useGetBestReviewDetail(reviewId: number, queryOptions?: UseSuspenseQueryCustomOptions<BestReviewDetail>) {
  return useSuspenseQuery<BestReviewDetail>({
    queryKey: [queryKeys.REVIEW.BASE, queryKeys.REVIEW.GET_BEST_REVIEW_DETAIL, reviewId],
    queryFn: () => getBestReviewDetail(reviewId),
    keepPreviousData: true,
    ...queryOptions,
  })
}

async function prefetchGetBestReviewDetail(queryClient: QueryClient, reviewId: number) {
  return queryClient.prefetchQuery<BestReviewDetail>({
    queryKey: [queryKeys.REVIEW.BASE, queryKeys.REVIEW.GET_BEST_REVIEW_DETAIL, reviewId],
    queryFn: () => getBestReviewDetail(reviewId),
  })
}