import { useInfiniteQuery } from "@tanstack/react-query";
import { queryKeys } from "@/constants";
import { getCouponList } from "@/api/coupon/coupon";
import { CouponCategory } from "@/types";
import { createInfiniteQueryConfig } from "@/utils/api/infiniteQueryConfig";

export function useGetInfiniteCouponList(couponCategory: CouponCategory = "NON_ALLIANCE") {
	return useInfiniteQuery(createInfiniteQueryConfig({
		queryKey: [
			queryKeys.COUPON.BASE, 
			queryKeys.COUPON.GET_COUPON_LIST, 
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