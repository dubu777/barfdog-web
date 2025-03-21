import ModalBackground from "@/components/common/modalBackground/ModalBackground";
import * as styles from "./NewCouponModal.css";
import NewHeader from "@/components/layout/newHeader/NewHeader";
import DefaultText from "@/components/common/defaultText/DefaultText";
import InputField from "@/components/common/inputField/InputField";
import Button from "@/components/common/button/Button";
import { ORDER_MESSAGE } from "@/constants";
import { Coupon, OrderType } from "@/types";
import NewCouponCard from "./couponCard/NewCouponCard";
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
import * as yup from "yup";
import { Controller } from "react-hook-form";

const couponSchema = yup.object().shape({
  code: yup
    .string()
    .max(20, "20자 이하 입력 가능합니다.")
    .matches(/^[A-Za-z0-9]+$/, "특수문자는 입력할 수 없습니다.")
    .required("쿠폰 코드를 입력해주세요."),
});

const couponDefaultValues = {
  code: "",
};

interface NewCouponModalProps {
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

export default function NewCouponModal({
  orderType,
  coupons,
  isOpen,
  orderPrice,
  onClose,
}: NewCouponModalProps) {
  // 상태 관리 -------->
  const [selectedCoupon, setSelectedCoupon] = useState<SelectedCoupon | null>(
    null
  );
  const { appliedCoupon, setAppliedCoupon, cancelAppliedCoupon } =
    useCouponStore();
  const maxAvailableDiscount = useDiscountStore(
    (state) => state.maxAvailableDiscount
  );
  // <--------- 상태관리
  // 서버 호출 react query -------->
  const { mutate: createCouponMutate } = useApplyCoupon();

  // 커스텀 훅 ------->
  const { control, handleSubmit, setValue } = useFormHandler(
    couponSchema,
    couponDefaultValues,
    "onBlur"
  );

  const sortedCoupons = sortCoupons(
    coupons,
    orderPrice,
    orderType,
    maxAvailableDiscount
  );

  const onCouponFormSubmit = handleSubmit((data) => {
    createCouponMutate(data.code);
    setValue("code", "");
  });

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
            orderPrice,
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
                buttonColor="gray800"
                onClick={onCouponFormSubmit}
              >
                등록
              </Button>
            </div>
          </div>
          <div className={styles.couponCardWrapper}>
            {sortedCoupons.map((coupon) => (
              <NewCouponCard
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
