import { QueryClient } from "@tanstack/react-query";
import { SubscriptionAddressData } from "@/types";
import { queryKeys } from "@/constants";
import { getSubscriptionAddress } from "@/api/subscription/subscription";
import { createSSRRequest } from "@/api/withAuthSSR";

export async function prefetchGetSubscriptionAddress(queryClient: QueryClient, subscribeId: number) {
	const ssrAxios = createSSRRequest();
	await queryClient.prefetchQuery<SubscriptionAddressData>({
		queryKey: [queryKeys.SUBSCRIPTION.BASE, queryKeys.SUBSCRIPTION.GET_SUBSCRIPTION_ADDRESS, subscribeId],
		queryFn: () => getSubscriptionAddress(subscribeId, ssrAxios),
	});
}
