import { QueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { queryKeys } from "@/constants";
import { BenefitDto, UseSuspenseQueryCustomOptions } from "@/types";
import { getSubscriptionBenefits } from "@/api/subscription/subscription";

export { useGetSubscriptionBenefits, prefetchGetSubscriptionBenefits };

function useGetSubscriptionBenefits(subscribeId: string, queryOptions?: UseSuspenseQueryCustomOptions<BenefitDto[]>) {
  return useSuspenseQuery<BenefitDto[]>({
    queryKey: [queryKeys.SUBSCRIPTION.BASE, queryKeys.SUBSCRIPTION.GET_SUBSCRIPTION_BENEFITS, subscribeId],
    queryFn: () => getSubscriptionBenefits(subscribeId),
    ...queryOptions,
  })
}

async function prefetchGetSubscriptionBenefits(queryClient: QueryClient, subscribeId: string) {
await queryClient.prefetchQuery<BenefitDto[]>({
    queryKey: [queryKeys.SUBSCRIPTION.BASE, queryKeys.SUBSCRIPTION.GET_SUBSCRIPTION_BENEFITS, subscribeId],
    queryFn: () => getSubscriptionBenefits(subscribeId),
  });
}
