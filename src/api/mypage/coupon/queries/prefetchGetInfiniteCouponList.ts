import { QueryClient } from "@tanstack/react-query";
import { createSSRRequest } from "@/api/withAuthSSR";
import { queryKeys } from "@/constants";
import { getCouponList } from "@/api/mypage/coupon/coupon";
import { prefetchInfiniteQuery } from "@/utils/api/infiniteQueryConfig";

export async function prefetchGetInfiniteCouponList(
  queryClient: QueryClient
) {
  const ssrAxios = createSSRRequest();
  return await prefetchInfiniteQuery(queryClient, {
    queryKey: [
      queryKeys.MYPAGE.BASE, 
      queryKeys.MYPAGE.COUPON.BASE, 
      queryKeys.MYPAGE.COUPON.GET_COUPON_LIST, 
      'NON_ALLIANCE'
    ],
    queryFn: async ({ pageParam, instance }) =>
      await getCouponList({
        pageParam,
        couponCategory: 'NON_ALLIANCE',
        instance
      }),
  }, ssrAxios);
}
