import {QueryClient, useMutation, useQuery, useQueryClient, useSuspenseQuery} from "@tanstack/react-query";
import {queryKeys} from "@/constants/queryKeys";
import {getCouponList} from "@/api/coupon";

export function useGetCoupons() {
  return useSuspenseQuery({
    queryKey: [queryKeys.COUPON, queryKeys.GET_COUPON_LIST],
    queryFn: getCouponList,
    initialData: (data) => data,
  })
}

export async function prefetchGetCouponList(queryClient: QueryClient) {
  await queryClient.prefetchQuery({
    queryKey: [queryKeys.COUPON, queryKeys.GET_COUPON_LIST],
    queryFn: getCouponList,
  });
}
