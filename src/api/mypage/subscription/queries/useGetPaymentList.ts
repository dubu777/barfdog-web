import { useSuspenseQuery } from "@tanstack/react-query";
import { queryKeys } from "@/constants/queryKeys";
import { PaymentItem, UseSuspenseQueryCustomOptions } from "@/types";
import { getPaymentList } from "@/api/mypage/subscription/subscription";

export function useGetPaymentList(queryOptions?: UseSuspenseQueryCustomOptions<PaymentItem[]>){
  return useSuspenseQuery<PaymentItem[]>({
    queryKey: [queryKeys.MYPAGE.BASE, queryKeys.MYPAGE.GET_PAYMENT_LIST],
    queryFn: () => getPaymentList(),
    ...queryOptions,
  })
}