import { useSuspenseQuery } from "@tanstack/react-query";
import { queryKeys } from "@/constants";
import { UseSuspenseQueryCustomOptions } from "@/types";
import { getOrderDetail } from "../order";
import { OrderType } from "@/types/mypage/orders";
import { OrderDetail } from "@/types/mypage/orders";

export function useGetOrderDetail(orderId: number, type: OrderType, queryOptions?: UseSuspenseQueryCustomOptions<OrderDetail>) {
  return useSuspenseQuery<OrderDetail>({
    queryKey: [queryKeys.MYPAGE.BASE, queryKeys.MYPAGE.ORDERS.BASE, queryKeys.MYPAGE.ORDERS.GET_ORDER_DETAIL, orderId],
    queryFn: () => getOrderDetail(orderId, type),
    ...queryOptions,
  })
}
