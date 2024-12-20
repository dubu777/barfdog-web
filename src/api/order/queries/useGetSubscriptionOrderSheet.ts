import { QueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { queryKeys } from "@/constants/queryKeys";
import { SubscriptionOrderSheetResponse, UseSuspenseQueryCustomOptions } from "@/types";
import { getSubscriptionOrderSheet } from "../order";


export function useGetSubscriptionOrderSheet(subscribeId: number, queryOptions?: UseSuspenseQueryCustomOptions<SubscriptionOrderSheetResponse>) {
  return useSuspenseQuery({
    queryFn: () => getSubscriptionOrderSheet(subscribeId),
    queryKey: [queryKeys.ORDER.BASE, queryKeys.ORDER.GET_ORDER_SHEET, subscribeId],
    staleTime: 0, // 뒤로가기 후 데이터 변경 후 router.push로 재점근시 캐싱된 데이터 불러오는 문제가 발생해서 0으로 놓고 사용, 
    ...queryOptions,
  })
}


export async function prefetchGetSubscriptionOrderSheet(queryClient: QueryClient, subscribeId: number) {
    await queryClient.prefetchQuery({
      queryFn: () => getSubscriptionOrderSheet(subscribeId),
      queryKey: [queryKeys.ORDER.BASE, queryKeys.ORDER.GET_ORDER_SHEET, subscribeId],
    });
}
