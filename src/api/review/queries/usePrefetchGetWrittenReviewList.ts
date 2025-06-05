import { QueryClient } from "@tanstack/react-query";
import { getWrittenReviewList } from "@/api/review/review";
import { queryKeys } from "@/constants";
import { createSSRRequest } from "@/api/withAuthSSR";

export async function prefetchGetWrittenReviewList(queryClient: QueryClient) {
	const ssrAxios = createSSRRequest();
	return queryClient.prefetchQuery({
		queryKey: [queryKeys.REVIEW.BASE, queryKeys.REVIEW.GET_WRITTEN_REVIEW_LIST],
		queryFn: async () => {
			const data = await getWrittenReviewList({ pageParam: 0, size: 6, instance: ssrAxios });
			return {
				pages: [data],
				pageParams: [0],
			}
		},
	})
}