// DELETE 예정

import { useSuspenseQuery } from "@tanstack/react-query";
import { queryKeys } from "@/constants/queryKeys";
import { UseSuspenseQueryCustomOptions } from "@/types";
import { getPaymentList } from "@/api/mypage/subscription/subscription";

export function useGetPaymentList(queryOptions?: UseSuspenseQueryCustomOptions){
  return useSuspenseQuery({
    queryKey: [queryKeys.MYPAGE.BASE, queryKeys.MYPAGE.COMMON.BASE, queryKeys.MYPAGE.COMMON.GET_PAYMENT_LIST],
    queryFn: () => getPaymentList(),
    ...queryOptions,
  })
}