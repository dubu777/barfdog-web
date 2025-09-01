import { AxiosInstance } from "axios";
import { DiscountType } from "@/types";
import { PROMOTION_COUPON_TYPE } from "@/constants/mypage/promotion";

interface PromotionListSearchValues {
	pageParam?: number;
	size?: number;
	instance?: AxiosInstance;
}

type PromotionCouponTarget = keyof typeof PROMOTION_COUPON_TYPE;
type PromotionStatus = "ACTIVE" | "INACTIVE";
type PromotionType = "COUPON";

interface PromotionCouponInfo {
	couponId: number;
	code: string;
	name: string;
	couponTarget: PromotionCouponTarget;
	discountDegree: number;
	discountType: DiscountType;
	availableMinPrice: number;
	availableMaxDiscount: number;
	amount: number;
	createdDate: string;
}

interface PromotionInfo {
	promotionId: number;
	type: PromotionType;
	status: PromotionStatus;
	name: string;
	startDate: string;
	expiredDate: string;
}

interface PromotionItem {
	promotionInfo: PromotionInfo;
	promotionCouponInfo: PromotionCouponInfo;
}

interface CreatePromotion {
	promotionCode: string;
}

export type {
	PromotionListSearchValues,
	PromotionItem,
	CreatePromotion,
}