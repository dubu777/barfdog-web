import { discountUnitType } from "@/constants/coupon";
import { Coupon } from "@/types";


/**
 * 쿠폰 할인 계산 함수
 * @param coupon - 적용할 쿠폰 정보
 * @param selectedItemPrice - 선택한 아이템의 가격
 * @param discountUnitType - 할인 단위 (정액 또는 비율)
 * @returns { couponDiscountAmount, couponDiscountInfo }
 */
export const calculateCouponDiscount = (
  coupon: Coupon,
  selectedItemPrice: number,
): { couponDiscountAmount: number; couponDiscountInfo: string } => {
  let couponDiscountAmount = 0;
  let couponDiscountInfo = '';

  switch (coupon.discountType) {
    case 'FLAT_RATE': // 정액 할인
      couponDiscountAmount = coupon.discountDegree;
      couponDiscountInfo = `${couponDiscountAmount}${discountUnitType.FLAT_RATE}`;
      break;

    case 'FIXED_RATE': // 비율 할인
      couponDiscountAmount = Math.floor(
        (selectedItemPrice * coupon.discountDegree) / 100
      );
      couponDiscountInfo = `${coupon.discountDegree}${discountUnitType.FIXED_RATE}`;
      break;

    default:
      throw new Error('Invalid discount type');
  }

  return { couponDiscountAmount, couponDiscountInfo };
};

/**
 * 쿠폰 유효성 검사 함수
 * @param coupon - 적용할 쿠폰 정보
 * @param selectedItemPrice - 선택한 아이템의 가격
 * @param couponDiscountAmount - 계산된 할인 금액
 * @returns 쿠폰이 유효한지 여부
 */
export const isValidCoupon = (
  coupon: Coupon,
  selectedItemPrice: number,
  couponDiscountAmount: number
): boolean => {
  return (
    coupon.remaining > 0 && // 쿠폰 잔여 수량 확인
    selectedItemPrice >= coupon.availableMinPrice && // 최소 사용 금액 조건
    couponDiscountAmount <= coupon.availableMaxDiscount // 최대 할인 금액 조건
  );
};