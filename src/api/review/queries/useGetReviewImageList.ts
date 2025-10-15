import { ReviewImageList, UseQueryCustomOptions } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/constants";
import { getReviewImageList } from "@/api/review/review";

export function useGetReviewImageList(reviewId: number, queryOptions?: UseQueryCustomOptions<ReviewImageList>) {
  return useQuery<ReviewImageList>({
    queryKey: [queryKeys.REVIEW.BASE, queryKeys.REVIEW.GET_REVIEW_IMAGE_LIST, reviewId],
    queryFn: () => getReviewImageList(reviewId),
    keepPreviousData: true,
    ...queryOptions,
  })
}