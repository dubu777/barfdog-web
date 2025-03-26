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
import {
  couponDefaultValues,
  couponSchema,
} from "@/utils/validation/couponValidation";
import CouponCard from "./couponCard/CouponCard";
import { useToastStore } from "@/store/useToastStore";
import useModal from "@/hooks/useModal";
import Modal from "@/components/common/modal/Modal";
import { number } from "yup";

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
  const [discountCouponAmount, setDiscountCouponAmount] = useState<number>(0);
  const { addToast } = useToastStore();
  const {
    selectedCoupon,
    setSelectedCoupon,
    appliedCoupon,
    setAppliedCoupon,
    cancelAppliedCoupon,
  } = useCouponStore();
  console.log("appliedCoupon", appliedCoupon);
  console.log("selectedCoupon", selectedCoupon);

  const maxAvailableDiscount = useDiscountStore(
    (state) => state.maxAvailableDiscount
  );
  console.log("maxAvailableDiscount", maxAvailableDiscount);

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
            calculateCouponDiscount(orderPrice, coupon, maxAvailableDiscount);
          setDiscountCouponAmount(discountBasedOnCoupon);
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
    maxAvailableDiscount
  );

  // 쿠폰 코드 제출 함수
  const onCouponFormSubmit = handleSubmit((data) => {
    createCouponMutate(data.code, {
      onSuccess: (res) => {
        addToast("쿠폰이 등록되었습니다", "above-button");
        console.log("등록 성공", res);
      },
      onError: (err) => {
        addToast("등록되지 않은 코드입니다", "above-button");
        console.log("등록 실패", err);
      },
    });
    console.log("서버에 요청");
    setValue("code", "");
  });

  const handleModalClose = () => {
    setValue("code", "");
    setSelectedCoupon(null);
    onClose();
  };

  // console.log('>>>>>>>>>', selectedCoupon);

  const handleApplyCoupon = () => {
    if (!selectedCoupon) {
      if (appliedCoupon) {
        cancelAppliedCoupon();
      }
      onClose();
      return;
    }
    // 적용가능 금액이 0원이면 에러 모달 노출
    if (selectedCoupon.discountAmount === 0) {
      onErrorModalToggle();
      return;
    }
    // 선택된 쿠폰이 있을 경우 적용
    setAppliedCoupon(selectedCoupon);
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
      <Modal
        title="쿠폰 사용이 불가능해요"
        content="최소결제금액에 도달하여, 할인 쿠폰을 적용할 수 없습니다."
        confirmText="확인"
        isOpen={isErrorModalOpen}
        onClose={onErrorModalClose}
      />
      <FooterButton
        isDisabled={false}
        onClick={(e) => {
          e.stopPropagation();
          handleApplyCoupon();
        }}
      >
        {selectedCoupon
          ? `${formatNumberWithCommas(discountCouponAmount)}원 사용하기`
          : "사용 취소하기"}
      </FooterButton>
    </ModalBackground>
  );
}
