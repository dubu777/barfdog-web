import { useInfiniteQuery } from "@tanstack/react-query";
import { queryKeys } from "@/constants";
import { getCouponList } from "@/api/mypage/coupon/coupon";
import { CouponCategory } from "@/types/mypage/coupon";

export function useGetInfiniteCouponList(couponCategory: CouponCategory = "NON_ALLIANCE") {
	return useInfiniteQuery({
		queryKey: [queryKeys.COUPON.BASE, queryKeys.COUPON.GET_COUPON_LIST, couponCategory],
		queryFn: async ({ pageParam = 0 }) => {
			const pageNumber = typeof pageParam === 'number' ? pageParam : 0;
			const data = await getCouponList({
				pageParam: pageNumber,
				couponCategory,
			});

			return data;
		},
		getNextPageParam: (lastPage) => {
			if (!lastPage) return undefined;

			const currentPage = lastPage?.page?.page ?? 0;
			const totalPages = lastPage?.page?.totalPages ?? 0;

			const nextPage = currentPage + 1;
			return nextPage < totalPages ? nextPage : undefined;
		},
		initialPageParam: 0,
	});
}