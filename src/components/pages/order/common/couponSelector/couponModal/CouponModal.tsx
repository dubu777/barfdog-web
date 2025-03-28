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
import { formatNumberWithCommas } from "@/utils";
import { useFormHandler } from "@/hooks/useFormHandler";
import { useApplyCoupon } from "@/api/mypage/mutations/useApplyCoupon";
import { Controller } from "react-hook-form";
import {
  couponDefaultValues,
  couponSchema,
} from "@/utils/validation/couponValidation";
import CouponCard from "./couponCard/CouponCard";
import { useToastStore } from "@/store/useToastStore";
import useModal from "@/hooks/useModal";
import Modal from "@/components/common/modal/Modal";
import { AnimatePresence, motion } from "framer-motion";

interface CouponModalProps {
  orderType: OrderType;
  coupons: Coupon[];
  isOpen: boolean;
  orderPrice: number;
  onClose: () => void;
}

export default function CouponModal({
  orderType,
  coupons,
  isOpen,
  orderPrice,
  onClose,
}: CouponModalProps) {
  // 상태 관리 -------->
  // discountBasedOnCoupon 상태값 저장
  const [discountOnCoupon, setDiscountOnCoupon] = useState<number>(0);
  const [discountOnCouponAndGlobal, setDiscountOnCouponAndGlobal] =
    useState<number>(0);
  const { addToast } = useToastStore();
  const {
    selectedCoupon,
    setSelectedCoupon,
    appliedCoupon,
    setAppliedCoupon,
    cancelAppliedCoupon,
    maxAvailableCouponDiscount,
  } = useCouponStore();
  console.log("discountOnCoupon", discountOnCoupon);
  console.log("appliedCoupon", appliedCoupon);

  // 서버 호출 -------->
  const { mutate: createCouponMutate } = useApplyCoupon();

  // 커스텀 훅 & 유틸------->
  const {
    onClose: onErrorModalClose,
    onToggle: onErrorModalToggle,
    isOpen: isErrorModalOpen,
  } = useModal();
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
          const { discountBasedOnCoupon, discountBasedOnCouponAndGlobal } =
            calculateCouponDiscount(
              orderPrice,
              coupon,
              maxAvailableCouponDiscount
            );
          setDiscountOnCoupon(discountBasedOnCoupon);
          setDiscountOnCouponAndGlobal(discountBasedOnCouponAndGlobal);
          setSelectedCoupon({
            couponId: newCouponId,
            discountAmount: discountBasedOnCouponAndGlobal,
          });
        }
      }
    }
  );

  // 쿠폰 정렬 유틸 함수
  const sortedCoupons = sortCoupons(
    coupons,
    orderPrice,
    orderType,
    maxAvailableCouponDiscount
  );

  // 쿠폰 등록 함수
  const onCouponFormSubmit = handleSubmit((data) => {
    createCouponMutate(data.code, {
      onSuccess: () => {
        addToast("쿠폰이 등록되었습니다", "above-button");
      },
      onError: () => {
        addToast("등록되지 않은 코드입니다", "above-button");
      },
    });
    setValue("code", "");
  });

  const handleModalClose = () => {
    setValue("code", "");
    setSelectedCoupon(null);
    onClose();
  };

  const handleConfirmCoupon = () => {
    onErrorModalClose();
    onClose();
  };

  const handleCancelCoupon = () => {
    setAppliedCoupon(null);
    onErrorModalClose();
  };

  const handleApplyCoupon = () => {
    if (!selectedCoupon) {
      if (appliedCoupon) {
        cancelAppliedCoupon();
      }
      onClose();
      return;
    }
    setAppliedCoupon(selectedCoupon);
    if (discountOnCoupon > discountOnCouponAndGlobal) {
      onErrorModalToggle();
      return;
    }
    onClose();
  };

  useEffect(() => {
    if (appliedCoupon) {
      setSelectedCoupon({
        couponId: appliedCoupon.couponId,
        discountAmount: appliedCoupon.discountAmount,
      });
    }
  }, [appliedCoupon, isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <ModalBackground isVisible={isOpen} onClose={handleModalClose} closeOnBackgroundClick={false} isDimmed={false}>
          <motion.div
            className={styles.couponModalContainer}
            onClick={(e) => e.stopPropagation()}
            initial={{ y: "100%" }}
            animate={{ y: "0%" }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            <NewHeader
              centerTitle="쿠폰"
              showCloseButton
              onClose={handleModalClose}
            />
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
                    maxAvailableCouponDiscount={maxAvailableCouponDiscount}
                  />
                ))}
              </div>
            </div>
            <Modal
              title={`쿠폰 사용 시 ${formatNumberWithCommas(
                discountOnCouponAndGlobal
              )}원이 할인돼요`}
              content="쿠폰의 일부 금액만 할인이 적용됩니다. 사용하시겠어요?"
              confirmText="사용"
              cancelText="취소"
              isOpen={isErrorModalOpen}
              onClose={onErrorModalClose}
              onConfirm={handleConfirmCoupon}
              onCancel={handleCancelCoupon}
            />
            <FooterButton
              isDisabled={false}
              onClick={(e) => {
                e.stopPropagation();
                handleApplyCoupon();
              }}
            >
              {selectedCoupon
                ? `${formatNumberWithCommas(discountOnCoupon)}원 사용하기`
                : "사용 취소하기"}
            </FooterButton>
          </motion.div>
        </ModalBackground>
      )}
    </AnimatePresence>
  );
}
