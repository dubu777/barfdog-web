import { QueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/constants";
import { createSSRRequest } from "@/api/withAuthSSR";
import { ReviewListType } from "@/types";
import { getMypageReviewList } from "@/api/mypage/review/review";
import { prefetchInfiniteQuery } from "@/utils/api/infiniteQueryConfig";

export async function prefetchGetInfiniteMypageReviewList(type: ReviewListType, queryClient: QueryClient) {
	const ssrAxios = createSSRRequest();
	
	return await prefetchInfiniteQuery(queryClient, {
		queryKey: [
			queryKeys.MYPAGE.BASE,
			queryKeys.MYPAGE.REVIEW.BASE,
			queryKeys.MYPAGE.REVIEW.GET_MYPAGE_REVIEW_LIST,
			type
		],
    queryFn: async ({ pageParam, instance }) =>
      await getMypageReviewList({
				type,
        pageParam,
        instance
      }),
  }, ssrAxios);
}