import { QueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { queryKeys } from "@/constants";
import { getOrderDetail } from "@/api/order/order";
import { MergeOrderAndRecipe, OrderDetailType, UseSuspenseQueryCustomOptions } from "@/types";

export { useGetOrderDetail, prefetchGetOrderDetail };

function useGetOrderDetail(orderId: string, type: OrderDetailType, queryOptions?: UseSuspenseQueryCustomOptions<MergeOrderAndRecipe>) {
  return useSuspenseQuery<MergeOrderAndRecipe>({
    queryKey: [queryKeys.ORDER.BASE, queryKeys.ORDER.GET_ORDER_DETAIL, orderId],
    queryFn: () => getOrderDetail(orderId, type),
    ...queryOptions,
  })
}

async function prefetchGetOrderDetail(queryClient: QueryClient, orderId: string, type: OrderDetailType) {
  await queryClient.prefetchQuery<MergeOrderAndRecipe>({
    queryKey: [queryKeys.ORDER.BASE, queryKeys.ORDER.GET_ORDER_DETAIL, orderId],
    queryFn: () => getOrderDetail(orderId, type),
  });
}
