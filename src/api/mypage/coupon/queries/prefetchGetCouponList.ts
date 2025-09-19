import { QueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/constants/queryKeys';
import { Coupon } from '@/types';
import { getCouponListTemp } from "@/api/mypage/coupon/coupon";
import { createSSRRequest } from "@/api/withAuthSSR";

export async function prefetchGetCouponList(queryClient: QueryClient) {
  const ssrAxios = createSSRRequest();
  await queryClient.prefetchQuery<Coupon[]>({
    queryKey: [queryKeys.COUPON.BASE, queryKeys.COUPON.GET_COUPON_LIST],
    queryFn: () => getCouponListTemp(ssrAxios),
  });
}