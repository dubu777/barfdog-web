"use client";

import { useOrderStore } from "@/store/useOrderStore";
import * as styles from "./CouponCard.css";
import { Coupon } from "@/types";
import {
  calculateCouponDiscount,
  isValidCoupon,
} from "@/utils/coupon/couponUtils";
import { formatDate } from "@/utils/dateUtils";

interface CouponCardProps {
  coupon: Coupon;
  selectedItemPrice: number;
  selectedCouponId?: number;
  onSelectCoupon: (couponId: number, discountAmount: number) => void;
}

export default function CouponCard({
  coupon,
  selectedItemPrice,
  selectedCouponId,
  onSelectCoupon,
}: CouponCardProps) {
  const { isAppliedCoupon } = useOrderStore();

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

  // 쿠폰이 유효하지 않거나 이미 적용된 쿠폰인 경우 null 반환
  if (!isValid || isAppliedCoupon(coupon.memberCouponId)) return null;
  return (
    <div
      className={styles.couponCardContainer({
        isSelected: selectedCouponId === coupon.memberCouponId,
      })}
      onClick={() =>
        onSelectCoupon(coupon.memberCouponId, couponDiscountAmount)
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
