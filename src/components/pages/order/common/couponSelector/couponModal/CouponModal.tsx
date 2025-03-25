import ModalBackground from "@/components/common/modalBackground/ModalBackground";
import * as styles from "./CouponModal.css";
import NewHeader from "@/components/layout/newHeader/NewHeader";
import DefaultText from "@/components/common/defaultText/DefaultText";
import InputField from "@/components/common/inputField/InputField";
import Button from "@/components/common/button/Button";
import { ORDER_MESSAGE } from "@/constants";
import { Coupon, OrderType } from "@/types";
import { useToggleOption } from "@/hooks/useToggleOption";
import { useEffect, useState } from "react";
import FooterButton from "@/components/common/footerButton/FooterButton";
import { useCouponStore } from "@/store/order/useCouponStore";
import {
  calculateCouponDiscount,
  sortCoupons,
} from "@/utils/coupon/couponUtils";
import { useDiscountStore } from "@/store/order/useDiscountStore";
import { formatNumberWithCommas } from "@/utils";
import { useFormHandler } from "@/hooks/useFormHandler";
import { useApplyCoupon } from "@/api/mypage/mutations/useApplyCoupon";
import { Controller } from "react-hook-form";
import { useSnackBarStore } from "@/store/useSnackBar";
import { useRouter } from "next/navigation";
import {
  couponDefaultValues,
  couponSchema,
} from "@/utils/validation/couponValidation";
import CouponCard from "./couponCard/CouponCard";
import { useToastStore } from "@/store/useToastStore";

interface CouponModalProps {
  orderType: OrderType;
  coupons: Coupon[];
  isOpen: boolean;
  orderPrice: number;
  onClose: () => void;
}

interface SelectedCoupon {
  couponId: number;
  discountAmount: number;
}

export default function CouponModal({
  orderType,
  coupons,
  isOpen,
  orderPrice,
  onClose,
}: CouponModalProps) {
  const router = useRouter();
  // 상태 관리 -------->
  const { addSnackBar } = useSnackBarStore();
  const { addToast } = useToastStore();
  const [selectedCoupon, setSelectedCoupon] = useState<SelectedCoupon | null>(
    null
  );
  const { appliedCoupon, setAppliedCoupon, cancelAppliedCoupon } =
    useCouponStore();
  const maxAvailableDiscount = useDiscountStore(
    (state) => state.maxAvailableDiscount
  );

  // 서버 호출 -------->
  const { mutate: createCouponMutate } = useApplyCoupon();
  // 커스텀 훅 & 유틸------->
  // 쿠폰 등록 input field 관리

  const { control, handleSubmit, setValue } = useFormHandler(
    couponSchema,
    couponDefaultValues,
    "onBlur"
  );

  // 토글 관리 훅 (couponId를 기준으로)
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
            orderPrice,
            coupon,
            maxAvailableDiscount
          );
          setSelectedCoupon({ couponId: newCouponId, discountAmount });
        }
      }
    }
  );

  // 쿠폰 정렬 유틸 함수
  const sortedCoupons = sortCoupons(
    coupons,
    orderPrice,
    orderType,
    maxAvailableDiscount
  );

  // 쿠폰 코드 제출 함수
  const onCouponFormSubmit = handleSubmit((data) => {
    createCouponMutate(data.code, {
      onSuccess: (res) => {
        addToast("쿠폰이 등록되었습니다");
        console.log("등록 성공", res);
      },
      onError: (err) => {
        addToast("등록되지 않은 코드입니다");
        console.log("등록 실패", err);
      },
    });
    console.log("서버에 요청");
    setValue("code", "");
  });

  const handleModalClose = () => {
    setValue("code", "");
    onClose();
  };

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

  const handleApplyCoupon = () => {
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
    <ModalBackground isVisible={isOpen} onClose={handleModalClose}>
      <NewHeader
        centerTitle="쿠폰"
        showCloseButton
        onClose={handleModalClose}
      />
      <div
        className={styles.couponModalContainer}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.couponModalWrapper}>
          <div className={styles.couponModalContentWrapper}>
            <DefaultText type="label4">쿠폰 등록</DefaultText>
            <div className={styles.couponApplyWrapper}>
              <Controller
                name="code"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <InputField
                    {...field}
                    placeholder={ORDER_MESSAGE.COUPON_PLACEHOLDER}
                    error={error?.message}
                  />
                )}
              />
              <Button
                type="primary"
                variant="solid"
                size="inputButton"
                buttonColor="gray800"
                onClick={onCouponFormSubmit}
              >
                등록
              </Button>
            </div>
          </div>
          <div className={styles.couponCardWrapper}>
            {sortedCoupons.map((coupon) => (
              <CouponCard
                key={coupon.memberCouponId}
                orderType={orderType}
                coupon={coupon}
                orderPrice={orderPrice}
                onToggle={onToggle}
                isSelected={isSelected(coupon.memberCouponId)}
              />
            ))}
          </div>
        </div>
      </div>
      <FooterButton isDisabled={false} onClick={handleApplyCoupon}>
        {selectedCoupon
          ? `${formatNumberWithCommas(
              selectedCoupon?.discountAmount ?? 0
            )}원 사용하기`
          : "사용 취소하기"}
      </FooterButton>
    </ModalBackground>
  );
}
