import { QueryClient } from "@tanstack/react-query";
import { createSSRRequest } from "@/api/withAuthSSR";
import { queryKeys } from "@/constants";
import { getCouponList } from "@/api/mypage/coupon/coupon";

export async function prefetchGetInfiniteCouponList(
  queryClient: QueryClient
) {
  const ssrAxios = createSSRRequest();
  await queryClient.prefetchInfiniteQuery({
    queryKey: [queryKeys.COUPON.BASE, queryKeys.COUPON.GET_COUPON_LIST, 'NON_ALLIANCE'],
    queryFn: async ({ pageParam = 0 }) =>
      await getCouponList({
        pageParam,
        couponCategory: 'NON_ALLIANCE',
        instance: ssrAxios
      }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      const currentPage = lastPage.page.page ?? 0;
      const totalPages = lastPage.page.totalPages ?? 0;
      return currentPage + 1 < totalPages ? currentPage + 1 : undefined;
    },
  });
}
