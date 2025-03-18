"use client";

import * as styles from "./CouponModal.css";
import DefaultModal from "@/components/common/defaultModal/DefaultModal";
import { Coupon, OrderType } from "@/types";
import CouponCard from "./couponCard/CouponCard";
import DefaultButton from "@/components/common/defaultButton/DefaultButton";
import { ORDER_TYPE } from "@/constants";
import { useState } from "react";
import { useCouponStore } from "@/store/order/useCouponStore";
import { useOrderStore } from "@/store/order/useOrderStore";
import { useDiscountStore } from "@/store/order/useDiscountStore";

interface CouponModalProps {
  isVisible: boolean;
  onClose: () => void;
  orderType: OrderType;
  selectedItemPrice: number;
  selectedItemId?: number | null;
  couponData?: Coupon[] | null;
}

export default function CouponModal({
  isVisible,
  onClose,
  orderType,
  selectedItemPrice,
  selectedItemId,
  couponData,
}: CouponModalProps) {
  const { selectedCoupon, setSelectedCoupon, updateSelectedCoupon } =
    useCouponStore();
  const { maxAvailableDiscount } = useDiscountStore();
  const { updateAppliedCoupon, isAppliedCoupon } = useOrderStore();
  const [couponDiscount, setCouponDiscount] = useState<number>(0);


  // 쿠폰 적용 함수
  const handleApplyCoupon = () => {
    if (selectedCoupon) {
      // calculateCouponDiscount 호출
      if (couponDiscount > maxAvailableDiscount) {
        alert(
          `적용 가능한 최대 할인 금액(${maxAvailableDiscount}원)을 초과합니다.`
        );
        return;
      }

      updateAppliedCoupon(
        orderType,
        orderType === ORDER_TYPE.GENERAL ? selectedItemId ?? null : null,
        selectedItemPrice,
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
            orderType={orderType}
            selectedItemPrice={selectedItemPrice}
            selectedCouponId={selectedCoupon?.couponId}
            setCouponDiscount={setCouponDiscount}
            isAppliedCoupon={isAppliedCoupon}
            updateSelectedCoupon={updateSelectedCoupon}
          />
        ))}
        <DefaultButton onClick={handleApplyCoupon}>쿠폰 적용</DefaultButton>
      </div>
    </DefaultModal>
  );
}
