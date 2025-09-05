import { UseSuspenseQueryCustomOptions } from "@/types";
import { QueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { queryKeys } from "@/constants";
import { ReviewList } from "@/types/review";
import { getReviewList } from "@/api/review/review";

export function useGetReviewList(page: number, queryOptions?: UseSuspenseQueryCustomOptions<ReviewList>) {
  return useSuspenseQuery<ReviewList>({
    queryKey: [queryKeys.REVIEW.BASE, queryKeys.REVIEW.GET_REVIEW_LIST, page],
    queryFn: () => getReviewList(page),
    ...queryOptions,
  })
}

export async function prefetchGetReviewList(queryClient: QueryClient, page: number) {
  return queryClient.prefetchQuery<ReviewList>({
    queryKey: [queryKeys.REVIEW.BASE, queryKeys.REVIEW.GET_REVIEW_LIST, page],
    queryFn: () => getReviewList(page),
  })
}