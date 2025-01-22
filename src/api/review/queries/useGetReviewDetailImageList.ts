import { ReviewImage, UseQueryCustomOptions } from "@/types";
import { QueryClient, useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/constants";
import { getReviewDetailImages } from "@/api/review/review";

export { useGetReviewDetailImageList, prefetchGetReviewDetailImageList };

function useGetReviewDetailImageList(reviewId: number, queryOptions?: UseQueryCustomOptions<ReviewImage[]>) {
  return useQuery<ReviewImage[]>({
    queryKey: [queryKeys.REVIEW.BASE, queryKeys.REVIEW.GET_REVIEW_DETAIL_IMAGE_LIST, reviewId],
    queryFn: () => getReviewDetailImages(reviewId),
    keepPreviousData: true,
    ...queryOptions,
  })
}

async function prefetchGetReviewDetailImageList(queryClient: QueryClient, reviewId: number) {
  return queryClient.prefetchQuery<ReviewImage[]>({
    queryKey: [queryKeys.REVIEW.BASE, queryKeys.REVIEW.GET_REVIEW_DETAIL_IMAGE_LIST, reviewId],
    queryFn: () => getReviewDetailImages(reviewId),
  })
}