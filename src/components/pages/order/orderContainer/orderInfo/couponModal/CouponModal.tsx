"use client";

import * as styles from "./CouponModal.css";
import DefaultModal from "@/components/common/defaultModal/DefaultModal";
import { Coupon, OrderType } from "@/types";
import { calculateCouponDiscount } from "@/utils/coupon/couponUtils";
import { useState } from "react";
import CouponCard from "./couponCard/CouponCard";
import DefaultButton from "@/components/common/defaultButton/DefaultButton";
import { useOrderStore } from "@/store/useOrderStore";
import { ORDER_TYPE } from "@/constants";

interface CouponModalProps {
  isVisible: boolean;
  onClose: () => void;
  type: OrderType;
  selectedItemPrice: number;
  selectedItemId?: number | null;
  couponData?: Coupon[] | null;
}

export default function CouponModal({
  isVisible,
  onClose,
  type,
  selectedItemPrice,
  selectedItemId,
  couponData,
}: CouponModalProps) {
  const { updateAppliedCoupon, setSelectedCoupon, selectedCoupon } =
    useOrderStore();
  

  // 쿠폰 적용 함수
  const handleApplyCoupon = () => {
    if (selectedCoupon) {
      updateAppliedCoupon(
        type,
        type === ORDER_TYPE.GENERAL ? selectedItemId ?? null : null,
        selectedCoupon.couponId,
        selectedCoupon.discountAmount
      );
      onClose();
    }
  };

  // 모달 닫기 함수
  const handleClose = () => {
    setSelectedCoupon(null); // 쿠폰 선택 초기화
    onClose();
  };

  console.log("selectedCoupon", selectedCoupon);

  return (
    <DefaultModal
      isVisible={isVisible}
      onClose={handleClose}
      type="info"
      size="lg"
      scroll
    >
        <div>
          {couponData?.map((coupon) => (
            <CouponCard
              key={coupon.memberCouponId}
              coupon={coupon}
              type={type}
              selectedItemPrice={selectedItemPrice}
              selectedCouponId={selectedCoupon?.couponId}
            />
          ))}
          <DefaultButton onClick={handleApplyCoupon}>쿠폰 적용</DefaultButton>
        </div>
    </DefaultModal>
  );
}
