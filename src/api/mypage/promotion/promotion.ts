import axiosInstance from "@/api/axiosInstance";
import { CreatePromotion, PromotionListSearchValues } from "@/types/mypage/promotion";

const getInfinitePromotionList = async ({
	pageParam = 0,
	instance = axiosInstance
}: PromotionListSearchValues) => {
	const errorMessage = "프로모션 목록 조회에 실패했습니다.";

	const { data } = await instance.get(`/api/promotions`, {
		params: { page: pageParam, size: 20 },
	});

	if (!data) {
		throw new Error(errorMessage);
	}

	const promotionList = data?._embedded?.queryPromotionsDtoList
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
	const { number, ...rest } = data?.page;
	const page = {
		...rest,
		page: number,
	};

	return {
		promotionList,
		page,
	}
};

const createPromotion = async (body: CreatePromotion) => {
	try {
		const { data } = await axiosInstance.post(`/api/promotions/code`, body);
		if (!data || data.errors) {
			throw new Error(data);
		}
		return data;
	} catch (error) {
		throw error;
	}
}

export {
	getInfinitePromotionList,
	createPromotion,
}