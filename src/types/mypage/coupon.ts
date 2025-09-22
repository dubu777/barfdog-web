import { COUPON_TARGET } from "@/constants";
import { DiscountType, Pagination } from "../common";

type CouponCategory = "ALLIANCE" | "NON_ALLIANCE";
type CouponCategoryKey = "allianceCouponList" | "nonAllianceCouponList";

type CouponStatus = "ACTIVE" | "INACTIVE";
type CouponTarget = keyof typeof COUPON_TARGET;

interface RawCouponList {
  allianceCouponList: MyPageCoupon[];
	nonAllianceCouponList: MyPageCoupon[];
	pagination: Pagination;
}

interface MyPageCoupon {
  id: number;
  status: CouponStatus;
  name: string;
  description: string;
  couponTarget: CouponTarget;
  expiredDate: string;
  discountDegree: number;
  discountType: DiscountType;
  remaining: number;
  availableMinPrice: number;
  availableMaxDiscount: number;
  amount?: number;
}

export type {
  CouponCategory,
  CouponCategoryKey,
  RawCouponList,
  MyPageCoupon,
};