import { QueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { queryKeys } from "@/constants/queryKeys";
import { getCouponList } from "../myPage";
import { CouponData, UseSuspenseQueryCustomOptions } from "@/types";

export { useGetCouponList, prefetchGetCouponList };

const getCouponListQueryKey = [queryKeys.COUPON.BASE, queryKeys.COUPON.GET_COUPON_LIST];

function useGetCouponList(queryOptions?: UseSuspenseQueryCustomOptions<CouponData[]>){
  return useSuspenseQuery<CouponData[]>({
    queryKey: getCouponListQueryKey,
    queryFn: getCouponList,
    ...queryOptions,
  })
}

async function prefetchGetCouponList(queryClient: QueryClient) {
  await queryClient.prefetchQuery<CouponData[]>({
    queryKey: getCouponListQueryKey,
    queryFn: getCouponList,
  });
  
}
