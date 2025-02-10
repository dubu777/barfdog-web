import { UseSuspenseQueryCustomOptions } from "@/types";
import { QueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { queryKeys } from "@/constants";
import { BestReviewItem } from "@/types/review";
import { getBestReviewList } from "@/api/review/review";

export { useGetBestReviewList, prefetchGetBestReviewList };

const getBestReviewListQueryKey = [queryKeys.REVIEW.BASE, queryKeys.REVIEW.GET_BEST_REVIEW_LIST];

function useGetBestReviewList(queryOptions?: UseSuspenseQueryCustomOptions<BestReviewItem[]>) {
  return useSuspenseQuery<BestReviewItem[]>({
    queryKey: getBestReviewListQueryKey,
    queryFn: () => getBestReviewList(),
    keepPreviousData: true,
    ...queryOptions,
  })
}

async function prefetchGetBestReviewList(queryClient: QueryClient) {
  return queryClient.prefetchQuery<BestReviewItem[]>({
    queryKey: getBestReviewListQueryKey,
    queryFn: () => getBestReviewList(),
  })
}