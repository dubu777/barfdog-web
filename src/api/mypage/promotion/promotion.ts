import axiosInstance from "@/api/axiosInstance";
import { CreatePromotion, RawPromotionList, PromotionListSearchValues } from "@/types/mypage/promotion";
import { ApiResponse } from "@/types/common";
import { validateApiResponse } from "@/utils/api/apiResponseUtils";

const getInfinitePromotionList = async ({
	pageParam = 0,
	instance = axiosInstance
}: PromotionListSearchValues) => {
	const { data }: { data: ApiResponse<RawPromotionList> } = await instance.get(`/api/v2/myPage/promotions`, {
		params: { page: pageParam, size: 20 },
	});

	const responseData = validateApiResponse(data, "프로모션 목록 조회에 실패했습니다.");

	const promotionList = responseData.memberPromotionList
		.map(
			promotion => ({
				promotionInfo: promotion.promotionDto,
				promotionCouponInfo: promotion.promotionCouponDto,
			})
		)
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
		page: responseData.pagination,
	}
};


const createPromotion = async (body: CreatePromotion) => {
	const { data } = await axiosInstance.post(`/api/v2/myPage/promotion-coupons/redeem`, body);
	
	return validateApiResponse(data, "프로모션 코드 등록에 실패했습니다.");
}

export {
	getInfinitePromotionList,
	createPromotion,
}