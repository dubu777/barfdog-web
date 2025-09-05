import { QueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/constants";
import { createSSRRequest } from "@/api/withAuthSSR";
import { ReviewListType } from "@/types";
import { getMypageReviewList } from "@/api/mypage/review/review";

export async function prefetchGetMypageReviewList(type: ReviewListType, queryClient: QueryClient) {
	const ssrAxios = createSSRRequest();
	return queryClient.prefetchInfiniteQuery({
		queryKey: [
			queryKeys.MYPAGE.BASE,
			queryKeys.MYPAGE.REVIEW.BASE,
			queryKeys.MYPAGE.REVIEW.GET_MYPAGE_REVIEW_LIST,
			type
		],
		queryFn: async () =>
			await getMypageReviewList({
				type,
				pageParam: 0,
				instance: ssrAxios
		}),
		initialPageParam: 0,
		getNextPageParam: (lastPage) => {
			const currentPage = lastPage.page.page ?? 0;
			const totalPages = lastPage.page.totalPages ?? 0;
			return currentPage + 1 < totalPages ? currentPage + 1 : undefined;
		},
	})
}