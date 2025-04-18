import { QueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { queryKeys } from "@/constants/queryKeys";
import { PaymentItem, UseSuspenseQueryCustomOptions } from "@/types";
import { getPaymentList } from "@/api/mypage/mypage";

export { useGetPaymentList, prefetchGetPaymentList };

const getPaymentListQueryKey = [queryKeys.MYPAGE.BASE, queryKeys.MYPAGE.GET_PAYMENT_LIST];

function useGetPaymentList(queryOptions?: UseSuspenseQueryCustomOptions<PaymentItem[]>){
  return useSuspenseQuery<PaymentItem[]>({
    queryKey: getPaymentListQueryKey,
    queryFn: getPaymentList,
    ...queryOptions,
  })
}

async function prefetchGetPaymentList(queryClient: QueryClient) {
  await queryClient.prefetchQuery<PaymentItem[]>({
    queryKey: getPaymentListQueryKey,
    queryFn: getPaymentList,
  });
}
