import { useInfiniteQuery } from "@tanstack/react-query";
import { queryKeys } from "@/constants";
import { getPromotionList } from "@/api/mypage/promotion/promotion";
import { createInfiniteQueryConfig } from "@/utils/api/infiniteQueryConfig";

export function useGetInfinitePromotionList() {
	return useInfiniteQuery(createInfiniteQueryConfig({
		queryKey: [
			queryKeys.MYPAGE.BASE, 
			queryKeys.MYPAGE.PROMOTION.BASE, 
			queryKeys.MYPAGE.PROMOTION.GET_PROMOTION_LIST
		],
		queryFn: async ({ pageParam }) => {
			return await getPromotionList({
				pageParam,
			});
		},
	}));
}