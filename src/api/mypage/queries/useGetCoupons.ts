import {QueryClient, useQueryClient, useSuspenseQuery} from "@tanstack/react-query";
import {queryKeys} from "@/constants/queryKeys";
import {getCouponList} from "../mypage";

export { useGetCoupons, prefetchGetCouponList };

const getCouponQueryKey = [queryKeys.COUPON, queryKeys.GET_COUPON_LIST];

function useGetCoupons() {
  const queryClient = useQueryClient();
  return useSuspenseQuery({
    queryKey: getCouponQueryKey,
    queryFn: getCouponList,
    initialData: () => queryClient.getQueryData(getCouponQueryKey),
  })
}

async function prefetchGetCouponList(queryClient: QueryClient) {
  await queryClient.prefetchQuery({
    queryKey: getCouponQueryKey,
    queryFn: getCouponList,
  });
  
}
