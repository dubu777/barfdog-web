import { QueryClient, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { queryKeys } from "@/constants";
import { getOrderDetail } from "@/api/order/order";
import { MergeOrderAndRecipe, OrderDetailType } from "@/types";

export { useGetOrderDetail, prefetchGetOrderDetail };

function useGetOrderDetail(orderId: string, type: OrderDetailType) {
  const queryClient = useQueryClient();
  return useSuspenseQuery<MergeOrderAndRecipe>({
    queryKey: [queryKeys.ORDER, queryKeys.ORDER_DETAIL, orderId],
    queryFn: () => getOrderDetail(orderId, type),
    initialData: () => queryClient.getQueryData([queryKeys.ORDER, queryKeys.ORDER_DETAIL, orderId]),
  })
}

async function prefetchGetOrderDetail(queryClient: QueryClient, orderId: string, type: OrderDetailType) {
  await queryClient.prefetchQuery<MergeOrderAndRecipe>({
    queryKey: [queryKeys.ORDER, queryKeys.ORDER_DETAIL, orderId],
    queryFn: () => getOrderDetail(orderId, type),
  });
}
