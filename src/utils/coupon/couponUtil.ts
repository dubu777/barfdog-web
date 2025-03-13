import { Coupon } from "@/types";

/**
 * 쿠폰 할인 계산 결과 인터페이스
 */
export interface CouponDiscountResult {
  discountAmount: number;
  exceededAvailableMexDiscount: boolean;
}

/**
 * 쿠폰 사용 가능 여부 판단 함수
 * @param coupon - 쿠폰 정보 객체
 * @param orderPrice - 주문 금액
 * @returns 사용 가능하면 true, 아니면 false
 */
export function isCouponUsable(coupon: Coupon, orderPrice: number): boolean {
  return orderPrice > coupon.availableMinPrice;
}

/**
 * 사용 가능한 쿠폰 목록을 반환하는 함수
 * @param coupons - 쿠폰 배열
 * @param orderPrice - 주문 금액
 * @returns 사용 가능한 쿠폰 배열
 */
export function getAvailableCoupons(coupons: Coupon[], orderPrice: number): Coupon[] {
  return coupons.filter(coupon => isCouponUsable(coupon, orderPrice));
}

/**
 * 쿠폰 할인 금액 계산 함수
 * @param orderPrice - 주문 금액
 * @param coupon - 쿠폰 정보 객체
 * @param maxAvailableDiscount - 전역 최대 할인 금액 (예: useDiscountStore()에서 가져온 값)
 * @returns 쿠폰 할인 계산 결과 객체
 *          - discount: 최종 할인 금액
 *          - exceededAvailableMexDiscount: 전역 최대 할인 금액을 초과했는지 여부
 */
export function calculateCouponDiscount(
  orderPrice: number,
  coupon: Coupon,
  maxAvailableDiscount: number
): CouponDiscountResult {
  let calculatedDiscount = 0;

  // 할인 유형에 따른 할인 금액 계산
  switch (coupon.discountType) {
    case "FIXED_RATE":
      // 할인율(%) 적용
      calculatedDiscount = orderPrice * (coupon.discountDegree / 100);
      break;
    case "FLAT_RATE":
      // 정해진 할인 금액 적용
      calculatedDiscount = coupon.discountDegree;
      break;
    default:
      console.warn(`알 수 없는 할인 유형: ${coupon.discountType}`);
      return { discountAmount: 0, exceededAvailableMexDiscount: false };
  }

  // 쿠폰에 설정된 최대 할인 금액 제한 적용
  if (calculatedDiscount > coupon.availableMaxDiscount) {
    calculatedDiscount = coupon.availableMaxDiscount;
  }

  // 전역 최대 할인 금액 제한 적용 및 초과 여부 체크
  let exceededAvailableMexDiscount = false;
  if (calculatedDiscount > maxAvailableDiscount) {
    exceededAvailableMexDiscount = true;
    calculatedDiscount = maxAvailableDiscount;
  }

  return { discountAmount: calculatedDiscount, exceededAvailableMexDiscount };
}
