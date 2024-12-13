import {QueryClient, useSuspenseQuery} from "@tanstack/react-query";
import {queryKeys} from "@/constants/queryKeys";
import { getSubscriptionById } from "../subscription";
import { SubscriptionByIdDto } from "@/types/subscription";

export { useGetSubscriptionById, prefetchGetSubscriptionById };

function useGetSubscriptionById(subscribeId: string) {
  return useSuspenseQuery<SubscriptionByIdDto>({
    queryKey: [queryKeys.SUBSCRIPTION, queryKeys.GET_SUBSCRIPTION_BY_ID, subscribeId],
    queryFn: () => getSubscriptionById(subscribeId),
  });
}

async function prefetchGetSubscriptionById(queryClient: QueryClient, subscribeId: string) {
  await queryClient.prefetchQuery({
    queryKey: [queryKeys.SUBSCRIPTION, queryKeys.GET_SUBSCRIPTION_BY_ID, subscribeId],
    queryFn: () => getSubscriptionById(subscribeId),
  });
}

