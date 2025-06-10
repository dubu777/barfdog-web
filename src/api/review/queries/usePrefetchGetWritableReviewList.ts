import { QueryClient } from "@tanstack/react-query";
import { getWritableReviewList } from "@/api/review/review";
import { queryKeys } from "@/constants";
import { createSSRRequest } from "@/api/withAuthSSR";

export async function prefetchGetWritableReviewList(queryClient: QueryClient) {
	const ssrAxios = createSSRRequest();
	return queryClient.prefetchQuery({
		queryKey: [queryKeys.REVIEW.BASE, queryKeys.REVIEW.GET_WRITABLE_REVIEW_LIST],
		queryFn: async () => {
			const data = await getWritableReviewList({ pageParam: 0, size: 6, instance: ssrAxios});
			return {
				pages: [data],
				pageParams: [0],
			}
		},
	})
}