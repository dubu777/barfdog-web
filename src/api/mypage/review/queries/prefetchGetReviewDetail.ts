import { queryKeys } from "@/constants/queryKeys";
import { QueryClient } from "@tanstack/react-query";
import { createSSRRequest } from "@/api/withAuthSSR";
import { getReviewDetail } from "@/api/mypage/review/review";
import { ReviewItemType } from "@/types";

export async function prefetchGetReviewDetail(
  reviewId: number, 
  reviewType: ReviewItemType, 
  queryClient: QueryClient
) {
  const ssrAxios = createSSRRequest();
  await queryClient.prefetchQuery({
    queryFn: () => getReviewDetail({ reviewId, reviewType, instance: ssrAxios }),
    queryKey: [
      queryKeys.MYPAGE.BASE,
      queryKeys.MYPAGE.REVIEW.BASE,
      queryKeys.MYPAGE.REVIEW.GET_REVIEW_DETAIL,
      reviewId,
      reviewType
    ],
  });
}
