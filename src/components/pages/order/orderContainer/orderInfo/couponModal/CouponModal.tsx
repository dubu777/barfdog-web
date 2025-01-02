"use client";

import * as styles from "./CouponModal.css";
import DefaultModal from "@/components/common/defaultModal/DefaultModal";
import { GeneralOrderSheetResponse, OrderType } from "@/types";
import { calculateCouponDiscount } from "@/utils/coupon/couponUtils";
import { useState } from "react";
import CouponCard from "./couponCard/CouponCard";
import DefaultButton from "@/components/common/defaultButton/DefaultButton";
import { useOrderStore } from "@/store/useOrderStore";

interface CouponModalProps {
  isVisible: boolean;
  onClose: () => void;
  type: OrderType;
  selectedItemPrice: number;
  selectedItemId: number | null;
  generalOrderSheetData?: GeneralOrderSheetResponse | null;
}

export default function CouponModal({
  isVisible,
  onClose,
  type,
  selectedItemPrice,
  selectedItemId,
  generalOrderSheetData,
}: CouponModalProps) {
  const { updateAppliedCoupon, setSelectedCoupon, selectedCoupon } =
    useOrderStore();

  // 쿠폰 선택 함수
  const handleSelectCoupon = (couponId: number, discountAmount: number) => {
    if (selectedCoupon?.couponId === couponId) {
      // 이미 선택된 쿠폰이면 선택 해제
      setSelectedCoupon(null);
    } else {
      setSelectedCoupon({ couponId, discountAmount });
    }
  };

  // 쿠폰 적용 함수
  const handleApplyCoupon = () => {
    if (selectedItemId && selectedCoupon) {
      updateAppliedCoupon(
        selectedItemId,
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
      {type === "general" && (
        <div>
          {generalOrderSheetData?.coupons.map((coupon) => (
            <CouponCard
              key={coupon.memberCouponId}
              coupon={coupon}
              selectedItemPrice={selectedItemPrice}
              onSelectCoupon={handleSelectCoupon}
              selectedCouponId={selectedCoupon?.couponId}
            />
          ))}
          <DefaultButton onClick={handleApplyCoupon}>쿠폰 적용</DefaultButton>
        </div>
      )}
    </DefaultModal>
  );
}
