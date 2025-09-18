import { useInfiniteQuery } from "@tanstack/react-query";
import { queryKeys } from "@/constants";
import { getInfinitePromotionList } from "@/api/mypage/promotion/promotion";

export function useGetInfinitePromotionList() {
	return useInfiniteQuery({
		queryKey: [queryKeys.MYPAGE.BASE, queryKeys.MYPAGE.PROMOTION.BASE, queryKeys.MYPAGE.PROMOTION.GET_PROMOTION_LIST],
		queryFn: async ({ pageParam = 0 }) => {
			const pageNumber = typeof pageParam === 'number' ? pageParam : 0;
			const data = await getInfinitePromotionList({
				pageParam: pageNumber,
			});

			return data;
		},
		getNextPageParam: (lastPage) => {
			if (!lastPage) return undefined;

			const currentPage = lastPage?.page?.page ?? 0;
			const totalPages = lastPage?.page?.totalPages ?? 0;

			const nextPage = currentPage + 1;
			return nextPage < totalPages ? nextPage : undefined;
		},
		initialPageParam: 0,
	});
}