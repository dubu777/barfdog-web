import { queryKeys } from "@/constants/queryKeys";
import { QueryClient } from "@tanstack/react-query";
import { createSSRRequest } from "@/api/withAuthSSR";
import { getReviewDetail } from "@/api/mypage/review/review";

export async function prefetchGetReviewDetail(reviewId: number, queryClient: QueryClient) {
  const ssrAxios = createSSRRequest();
  await queryClient.prefetchQuery({
    queryFn: () => getReviewDetail(reviewId, ssrAxios),
    queryKey: [
      queryKeys.MYPAGE.BASE,
      queryKeys.MYPAGE.REVIEW.BASE,
      queryKeys.MYPAGE.REVIEW.GET_REVIEW_DETAIL,
      reviewId
    ],
  });
}
