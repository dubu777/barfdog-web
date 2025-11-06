import { OrderType } from "@/types/mypage/orders";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getOrderListByOrderType } from "../order";
import { queryKeys } from "@/constants";
import { createInfiniteQueryConfig } from "@/utils/api/infiniteQueryConfig";

export function useGetInfiniteOrderList(orderType: OrderType = "SUBSCRIPTION") {
	return useInfiniteQuery(createInfiniteQueryConfig({
		queryKey: [
			queryKeys.MYPAGE.BASE, 
			queryKeys.MYPAGE.ORDERS.BASE, 
			queryKeys.MYPAGE.ORDERS.GET_ORDER_LIST, 
			orderType
		],
    queryFn: async ({ pageParam }) => {
      return await getOrderListByOrderType({ 
				pageParam,
				orderType,
			});
    },
  }));
}