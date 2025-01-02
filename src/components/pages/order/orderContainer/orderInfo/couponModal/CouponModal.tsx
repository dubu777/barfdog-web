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
  const [selectedCoupon, setSelectedCoupon] = useState<{
    couponId: number;
    discountAmount: number;
  } | null>(null);
const { updateAppliedCoupon } = useOrderStore();

const handleSelectCoupon = (couponId: number, discountAmount: number) => {
  setSelectedCoupon({ couponId, discountAmount });
};

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
  return (
    <DefaultModal
      isVisible={isVisible}
      onClose={onClose}
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
