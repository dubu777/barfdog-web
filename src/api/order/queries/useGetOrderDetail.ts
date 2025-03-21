import { QueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { queryKeys } from "@/constants";
import { getOrderDetail } from "@/api/order/order";
import { MergeOrderAndRecipe, OrderType, UseSuspenseQueryCustomOptions } from "@/types";

export { useGetOrderDetail, prefetchGetOrderDetail };

function useGetOrderDetail(orderId: number, type: OrderType, queryOptions?: UseSuspenseQueryCustomOptions<MergeOrderAndRecipe>) {
  return useSuspenseQuery<MergeOrderAndRecipe>({
    queryKey: [queryKeys.ORDER.BASE, queryKeys.ORDER.GET_ORDER_DETAIL, orderId],
    queryFn: () => getOrderDetail(orderId, type),
    ...queryOptions,
  })
}

async function prefetchGetOrderDetail(queryClient: QueryClient, orderId: number, type: OrderType) {
  await queryClient.prefetchQuery<MergeOrderAndRecipe>({
    queryKey: [queryKeys.ORDER.BASE, queryKeys.ORDER.GET_ORDER_DETAIL, orderId],
    queryFn: () => getOrderDetail(orderId, type),
  });
}
