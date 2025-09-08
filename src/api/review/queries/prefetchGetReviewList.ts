import { queryKeys } from "@/constants/queryKeys";
import { QueryClient } from "@tanstack/react-query";
import { createSSRRequest } from "@/api/withAuthSSR";
import { getReviewList } from "../review";

export async function prefetchGetReviewList(queryClient: QueryClient) {
  const ssrAxios = createSSRRequest();
  await queryClient.prefetchQuery({
    queryKey: [queryKeys.REVIEW.BASE, queryKeys.REVIEW.GET_REVIEW_LIST, 0],
    queryFn: () => getReviewList(0, ssrAxios),
  });
}
