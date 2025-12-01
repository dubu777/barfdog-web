import { commonWrapper } from "@/styles/common.css";
import { couponModalWrapper } from "./CouponModal.css";
import { Coupon, OrderType } from "@/types";
import { useToggleOption } from "@/hooks/useToggleOption";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useCouponStore } from "@/store/checkout/useCouponStore";
import {
  calculateCouponDiscount,
  sortCoupons,
  validateCouponCode,
} from "@/utils/coupon/couponUtils";
import { formatNumberWithCommas } from "@/utils";
import CouponCard from "../couponCard/CouponCard";

import useModal from "@/hooks/useModal";
import AlertModal from "@/components/ui/modal/alertModal/AlertModal";
import ButtonDocked from "@/components/ui/buttonDocked/ButtonDocked";
import FullModalWrapper from "@/components/ui/fullModalWrapper/FullModalWrapper";
import EmptyState from "@/components/pages/mypage/common/emptyState/EmptyState";
import Divider from "../../../ui/divider/Divider";
import CouponCategoryTabs from "../couponCategoryTabs/CouponCategoryTabs";
import CreateCoupon from "../createCoupon/CreateCoupon";
import { useCreateCoupon } from "@/api/coupon/mutations/useCreateCoupon";
import { CouponCategory } from "@/types";
import { useApiResponseHandler } from "@/hooks/useApiResponseHandler";

interface CouponModalProps {
  orderType: OrderType;
  coupons: Coupon[];
  isOpen: boolean;
  originalPrice: number;
  onClose: () => void;
  couponCategory: CouponCategory;
  setCouponCategory: (couponCategory: CouponCategory) => void;
  onAfterApply?: (body: { couponId: number; discountAmount: number }) => void;
}

