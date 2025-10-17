import { BestReviewItem, UseQueryCustomOptions } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/constants";
import { getBestReviewList } from "@/api/review/review";

export function useGetBestReviewList(queryOptions?: UseQueryCustomOptions<BestReviewItem[]>) {
  return useQuery<BestReviewItem[]>({
    queryKey: [queryKeys.REVIEW.BASE, queryKeys.REVIEW.GET_BEST_REVIEW_LIST],
    queryFn: () => getBestReviewList(),
    ...queryOptions,
  })
}