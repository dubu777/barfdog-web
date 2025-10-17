import { OrderType } from "@/types/mypage/orders";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getOrderListByOrderType } from "../order";
import { queryKeys } from "@/constants";


export function useGetInfiniteOrderList(orderType: OrderType = "SUBSCRIPTION") {
	return useInfiniteQuery({
		queryKey: [queryKeys.MYPAGE.BASE, queryKeys.MYPAGE.ORDERS.BASE, queryKeys.MYPAGE.ORDERS.GET_ORDER_LIST, orderType],
		queryFn: async ({ pageParam = 0 }) => {
			const pageNumber = typeof pageParam === 'number' ? pageParam : 0;
			const data = await getOrderListByOrderType({
				pageParam: pageNumber,
				orderType,
			});

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