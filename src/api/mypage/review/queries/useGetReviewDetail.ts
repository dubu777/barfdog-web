import { ReviewDetail, UseSuspenseQueryCustomOptions } from "@/types";
import { useSuspenseQuery} from "@tanstack/react-query";
import { queryKeys } from "@/constants";
import { getReviewDetail } from "@/api/mypage/review/review";

export function useGetReviewDetail(reviewId: number, queryOptions?: UseSuspenseQueryCustomOptions<ReviewDetail>) {
  return useSuspenseQuery({
    queryFn: () => getReviewDetail(reviewId),
    queryKey: [
      queryKeys.MYPAGE.BASE,
      queryKeys.MYPAGE.REVIEW.BASE,
      queryKeys.MYPAGE.REVIEW.GET_REVIEW_DETAIL,
      reviewId
    ],
    refetchOnMount: 'always',
    staleTime: 0,
    ...queryOptions,
  })
}