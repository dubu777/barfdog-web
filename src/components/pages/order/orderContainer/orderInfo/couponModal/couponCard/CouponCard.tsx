"use client";

import { useOrderStore } from "@/store/useOrderStore";
import * as styles from "./CouponCard.css";
import { Coupon, OrderType } from "@/types";
import {
  calculateCouponDiscount,
  isValidCoupon,
} from "@/utils/coupon/couponUtils";
import { formatDate } from "@/utils/dateUtils";
import { ORDER_TYPE } from "@/constants";

interface CouponCardProps {
  coupon: Coupon;
  type: OrderType;
  selectedItemPrice: number;
  selectedCouponId?: number;
}

export default function CouponCard({
  coupon,
  type,
  selectedItemPrice,
  selectedCouponId,
}: CouponCardProps) {
  const { isAppliedCoupon, updateSelectedCoupon } = useOrderStore();

  // 쿠폰 할인 계산 유틸 함수
  const { couponDiscountAmount, couponDiscountInfo } = calculateCouponDiscount(
    coupon,
    selectedItemPrice
  );
  // 쿠폰이 유효한지 여부 확인 유틸 함수
  const isValid = isValidCoupon(
    coupon,
    selectedItemPrice,
    couponDiscountAmount
  );
console.log('isValid', isValid);
console.log('selectedItemPrice', selectedItemPrice);

  
  // 쿠폰이 유효하지 않거나 이미 적용된 쿠폰인 경우 null 반환
  const isValidCoupons = type === ORDER_TYPE.GENERAL ? (!isValid || isAppliedCoupon(coupon.memberCouponId)) : !isValid
  if (isValidCoupons) return null;
  return (
    <div
      className={styles.couponCardContainer({
        isSelected: selectedCouponId === coupon.memberCouponId,
      })}
      onClick={() =>
        updateSelectedCoupon(coupon.memberCouponId, couponDiscountAmount)
      }
    >
      <div>{coupon.name}</div>
      <div>{coupon.remaining}개</div>
      <div>{formatDate(coupon.expiredDate, "onlyDate")}</div>
      <div>{couponDiscountInfo}</div>
      <div>- {couponDiscountAmount}원</div>
    </div>
  );
}
