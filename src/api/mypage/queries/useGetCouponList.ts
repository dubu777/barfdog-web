import { QueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { queryKeys } from "@/constants/queryKeys";
import { getCouponList } from "../myPage";
import { Coupon, UseSuspenseQueryCustomOptions } from "@/types";

export { useGetCouponList };

const getCouponListQueryKey = [queryKeys.COUPON.BASE, queryKeys.COUPON.GET_COUPON_LIST];

function useGetCouponList(queryOptions?: UseSuspenseQueryCustomOptions<Coupon[]>){
  return useSuspenseQuery<Coupon[]>({
    queryKey: getCouponListQueryKey,
    queryFn: getCouponList,
    ...queryOptions,
  })
}
