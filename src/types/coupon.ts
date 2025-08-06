export type {
  Coupon,
  DiscountType,
  DiscountUnitType,
  Reason,
  CouponUsabilityResult,
  UsingCoupon,
};

interface Coupon {
  availableMaxDiscount: number;
  availableMinPrice: number; // 최소 사용 금액
  couponTarget: "ALL" | "GENERAL" | "SUBSCRIBE";
  description: string;
  discountDegree: number; // 할인율 또는 금액
  discountType: DiscountType; // 할인 유형
  expiredDate: string;
  memberCouponId: number;
  name: string; // 쿠폰 이름
  remaining: number; // 남은 쿠폰 수
  status?: string; // 남은 쿠폰 수
  id?: number;
}


type DiscountType = 'FLAT_RATE' | 'FIXED_RATE';

type DiscountUnitType = '%' | '원';

type Reason = "minPrice" | "orderType"

interface CouponUsabilityResult {
  usable: boolean;
  reasons: Reason[];
}

interface UsingCoupon {
  memberCouponId: number | null;
  discount: number;
  overDiscount?: number;
  couponName?: string | null;
}
