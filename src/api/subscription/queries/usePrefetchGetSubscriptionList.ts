import { QueryClient } from "@tanstack/react-query";
import { SubscriptionListData } from "@/types";
import { queryKeys } from "@/constants";
import { getSubscriptionList } from "@/api/subscription/subscription";
import { createSSRRequest } from "@/api/withAuthSSR";

export async function prefetchGetSubscriptionList(queryClient: QueryClient, page: number, size?: number) {
	const ssrAxios = createSSRRequest();
	await queryClient.prefetchQuery<SubscriptionListData[]>({
		queryKey: [queryKeys.SUBSCRIPTION.BASE, queryKeys.SUBSCRIPTION.GET_SUBSCRIPTION_LIST, page, size],
		queryFn: () => getSubscriptionList(page, size, ssrAxios),
	});
}