export default function CouponModal({
  orderType,
  coupons,
  isOpen,
  originalPrice,
  onClose,
  couponCategory,
  setCouponCategory,
  onAfterApply,
}: CouponModalProps) {
  // 상태 관리 -------->
  const [discountOnCoupon, setDiscountOnCoupon] = useState<number>(0);
  const [discountOnCouponAndGlobal, setDiscountOnCouponAndGlobal] =
    useState<number>(0);
  const [code, setCode] = useState("");
  const [codeError, setCodeError] = useState<string | null>(null);

  const {
    selectedCoupon,
    setSelectedCoupon,
    appliedCoupon,
    setAppliedCoupon,
    cancelAppliedCoupon,
    maxAvailableCouponDiscount,
  } = useCouponStore();

  // 서버 호출 -------->
  const { mutate: createCouponMutate } = useCreateCoupon();
  const { handleSuccess, handleError } = useApiResponseHandler();

  // 커스텀 훅 & 유틸------->
  const {
    onClose: onErrorModalClose,
    onToggle: onErrorModalToggle,
    isOpen: isErrorModalOpen,
  } = useModal();

  // 모든 쿠폰의 할인 금액 사전 계산
  const couponDiscountMap = useMemo(() => {
    return new Map(
      coupons.map((coupon) => [
        coupon.id,
        calculateCouponDiscount(
          originalPrice,
          coupon,
          maxAvailableCouponDiscount
        ),
      ])
    );
  }, [coupons, originalPrice, maxAvailableCouponDiscount]);

  // 토글 관리 훅 (couponId를 기준으로)
  const { onToggle, isSelected } = useToggleOption<number>(
    selectedCoupon ? selectedCoupon.couponId : null,
    "selectionBox",
    (newCouponId: number | null) => {
      if (newCouponId === null) {
        setSelectedCoupon(null);
      } else {
        // 사전 계산된 Map에서 할인 금액 가져오기 (성능 개선)
        const discount = couponDiscountMap.get(newCouponId);
        if (discount) {
          const { discountBasedOnCoupon, discountBasedOnCouponAndGlobal } =
            discount;
          setDiscountOnCoupon(discountBasedOnCoupon);
          setDiscountOnCouponAndGlobal(discountBasedOnCouponAndGlobal);
          setSelectedCoupon({
            couponId: newCouponId,
            discountAmount: discountBasedOnCoupon,
            appliedDiscountAmount: discountBasedOnCouponAndGlobal,
          });
        }
      }
    }
  );

  // 쿠폰 정렬 유틸 함수
  const sortedCoupons = sortCoupons(coupons, originalPrice, orderType);

  // 쿠폰 등록
  const handleRegisterCoupon = useCallback(() => {
    const err = validateCouponCode(code.trim());
    setCodeError(err);
    if (err) return;

    createCouponMutate(
      { code: code.trim(), couponCategory: couponCategory },
      {
        onSuccess: () => {
          handleSuccess("쿠폰이 등록되었습니다", "above-button");
          setCode("");
          setCodeError(null);
        },
        onError: () => {
          handleError("등록되지 않은 코드입니다", "above-button");
        },
      }
    );
  }, [code, couponCategory, createCouponMutate, handleSuccess, handleError]);

  const handleModalClose = () => {
    setSelectedCoupon(null);
    setCode("");
    setCodeError(null);
    onClose();
  };

  // alert modal 확인 시
  const handleConfirmCoupon = () => {
    onErrorModalClose();
    onClose();
  };

  // alert modal 취소 시
  const handleCancelCoupon = () => {
    setAppliedCoupon(null);
    onErrorModalClose();
  };

  // 쿠폰 적용 함수
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
    if (onAfterApply) {
      onAfterApply(selectedCoupon);
      return;
    }
    onClose();
  };

  useEffect(() => {
    if (appliedCoupon) {
      setSelectedCoupon({
        couponId: appliedCoupon.couponId,
        discountAmount: appliedCoupon.discountAmount,
        appliedDiscountAmount: appliedCoupon.appliedDiscountAmount,
      });
    }
  }, [appliedCoupon, isOpen, setSelectedCoupon]);

  return (
    <>
      <FullModalWrapper
        isVisible={isOpen}
        headerTitle="쿠폰"
        handleClose={handleModalClose}
        className={commonWrapper({
          maxWidth: 600,
          width: "full",
          height: "full",
          backgroundColors: "gray0",
        })}
      >
        <div className={couponModalWrapper}>
          <CouponCategoryTabs
            onChangeCouponCategory={(couponCategory) => {
              setCode("");
              setCodeError(null);
              setCouponCategory(couponCategory);
            }}
          />
          <Divider thickness={2} color="gray50" />
          <CreateCoupon
            couponCodeError={codeError}
            setCouponCodeError={setCodeError}
            onSubmit={handleRegisterCoupon}
            couponCategory={couponCategory}
            couponCode={code}
            setCouponCode={setCode}
            buttonColor="gray800"
          />

          <div
            className={commonWrapper({
              direction: "col",
              gap: 10,
              padding: 20,
              backgroundColors: "gray50",
            })}
          >
            {sortedCoupons.length > 0 ? (
              sortedCoupons.map((coupon) => {
                const discountInfo = couponDiscountMap.get(coupon.id);
                if (!discountInfo) return null;
                return (
                  <>
                    <CouponCard
                      key={coupon.id}
                      orderType={orderType}
                      coupon={coupon}
                      originalPrice={originalPrice}
                      discountBasedOnCoupon={discountInfo.discountBasedOnCoupon}
                      onToggle={onToggle}
                      isSelected={isSelected(coupon.id)}
                    />
                    <CouponCard
                      key={coupon.id}
                      orderType={orderType}
                      coupon={coupon}
                      originalPrice={originalPrice}
                      discountBasedOnCoupon={discountInfo.discountBasedOnCoupon}
                      onToggle={onToggle}
                      isSelected={isSelected(coupon.id)}
                    />
                    <CouponCard
                      key={coupon.id}
                      orderType={orderType}
                      coupon={coupon}
                      originalPrice={originalPrice}
                      discountBasedOnCoupon={discountInfo.discountBasedOnCoupon}
                      onToggle={onToggle}
                      isSelected={isSelected(coupon.id)}
                    />
                    <CouponCard
                      key={coupon.id}
                      orderType={orderType}
                      coupon={coupon}
                      originalPrice={originalPrice}
                      discountBasedOnCoupon={discountInfo.discountBasedOnCoupon}
                      onToggle={onToggle}
                      isSelected={isSelected(coupon.id)}
                    />
                    <CouponCard
                      key={coupon.id}
                      orderType={orderType}
                      coupon={coupon}
                      originalPrice={originalPrice}
                      discountBasedOnCoupon={discountInfo.discountBasedOnCoupon}
                      onToggle={onToggle}
                      isSelected={isSelected(coupon.id)}
                    />
                  </>
                );
              })
            ) : (
              <EmptyState
                title="사용 가능 쿠폰 내역이 없어요"
                subTitle="쿠폰 번호를 등록해주세요"
              />
            )}
          </div>
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
        </div>
      </FullModalWrapper>
      {isErrorModalOpen && (
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
      )}
    </>
  );
}
