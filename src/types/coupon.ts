import { CouponTarget, DiscountType, Pagination } from "./common";

type CouponCategory = "ALLIANCE" | "NON_ALLIANCE";
type CouponStatus = "ACTIVE" | "INACTIVE";

interface Coupon {
  availableMaxDiscount: number;
  availableMinPrice: number; // 최소 사용 금액
  couponTarget: CouponTarget;
  description: string;
  discountDegree: number; // 할인율 또는 금액
  discountType: DiscountType; // 할인 유형
  expiredDate: string;
  name: string; // 쿠폰 이름
  remaining: number; // 남은 쿠폰 수
  status?: CouponStatus; // 남은 쿠폰 수
  id: number;
  memberCouponId?: number;
  amount?: number;
}

type Reason = "minPrice" | "orderType";

interface CouponUsabilityResult {
  usable: boolean;
  reasons: Reason[];
}

interface RawCouponList {
  allianceCouponList: Coupon[];
	nonAllianceCouponList: Coupon[];
	pagination: Pagination;
}

export type {
  Coupon,
  Reason,
  CouponUsabilityResult,
  CouponCategory,
  RawCouponList,
};
