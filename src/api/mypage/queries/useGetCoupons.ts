import { QueryClient, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { queryKeys } from "@/constants/queryKeys";
import { getCouponList } from "../mypage";
import { CouponData } from "@/types";

export { useGetCoupons, prefetchGetCouponList };

const getCouponQueryKey = [queryKeys.COUPON, queryKeys.GET_COUPON_LIST];

function useGetCoupons() {
  const queryClient = useQueryClient();
  return useSuspenseQuery<CouponData[]>({
    queryKey: getCouponQueryKey,
    queryFn: getCouponList,
    initialData: () => queryClient.getQueryData(getCouponQueryKey),
  })
}

async function prefetchGetCouponList(queryClient: QueryClient) {
  await queryClient.prefetchQuery<CouponData[]>({
    queryKey: getCouponQueryKey,
    queryFn: getCouponList,
  });
  
}
