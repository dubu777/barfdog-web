import { ReviewImage, UseQueryCustomOptions } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/constants";
import { getReviewDetailImages } from "@/api/mypage/review/review";

export function useGetReviewDetailImageList(reviewId: number, queryOptions?: UseQueryCustomOptions<ReviewImage[]>) {
  return useQuery<ReviewImage[]>({
    queryKey: [
      queryKeys.MYPAGE.BASE,
      queryKeys.MYPAGE.REVIEW.BASE,
      queryKeys.MYPAGE.REVIEW.GET_REVIEW_DETAIL,
      reviewId
    ],
    queryFn: () => getReviewDetailImages(reviewId),
    keepPreviousData: true,
    ...queryOptions,
  })
}