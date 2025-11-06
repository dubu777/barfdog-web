import { ReviewList, UseQueryCustomOptions } from "@/types";
import { QueryClient, useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/constants";
import { getReviewList } from "@/api/review/review";

// 상품 상세 리뷰 목록 조회 (페이지네이션 적용)
export function useGetReviewList(page: number, itemId?: number, queryOptions?: UseQueryCustomOptions<ReviewList>) {
  return useQuery<ReviewList>({
    queryKey: [queryKeys.REVIEW.BASE, queryKeys.REVIEW.GET_REVIEW_LIST, page, itemId],
    queryFn: () => getReviewList({ page, itemId }),
    keepPreviousData: true,
    ...queryOptions,
  })
}

export async function prefetchGetReviewList(queryClient: QueryClient, page: number, itemId?: number) {
  return queryClient.prefetchQuery<ReviewList>({
    queryKey: [queryKeys.REVIEW.BASE, queryKeys.REVIEW.GET_REVIEW_LIST, page, itemId],
    queryFn: () => getReviewList({ page, itemId }),
  })
}