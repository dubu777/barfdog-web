import { QueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/constants";
import { getSubscriptionDetail } from "@/api/subscription/subscription";
import { SubscriptionDetailDto } from "@/types";
import { prefetchGetDogDetail } from "@/api/dog/queries/usePrefetchGetDogDetail";
import { createSSRRequest } from "@/api/withAuthSSR";

export async function prefetchGetSubscriptionDetail(queryClient: QueryClient, subscriptionId: number) {
	const ssrAxios = createSSRRequest();
	await queryClient.prefetchQuery({
		queryKey: [queryKeys.SUBSCRIPTION.BASE, queryKeys.SUBSCRIPTION.GET_SUBSCRIPTION_DETAIL, subscriptionId],
		queryFn: () => getSubscriptionDetail(subscriptionId, ssrAxios),
	});
}

export async function prefetchSubscriptionAndDogDetail(queryClient: QueryClient, subscriptionId: number) {
	await prefetchGetSubscriptionDetail(queryClient, subscriptionId);

	const subscriptionDetail = queryClient.getQueryData<SubscriptionDetailDto>([
		queryKeys.SUBSCRIPTION.BASE,
		queryKeys.SUBSCRIPTION.GET_SUBSCRIPTION_DETAIL,
		subscriptionId,
	]);

	if (subscriptionDetail?.dogId) {
		await prefetchGetDogDetail(queryClient, subscriptionDetail.dogId);
	}
}