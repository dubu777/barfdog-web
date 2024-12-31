import { UseSuspenseQueryCustomOptions, WritableReviewList } from "@/types";
import { QueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { queryKeys } from "@/constants";
import { getWritableReviewList } from "@/api/review/review";

export { useGetWritableReviewList, prefetchGetWritableReviewList };

function useGetWritableReviewList(page: number, queryOptions?: UseSuspenseQueryCustomOptions<WritableReviewList>) {
  return useSuspenseQuery<WritableReviewList>({
    queryKey: [queryKeys.REVIEW.BASE, queryKeys.REVIEW.GET_WRITABLE_REVIEW_LIST, page],
    queryFn: () => getWritableReviewList(page),
    keepPreviousData: true,
    ...queryOptions,
  })
}

async function prefetchGetWritableReviewList(queryClient: QueryClient, page: number) {
  return queryClient.prefetchQuery<WritableReviewList>({
    queryKey: [queryKeys.REVIEW.BASE, queryKeys.REVIEW.GET_WRITABLE_REVIEW_LIST, page],
    queryFn: () => getWritableReviewList(page),
  })
}