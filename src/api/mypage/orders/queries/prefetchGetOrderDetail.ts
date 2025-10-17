import { QueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/constants";
import { createSSRRequest } from "@/api/withAuthSSR";
import { OrderType } from "@/types/mypage/orders";
import { getOrderDetail } from "../order";

export async function prefetchGetOrderDetail(queryClient: QueryClient, orderId: number, type: OrderType) {
	const ssrAxios = createSSRRequest();
	await queryClient.prefetchQuery({
		queryKey: [queryKeys.MYPAGE.BASE, queryKeys.MYPAGE.ORDERS.BASE, queryKeys.MYPAGE.ORDERS.GET_ORDER_DETAIL, orderId, type],
		queryFn: () => getOrderDetail(orderId, type, ssrAxios),
	});
}
