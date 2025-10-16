import * as styles from "./CouponModal.css";
import Text from "@/components/common/text/Text";
import InputField from "@/components/common/inputField/InputField";
import Button from "@/components/common/button/Button";
import { ORDER_MESSAGE } from "@/constants";
import { Coupon, OrderType } from "@/types";
import { useToggleOption } from "@/hooks/useToggleOption";
import { useCallback, useEffect, useState } from "react";
import { useCouponStore } from "@/store/checkout/useCouponStore";
import {
  calculateCouponDiscount,
  sortCoupons,
  validateCouponCode,
} from "@/utils/coupon/couponUtils";
import { formatNumberWithCommas } from "@/utils";
import CouponCard from "./couponCard/CouponCard";
import { useToastStore } from "@/store/useToastStore";
import useModal from "@/hooks/useModal";
import AlertModal from "@/components/common/modal/alertModal/AlertModal";
import ButtonDocked from "@/components/common/buttonDocked/ButtonDocked";
import FullModalWrapper from "@/components/common/fullModalWrapper/FullModalWrapper";
import { useCreateCoupon } from "@/api/mypage/coupon/mutations/useCreateCoupon";

interface CouponModalProps {
  orderType: OrderType;
  coupons: Coupon[];
  isOpen: boolean;
  orderPrice: number;
  onClose: () => void;
  onUseCoupon?: (selectedCoupon: {
    couponId: number;
    discountAmount: number;
  }) => void;
}

export default function CouponModal({
  orderType,
  coupons,
  isOpen,
  orderPrice,
  onClose,
  onUseCoupon,
}: CouponModalProps) {
  // 상태 관리 -------->
  // discountBasedOnCoupon 상태값 저장
  const [discountOnCoupon, setDiscountOnCoupon] = useState<number>(0);
  const [discountOnCouponAndGlobal, setDiscountOnCouponAndGlobal] =
    useState<number>(0);
  const [code, setCode] = useState("");
  const [codeError, setCodeError] = useState<string | null>(null);

  const { addToast } = useToastStore();
  const {
    selectedCoupon,
    setSelectedCoupon,
    appliedCoupon,
    setAppliedCoupon,
    cancelAppliedCoupon,
    maxAvailableCouponDiscount,
    setMaxAvailableCouponDiscount,
  } = useCouponStore();

  // 서버 호출 -------->
  const { mutate: createCouponMutate } = useCreateCoupon();

  // 커스텀 훅 & 유틸------->
  const {
    onClose: onErrorModalClose,
    onToggle: onErrorModalToggle,
    isOpen: isErrorModalOpen,
  } = useModal();

  // 토글 관리 훅 (couponId를 기준으로)
  const { onToggle, isSelected } = useToggleOption<number>(
    selectedCoupon ? selectedCoupon.couponId : null,
    "selectionBox",
    (newCouponId: number | null) => {
      if (newCouponId === null) {
        setSelectedCoupon(null);
      } else {
        const coupon = coupons.find((coupon) => coupon.id === newCouponId);
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

  // 쿠폰 등록
  const handleRegisterCoupon = useCallback(() => {
    const err = validateCouponCode(code.trim());
    setCodeError(err);
    if (err) return;

    createCouponMutate(
      { code: code.trim() },
      {
        onSuccess: () => {
          addToast("쿠폰이 등록되었습니다", "above-button");
          setCode("");
          setCodeError(null);
        },
        onError: () => {
          addToast("등록되지 않은 코드입니다", "above-button");
        },
      }
    );
  }, [code, createCouponMutate, addToast]);

  // 마이페이지 쿠폰 적용 함수 및 초기화 (selectedCoupon, maxAvailableCouponDiscount)
  const handleUseCoupon = (discountAmount: number) => {
    if (!onUseCoupon || !selectedCoupon) {
      return;
    }
    onUseCoupon({
      couponId: selectedCoupon.couponId,
      discountAmount,
    });
    setSelectedCoupon(null);
    setMaxAvailableCouponDiscount(0);
  };

  const handleModalClose = () => {
    setSelectedCoupon(null);
    setCode("");
    setCodeError(null);
    onClose();
  };

  // 주문 금액 보다 쿠폰 할인 금액이 더 클 경우: 쿠폰 사용 확인 모달
  const handleConfirmCoupon = () => {
    if (onUseCoupon) {
      // discountOnCouponAndGlobal 적용 (일부 금액)
      handleUseCoupon(discountOnCouponAndGlobal);
      return;
    }
    onErrorModalClose();
    onClose();
  };

  const handleCancelCoupon = () => {
    setAppliedCoupon(null);
    onErrorModalClose();
  };

  // 쿠폰 적용 함수
  const handleApplyCoupon = () => {
    if (onUseCoupon) {
      if (discountOnCoupon > maxAvailableCouponDiscount) {
        // 쿠폰 할인 금액이 orderPrice 보다 클 경우 일부 금액 할인 안내 error modal 적용
        onErrorModalToggle();
      } else {
        // 쿠폰 사용 기준이 적절할 경우 - discountOnCoupon 적용 (쿠폰 고유 금액)
        handleUseCoupon(discountOnCoupon);
      }
      return;
    }

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
  }, [appliedCoupon, isOpen, setSelectedCoupon]);

  return (
    <FullModalWrapper
      isVisible={isOpen}
      headerTitle="쿠폰"
      handleClose={handleModalClose}
      className={styles.couponModalContainer}
    >
      <div className={styles.couponModalWrapper}>
        <div className={styles.couponModalContentWrapper}>
          <Text type="label4">쿠폰 등록</Text>
          <div className={styles.couponApplyWrapper}>
            <InputField
              value={code}
              onChange={(e) => setCode(e.target.value)}
              onBlur={() => setCodeError(validateCouponCode(code))}
              placeholder={ORDER_MESSAGE.COUPON_PLACEHOLDER}
              error={codeError ?? undefined}
              maxLength={20}
            />
            <Button
              variant="solid"
              intent="secondary"
              size="inputButton"
              onClick={handleRegisterCoupon}
            >
              등록
            </Button>
          </div>
        </div>
        <div className={styles.couponCardWrapper}>
          {sortedCoupons.map((coupon) => (
            <CouponCard
              key={coupon.id}
              orderType={orderType}
              coupon={coupon}
              orderPrice={orderPrice}
              onToggle={onToggle}
              isSelected={isSelected(coupon.id)}
              maxAvailableCouponDiscount={maxAvailableCouponDiscount}
            />
          ))}
        </div>
      </div>
      <AlertModal
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
      <ButtonDocked
        type="full-button"
        primaryButtonLabel={
          selectedCoupon
            ? `${formatNumberWithCommas(discountOnCoupon)}원 사용하기`
            : "사용 취소하기"
        }
        onPrimaryClick={handleApplyCoupon}
        primaryButtonSize="lg"
      />
    </FullModalWrapper>
  );
}
