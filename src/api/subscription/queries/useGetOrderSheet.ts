import { useSuspenseQuery } from "@tanstack/react-query";
import { queryKeys } from "@/constants/queryKeys";
import { getOrderSheet } from "@/api/subscription/subscription";
import { OrderSheetResponse, UseSuspenseQueryCustomOptions } from "@/types";


export function useGetOrderSheet(subscribeId: number, queryOptions?: UseSuspenseQueryCustomOptions<OrderSheetResponse>) {
  return useSuspenseQuery({
    queryFn: () => getOrderSheet(subscribeId),
    queryKey: [queryKeys.SUBSCRIPTION, queryKeys.GET_ORDER_SHEET, subscribeId],
    ...queryOptions,
  })
}
