"use client";

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
  orderType: OrderType;
  selectedItemPrice: number;
  selectedCouponId?: number;
  setCouponDiscount: (amount: number) => void;
  isAppliedCoupon: (couponId: number) => boolean;
  updateSelectedCoupon: (couponId: number, discountAmount: number) => void;
}

export default function CouponCard({
  coupon,
  orderType,
  selectedItemPrice,
  selectedCouponId,
  setCouponDiscount,
  isAppliedCoupon,
  updateSelectedCoupon,
}: CouponCardProps) {
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

  const handleSelectCoupon = () => {
    updateSelectedCoupon(coupon.memberCouponId, couponDiscountAmount);
    setCouponDiscount(couponDiscountAmount); // 상태 업데이트를 직접 호출
  };

  // 쿠폰이 유효하지 않거나 이미 적용된 쿠폰인 경우 null 반환
  const isValidCoupons =
    orderType === ORDER_TYPE.GENERAL
      ? !isValid || isAppliedCoupon(coupon.memberCouponId)
      : !isValid;
  if (isValidCoupons) return null;
  return (
    <div
      className={styles.couponCardContainer({
        isSelected: selectedCouponId === coupon.memberCouponId,
      })}
      onClick={handleSelectCoupon}
    >
      <div>{coupon.name}</div>
      <div>{formatDate(coupon.expiredDate, "onlyDate")}</div>
      <div>{couponDiscountInfo}</div>
      <div>- {couponDiscountAmount}원</div>
    </div>
  );
}
