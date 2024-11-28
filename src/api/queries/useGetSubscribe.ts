import {QueryClient, useSuspenseQuery} from "@tanstack/react-query";
import {queryKeys} from "@/constants/queryKeys";
import {getSubscribeById} from "@/api/subscribe";
import { SubscribeByIdDto } from "@/types/subscription";

export function useGetSubscribe(subscribeId: number) {
  return useSuspenseQuery<SubscribeByIdDto>({
    queryKey: [queryKeys.SUBSCRIBE, queryKeys.GET_SUBSCRIBE_BY_ID, subscribeId],
    queryFn: () => getSubscribeById(subscribeId),
  });
}

export async function prefetchGetSubscribe(queryClient: QueryClient, subscribeId: number) {
  await queryClient.prefetchQuery({
    queryKey: [queryKeys.SUBSCRIBE, queryKeys.GET_SUBSCRIBE_BY_ID, subscribeId],
    queryFn: () => getSubscribeById(Number(subscribeId)),
  });
}

