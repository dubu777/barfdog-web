import ModalBackground from "@/components/common/modalBackground/ModalBackground";
import * as styles from "./NewCouponModal.css";
import NewHeader from "@/components/layout/newHeader/NewHeader";
import DefaultText from "@/components/common/defaultText/DefaultText";
import InputField from "@/components/common/inputField/InputField";
import Button from "@/components/common/button/Button";
import { ORDER_MESSAGE } from "@/constants";
import { Coupon } from "@/types";
import NewCouponCard from "./couponCard/NewCouponCard";
import { useToggleOption } from "@/hooks/useToggleOption";
import { useCouponStore } from "@/store/order/useCouponStore";
import { useDiscountStore } from "@/store/order/useDiscountStore";
import { useOrderStore } from "@/store/order/useOrderStore";
import { useState } from "react";

interface NewCouponModalProps {
  coupons: Coupon[];
  isOpen: boolean;
  onClose: () => void;
}

export default function NewCouponModal({
  coupons,
  isOpen,
  onClose,
}: NewCouponModalProps) {
  const { appliedCoupon, setAppliedCoupon } =
    useCouponStore();
  const [selectedCoupon, setSelectedCoupon] = useState<number | null>(null);
  const { maxAvailableDiscount } = useDiscountStore();
  const { updateAppliedCoupon, isAppliedCoupon } = useOrderStore();
  const [couponDiscount, setCouponDiscount] = useState<number>(0);


  // 쿠폰 적용 함수
  const handleApplyCoupon = () => {
    if (appliedCoupon) {
      // calculateCouponDiscount 호출
      if (couponDiscount > maxAvailableDiscount) {
        alert(
          `적용 가능한 최대 할인 금액(${maxAvailableDiscount}원)을 초과합니다.`
        );
        return;
      }

      updateAppliedCoupon(
        appliedCoupon.couponId,
        appliedCoupon.discountAmount
      );
      onClose();
    }
  };

    const { onToggle, isSelected } = useToggleOption(
      selectedCoupon,
      "radio",
      setSelectedCoupon
    );

  return (
    <ModalBackground isVisible={isOpen} onClose={onClose}>
      <div
        className={styles.couponModalContainer}
        onClick={(e) => e.stopPropagation()}
      >
        <NewHeader centerTitle="쿠폰" showCloseButton />
        <div className={styles.couponModalContentWrapper}>
          <DefaultText type="label4">쿠폰 등록</DefaultText>
          <div className={styles.couponApplyWrapper}>
            <InputField placeholder={ORDER_MESSAGE.COUPON_PLACEHOLDER} />
            <Button type="primary" variant="solid" buttonColor="gray800">
              등록
            </Button>
          </div>
        </div>
        <div className={styles.couponCardWrapper}>
          {coupons.map((coupon) => (
            <NewCouponCard key={coupon.memberCouponId} coupon={coupon} />

          ))}
        </div>
      </div>
    </ModalBackground>
  );
}
