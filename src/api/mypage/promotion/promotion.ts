import axiosInstance from "@/api/axiosInstance";
import { CreatePromotion, RawPromotionList } from "@/types/mypage/promotion";
import { ApiResponse } from "@/types/common";
import { validateApiResponse } from "@/utils/api/apiResponseUtils";

const getPromotionList = async ({
	pageParam = 0,
	instance = axiosInstance
}) => {
	const { data }: { data: ApiResponse<RawPromotionList> } = await instance.get(`/api/v2/user/coupons/promotion`, {
		params: { page: pageParam, size: 20 },
	});

	const responseData = validateApiResponse(data, "프로모션 목록 조회에 실패했습니다.");

	const promotionList = responseData.promotionCouponDetailList
		.sort((a, b) => {
			// 1. ACTIVE
			if (a.promotionInfo.status === "ACTIVE" && b.promotionInfo.status !== "ACTIVE") return -1;
			if (a.promotionInfo.status !== "ACTIVE" && b.promotionInfo.status === "ACTIVE") return 1;

			// 2. createdDate 최신순
			return (
				new Date(b.promotionCouponInfo.createdDate).getTime() -
				new Date(a.promotionCouponInfo.createdDate).getTime()
			);
		})
	?? [];

	return {
		promotionList,
		pagination: responseData.pagination,
	}
};


const createPromotion = async (body: CreatePromotion) => {
	const { data } = await axiosInstance.post(`/api/v2/user/coupons/promotion/redeem`, body);
	
	return validateApiResponse(data, "프로모션 코드 등록에 실패했습니다.");
}

export {
	getPromotionList,
	createPromotion,
}