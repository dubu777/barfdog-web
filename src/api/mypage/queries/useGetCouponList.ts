import { useSuspenseQuery } from "@tanstack/react-query";
import { queryKeys } from "@/constants/queryKeys";
import { getCouponList } from "../mypage";
import { Coupon, UseSuspenseQueryCustomOptions } from "@/types";

export function useGetCouponList(queryOptions?: UseSuspenseQueryCustomOptions<Coupon[]>){
  return useSuspenseQuery<Coupon[]>({
    queryKey: [queryKeys.COUPON.BASE, queryKeys.COUPON.GET_COUPON_LIST],
    queryFn: () => getCouponList(),
    ...queryOptions,
  })
}
