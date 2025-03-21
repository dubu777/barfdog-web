import { QueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { queryKeys } from "@/constants";
import { getOrderDetail } from "@/api/order/order";
import { MergeOrderAndRecipe, OrderType, UseSuspenseQueryCustomOptions } from "@/types";

export { useGetOrderDetail, prefetchGetOrderDetail };

function useGetOrderDetail(orderId: string, type: OrderType, queryOptions?: UseSuspenseQueryCustomOptions<MergeOrderAndRecipe>) {
  return useSuspenseQuery<MergeOrderAndRecipe>({
    queryKey: [queryKeys.ORDER.BASE, queryKeys.ORDER.GET_ORDER_DETAIL, orderId],
    queryFn: () => getOrderDetail(orderId, type),
    ...queryOptions,
  })
}

async function prefetchGetOrderDetail(queryClient: QueryClient, orderId: string, type: OrderType) {
  await queryClient.prefetchQuery<MergeOrderAndRecipe>({
    queryKey: [queryKeys.ORDER.BASE, queryKeys.ORDER.GET_ORDER_DETAIL, orderId],
    queryFn: () => getOrderDetail(orderId, type),
  });
}
