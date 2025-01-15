"use client";

import * as styles from "./CouponModal.css";
import DefaultModal from "@/components/common/defaultModal/DefaultModal";
import { Coupon, OrderType } from "@/types";
import CouponCard from "./couponCard/CouponCard";
import DefaultButton from "@/components/common/defaultButton/DefaultButton";
import { useOrderStore } from "@/store/useOrderStore";
import { ORDER_TYPE } from "@/constants";

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
  const { updateAppliedCoupon, setSelectedCoupon, selectedCoupon, maxAvailableDiscount } =
    useOrderStore();
  

  // 쿠폰 적용 함수
  const handleApplyCoupon = () => {
    if (selectedCoupon) {
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
            />
          ))}
          <DefaultButton onClick={handleApplyCoupon}>쿠폰 적용</DefaultButton>
        </div>
    </DefaultModal>
  );
}
