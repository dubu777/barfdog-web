import { useSuspenseQuery } from "@tanstack/react-query";
import { queryKeys } from "@/constants/queryKeys";
import { getOrderSheet } from "@/api/subscription/subscription";


export function useGetOrderSheet(subscribeId: number) {
  return useSuspenseQuery({
    queryKey: [queryKeys.SUBSCRIPTION, queryKeys.GET_ORDER_SHEET, subscribeId],
    queryFn: () => getOrderSheet(subscribeId),
  })
}
