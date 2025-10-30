import { AxiosInstance } from "axios";
import axiosInstance from "@/api/axiosInstance";
import { ApiResponse, Coupon, CouponCategory, Pagination } from "@/types";
import { RawCouponList } from "@/types";
import { validateApiResponse } from "@/utils/api/apiResponseUtils";

const getCouponList = async ({
	pageParam = 0,
	couponCategory = "NON_ALLIANCE",
	instance = axiosInstance
}: {
	pageParam: number;
	couponCategory?: CouponCategory;
	instance?: AxiosInstance;
}): Promise<{ couponList: Coupon[]; pagination: Pagination }> => {
	const endpoint = couponCategory === "ALLIANCE" 
		? `/api/v2/user/coupons/alliance`
		: `/api/v2/user/coupons/internal`;
	
	const errorMessage = couponCategory === "ALLIANCE" 
		? "제휴사 쿠폰 목록 조회에 실패했습니다."
		: "쿠폰 목록 조회에 실패했습니다.";

	const { data }: { data: ApiResponse<RawCouponList> } = await instance.get(endpoint, {
		params: { page: pageParam, size: 20 },
	});

	const responseData = validateApiResponse(data, errorMessage);

	const couponCategoryToKey = {
		ALLIANCE: "allianceCouponList",
		NON_ALLIANCE: "nonAllianceCouponList",
	}

	const couponListKey = couponCategoryToKey[couponCategory];
	const couponList = responseData[couponListKey] ?? [];
	
	return {
		couponList,
		pagination: responseData.pagination,
	}
};

const createCoupon = async (code: string, couponCategory: CouponCategory) => {
	const endpoint = couponCategory === "ALLIANCE" 
		? `/api/v2/user/coupons/alliance/redeem`
		: `/api/v2/user/coupons/internal/redeem`;
	const { data } = await axiosInstance.post(endpoint, { code });
	return validateApiResponse(data, "쿠폰 코드 등록에 실패했습니다.");
}

export {
	getCouponList,
	createCoupon,
}