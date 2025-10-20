import { useInfiniteQuery } from "@tanstack/react-query";
import { queryKeys } from "@/constants";
import { getSubscriptionList } from "../subscription";

export function useGetInfiniteSubscriptionList() {
	return useInfiniteQuery({
		queryKey: [queryKeys.MYPAGE.BASE, queryKeys.MYPAGE.SUBSCRIPTION.BASE, queryKeys.MYPAGE.SUBSCRIPTION.GET_SUBSCRIPTION_LIST],
		queryFn: async ({ pageParam = 0 }) => {
			const pageNumber = typeof pageParam === 'number' ? pageParam : 0;
			const data = await getSubscriptionList(pageNumber, 50);

			return data;
		},
		getNextPageParam: (lastPage) => {
			if (!lastPage) return undefined;

			const currentPage = lastPage?.page?.number ?? 0;
			const totalPages = lastPage?.page?.totalPages ?? 0;
		
			const nextPage = currentPage + 1;
			return nextPage < totalPages ? nextPage : undefined;
		},
		initialPageParam: 0,
	});
}