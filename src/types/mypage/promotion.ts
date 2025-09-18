import { AxiosInstance } from "axios";
import { CouponTarget, DiscountType, Pagination } from "@/types";

interface PromotionListSearchValues {
	pageParam?: number;
	size?: number;
	instance?: AxiosInstance;
}

type PromotionStatus = "ACTIVE" | "INACTIVE";
type PromotionType = "COUPON";

interface PromotionCouponInfo {
	couponId: number;
	code: string;
	name: string;
	couponTarget: CouponTarget;
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