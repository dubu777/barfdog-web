import { Coupon, OrderType } from "@/types";

type Reason = "minPrice" | "orderType"

interface CouponDiscountResult {
  discountAmount: number;
  exceededAvailableMexDiscount: boolean;
}

interface CouponUsabilityResult {
  usable: boolean;
  reasons: Reason[];
}


/**
 * 쿠폰 사용 가능 여부 판단 함수
 */
export function isCouponUsable(
  coupon: Coupon,
  orderPrice: number,
  orderType: string
): CouponUsabilityResult {
  const reasons: Reason[] = [];
  
  // 주문 금액이 최소 주문 금액 미달이면 "minPrice" 추가
  if (orderPrice <= coupon.availableMinPrice) {
    reasons.push("minPrice");
  }
  
  // 주문 타입이 일치하지 않으면 "orderType" 추가
  if (coupon.couponTarget !== "ALL" && coupon.couponTarget !== orderType) {
    reasons.push("orderType");
  }
  
  return {
    usable: reasons.length === 0,
    reasons,
  };
}
/**
 * 사용 가능한 쿠폰 목록을 반환하는 함수
 * @param coupons - 쿠폰 배열
 * @param orderPrice - 주문 금액
 * @param orderType - 일반, 구독 결제 여부
 * @returns 사용 가능한 쿠폰 배열
 */
export function getAvailableCoupons(coupons: Coupon[], orderPrice: number, orderType: OrderType): Coupon[] {
  return coupons.filter(coupon => isCouponUsable(coupon, orderPrice, orderType).usable);
}

/**
 * 쿠폰 할인 금액 계산 함수
 * @param orderPrice - 주문 금액
 * @param coupon - 쿠폰 정보 객체
 * @param maxAvailableDiscount - 전역 최대 할인 금액 (예: useDiscountStore()에서 가져온 값)
 * @returns 쿠폰 할인 계산 결과 객체
 *          - discountBasedOnCoupon: 쿠폰의 최대 할인 금액만 고려
 *          - discountBasedOnCouponAndGlobal: 쿠폰의 최대 할인 금액과 전역 최대 할인 금액을 고려
 */
export function calculateCouponDiscount(
  orderPrice: number,
  coupon: Coupon,
  maxAvailableDiscount: number
): { discountBasedOnCoupon: number; discountBasedOnCouponAndGlobal: number } {
  let calculatedDiscount = 0;

  // 할인 유형에 따라 기본 할인 금액 계산
  switch (coupon.discountType) {
    case "FIXED_RATE":
      calculatedDiscount = orderPrice * (coupon.discountDegree / 100);
      break;
    case "FLAT_RATE":
      calculatedDiscount = coupon.discountDegree;
      break;
    default:
      console.warn(`알 수 없는 할인 유형: ${coupon.discountType}`);
      return { discountBasedOnCoupon: 0, discountBasedOnCouponAndGlobal: 0 };
  }

  // 쿠폰에 설정된 최대 할인 금액 제한만 적용한 할인 금액 계산
  const discountBasedOnCoupon = Math.min(calculatedDiscount, coupon.availableMaxDiscount);
  
  // 쿠폰 제한과 전역 최대 할인 금액 제한을 모두 적용한 할인 금액 계산
  const discountBasedOnCouponAndGlobal = Math.min(discountBasedOnCoupon, maxAvailableDiscount);

  return { discountBasedOnCoupon, discountBasedOnCouponAndGlobal };
}

/**
 * 쿠폰 정렬 유틸 함수
 * 정렬 조건:
 *  1. 사용 가능한 쿠폰이 사용 불가능 쿠폰보다 앞에 배치
 *  2. 할인 금액(discountAmount)이 높은 순
 *  3. 만료일(expiredDate)이 임박한 순
 *
 * @param coupons - 정렬할 쿠폰 배열
 * @param orderPrice - 주문 금액
 * @param orderType - 주문 타입 (쿠폰 대상과 비교)
 * @param maxAvailableDiscount - 전역 최대 할인 금액
 * @returns 정렬된 쿠폰 배열
 */
export function sortCoupons(
  coupons: Coupon[],
  orderPrice: number,
  orderType: OrderType,
  maxAvailableDiscount: number
): Coupon[] {
  // 미리 계산된 값을 이용하여 정렬 효율 개선
  const computedCoupons = coupons.map((coupon) => ({
    coupon,
    usable: isCouponUsable(coupon, orderPrice, orderType).usable,
    discount: calculateCouponDiscount(orderPrice, coupon, maxAvailableDiscount).discountBasedOnCoupon,
    expiry: new Date(coupon.expiredDate).getTime(),
  }));

  computedCoupons.sort((a, b) => {
    // 1. 사용 가능 여부: 사용 가능이면 앞쪽에 배치
    if (a.usable !== b.usable) {
      return a.usable ? -1 : 1;
    }
    // 2. 할인 금액: 내림차순 정렬
    if (a.discount !== b.discount) {
      return b.discount - a.discount;
    }
    // 3. 만료일: 임박한 쿠폰이 먼저 오도록 (오름차순 정렬)
    return a.expiry - b.expiry;
  });

  return computedCoupons.map((item) => item.coupon);
}

// 쿠폰 사용 텍스트
export function getCouponTargetText(couponTarget: string): string {
  switch (couponTarget) {
    case "ALL":
      return "전체사용가능";
    case "GENERAL":
      return "일반상품사용가능";
    case "SUBSCRIBE":
      return "구독상품사용가능";
    default:
      return "";
  }
}