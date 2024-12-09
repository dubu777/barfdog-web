import { QueryClient, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { queryKeys } from "@/constants";
import { SubscribeAddressData } from "@/types";
import { getDeliveryAddress } from "@/api/subscription/subscription";

export { useGetDeliveryAddress, prefetchGetDeliveryAddress };

function useGetDeliveryAddress(subscribeId: string) {
  const queryClient = useQueryClient();
  return useSuspenseQuery<SubscribeAddressData>({
    queryKey: [queryKeys.SUBSCRIPTION, queryKeys.GET_DELIVERY_ADDRESS, subscribeId],
    queryFn: () => getDeliveryAddress(subscribeId),
    initialData: () => queryClient.getQueryData([queryKeys.SUBSCRIPTION, queryKeys.GET_DELIVERY_ADDRESS, subscribeId]),
  })
}

async function prefetchGetDeliveryAddress(queryClient: QueryClient, subscribeId: string) {
  await queryClient.prefetchQuery<SubscribeAddressData>({
    queryKey: [queryKeys.SUBSCRIPTION, queryKeys.GET_DELIVERY_ADDRESS, subscribeId],
    queryFn: () => getDeliveryAddress(subscribeId),
  });
}
