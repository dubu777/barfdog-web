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
  selectedCouponId?: number | null;
  onSelectCoupon: (couponId: number, discountAmount: number) => void;
}

export default function CouponCard({
  coupon,
  selectedItemPrice,
  selectedCouponId,
  onSelectCoupon,
}: CouponCardProps) {
  const { couponDiscountAmount, couponDiscountInfo } = calculateCouponDiscount(
    coupon,
    selectedItemPrice
  );

  const isValid = isValidCoupon(
    coupon,
    selectedItemPrice,
    couponDiscountAmount
  );

  console.log(coupon.name, couponDiscountAmount, couponDiscountInfo, isValid);

  if (!isValid) return null;
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
