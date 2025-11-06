import { queryKeys } from "@/constants/queryKeys";
import { QueryClient } from "@tanstack/react-query";
import { createSSRRequest } from "@/api/withAuthSSR";
import { getBestReviewList } from "../review";

export async function prefetchGetBestReviewList(queryClient: QueryClient) {
  const ssrAxios = createSSRRequest();
  return await queryClient.prefetchQuery({
    queryKey: [queryKeys.REVIEW.BASE, queryKeys.REVIEW.GET_BEST_REVIEW_LIST],
    queryFn: () => getBestReviewList(ssrAxios),
  });
}
