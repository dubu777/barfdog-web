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
import { useEffect } from "react";

interface CouponCardProps {
  coupon: Coupon;
  orderType: OrderType;
  selectedItemPrice: number;
  selectedCouponId?: number;
  setCouponDiscount: (amount: number) => void;
}

export default function CouponCard({
  coupon,
  orderType,
  selectedItemPrice,
  selectedCouponId,
  setCouponDiscount,
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
  console.log("isValid", isValid);
  console.log("selectedItemPrice", selectedItemPrice);

  useEffect(() => {
    setCouponDiscount(couponDiscountAmount);
  }, [couponDiscountAmount]);

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
      onClick={() =>
        updateSelectedCoupon(coupon.memberCouponId, couponDiscountAmount)
      }
    >
      <div>{coupon.name}</div>
      <div>{formatDate(coupon.expiredDate, "onlyDate")}</div>
      <div>{couponDiscountInfo}</div>
      <div>- {couponDiscountAmount}원</div>
    </div>
  );
}
