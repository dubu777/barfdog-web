import { QueryClient } from "@tanstack/react-query";
import { GeneralOrderData, SubscriptionOrderData } from "@/types";
import { queryKeys } from "@/constants";
import { createSSRRequest } from "@/api/withAuthSSR";
import { getGeneralOrderList, getSubscriptionOrderList } from "@/api/order/order";

export async function prefetchGetGeneralOrderList(queryClient: QueryClient) {
	const ssrAxios = createSSRRequest();
	await queryClient.prefetchQuery<GeneralOrderData[]>({
		queryKey: [queryKeys.ORDER.BASE, queryKeys.ORDER.GET_GENERAL_ORDER_LIST, 'GENERAL', 0],
		queryFn: () => getGeneralOrderList(0, 5, ssrAxios),
	});
}

export async function prefetchGetSubscriptionOrderList(queryClient: QueryClient) {
	const ssrAxios = createSSRRequest();
	await queryClient.prefetchQuery<SubscriptionOrderData[]>({
		queryKey: [queryKeys.ORDER.BASE, queryKeys.ORDER.GET_SUBSCRIPTION_ORDER_LIST, 'SUBSCRIPTION', 0],
		queryFn: () => getSubscriptionOrderList(0, 5, ssrAxios),
	});
}

export async function prefetchGetMergeOrderList(queryClient: QueryClient) {
	await prefetchGetGeneralOrderList(queryClient);
	await prefetchGetSubscriptionOrderList(queryClient);
}