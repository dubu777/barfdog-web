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
import { useEffect, useState } from "react";
import FooterButton from "@/components/common/footerButton/FooterButton";
import { useCouponStore } from "@/store/order/useCouponStore";
import { calculateCouponDiscount } from "@/utils/coupon/couponUtil";
import { useDiscountStore } from "@/store/order/useDiscountStore";
import { formatNumberWithCommas } from "@/utils";

interface NewCouponModalProps {
  coupons: Coupon[];
  isOpen: boolean;
  onClose: () => void;
}

interface SelectedCoupon {
  couponId: number;
  discountAmount: number;
}

export default function NewCouponModal({
  coupons,
  isOpen,
  onClose,
}: NewCouponModalProps) {
  const [selectedCoupon, setSelectedCoupon] = useState<SelectedCoupon | null>(
    null
  );
  const { appliedCoupon, setAppliedCoupon, cancelAppliedCoupon } =
    useCouponStore();
  const maxAvailableDiscount = useDiscountStore(
    (state) => state.maxAvailableDiscount
  );
  // useToggleOption은 couponId(숫자)를 기준으로 토글 관리
  const { onToggle, isSelected } = useToggleOption<number>(
    selectedCoupon ? selectedCoupon.couponId : null,
    "selectionBox",
    (newCouponId: number | null) => {
      if (newCouponId === null) {
        setSelectedCoupon(null);
      } else {
        const coupon = coupons.find(
          (coupon) => coupon.memberCouponId === newCouponId
        );
        if (coupon) {
          const { discountAmount } = calculateCouponDiscount(
            50000,
            coupon,
            maxAvailableDiscount
          );
          setSelectedCoupon({ couponId: newCouponId, discountAmount });
        }
      }
    }
  );


  useEffect(() => {
    if (appliedCoupon) {
      setSelectedCoupon({
        couponId: appliedCoupon.couponId,
        discountAmount: appliedCoupon.discountAmount,
      });
    } else {
      setSelectedCoupon(null);
    }
  }, [appliedCoupon, isOpen]);

  const handleSubmit = () => {
    if (!selectedCoupon) {
      if (appliedCoupon) {
        cancelAppliedCoupon();
      }
      onClose();
      return;
    }
    // 선택된 쿠폰이 있을 경우 적용
    setAppliedCoupon(selectedCoupon.couponId, selectedCoupon.discountAmount);
    onClose();
  };

  return (
    <ModalBackground isVisible={isOpen} onClose={onClose}>
      <NewHeader centerTitle="쿠폰" showCloseButton onClose={onClose} />
      <div
        className={styles.couponModalContainer}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.couponModalWrapper}>
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
              <NewCouponCard
                key={coupon.memberCouponId}
                coupon={coupon}
                orderPrice={50000} // 임시
                onToggle={onToggle}
                isSelected={isSelected(coupon.memberCouponId)}
              />
            ))}
          </div>
        </div>
      </div>
      <FooterButton isDisabled={false} onClick={handleSubmit}>
        {selectedCoupon
          ? `${formatNumberWithCommas(
              selectedCoupon?.discountAmount ?? 0
            )}원 사용하기`
          : "사용 취소하기"}
      </FooterButton>
    </ModalBackground>
  );
}
