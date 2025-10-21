import { useInfiniteQuery } from "@tanstack/react-query";
import { queryKeys } from "@/constants";
import { getCouponList } from "@/api/mypage/coupon/coupon";
import { CouponCategory } from "@/types/mypage/coupon";
import { createInfiniteQueryConfig } from "@/utils/api/infiniteQueryConfig";

export function useGetInfiniteCouponList(couponCategory: CouponCategory = "NON_ALLIANCE") {
	return useInfiniteQuery(createInfiniteQueryConfig({
		queryKey: [
			queryKeys.MYPAGE.BASE, 
			queryKeys.MYPAGE.COUPON.BASE, 
			queryKeys.MYPAGE.COUPON.GET_COUPON_LIST, 
			couponCategory
		],
		queryFn: async ({ pageParam }) => {
			return await getCouponList({
				pageParam,
				couponCategory,
			});
		},
	}));
}