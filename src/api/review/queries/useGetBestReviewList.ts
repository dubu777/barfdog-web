import { BestReviewItem, UseSuspenseQueryCustomOptions } from "@/types";
import { useSuspenseQuery } from "@tanstack/react-query";
import { queryKeys } from "@/constants";
import { getBestReviewList } from "@/api/review/review";

export function useGetBestReviewList(queryOptions?: UseSuspenseQueryCustomOptions<BestReviewItem[]>) {
  return useSuspenseQuery<BestReviewItem[]>({
    queryKey: [queryKeys.REVIEW.BASE, queryKeys.REVIEW.GET_BEST_REVIEW_LIST],
    queryFn: () => getBestReviewList(),
    ...queryOptions,
  })
}