import { QueryClient } from "@tanstack/react-query";
import { MergeOrderAndRecipe, OrderType } from "@/types";
import { queryKeys } from "@/constants";
import { getOrderDetail } from "@/api/order/order";
import { createSSRRequest } from "@/api/withAuthSSR";

export async function prefetchGetOrderDetail(queryClient: QueryClient, orderId: number, type: OrderType) {
	const ssrAxios = createSSRRequest();
	await queryClient.prefetchQuery<MergeOrderAndRecipe>({
		queryKey: [queryKeys.ORDER.BASE, queryKeys.ORDER.GET_ORDER_DETAIL, orderId],
		queryFn: () => getOrderDetail(orderId, type, ssrAxios),
	});
}
