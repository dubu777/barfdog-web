import { ReviewDetail, ReviewItemType, UseSuspenseQueryCustomOptions } from "@/types";
import { useSuspenseQuery} from "@tanstack/react-query";
import { queryKeys } from "@/constants";
import { getReviewDetail } from "@/api/mypage/review/review";

export function useGetReviewDetail(
  reviewId: number,
  reviewType: ReviewItemType,
  queryOptions?: UseSuspenseQueryCustomOptions<ReviewDetail>
) {
  return useSuspenseQuery<ReviewDetail>({
    queryFn: () => getReviewDetail({ reviewId, reviewType }) as Promise<ReviewDetail>,
    queryKey: [
      queryKeys.MYPAGE.BASE,
      queryKeys.MYPAGE.REVIEW.BASE,
      queryKeys.MYPAGE.REVIEW.GET_REVIEW_DETAIL,
      reviewId,
      reviewType
    ],
    refetchOnMount: 'always',
    staleTime: 0,
    ...queryOptions,
  })
}