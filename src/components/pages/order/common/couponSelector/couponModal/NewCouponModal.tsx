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
import { useSnackBarStore } from "@/store/useSnackBar";
import { useRouter } from "next/navigation";
import { couponDefaultValues, couponSchema } from "@/utils/validation/couponValidation";


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
  const router = useRouter();
  // 상태 관리 -------->
  const {addSnackBar} = useSnackBarStore();
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
    addSnackBar({
      title: '쿠폰을 등록하시겠습니까?',
      caption: '실행취소를 누르면 되돌릴 수 있습니다.',
      actionLabel: '실행취소',
      onActionClick: () => {
        // 사용자가 4초 내에 "실행취소"를 누르면 -> 삭제 취소
        console.log("등록 취소");
      },
      onAutoHide: () => {
        // 4초 동안 실행취소를 누르지 않으면 -> 진짜 서버호출(삭제) 실행
        console.log('등록 요청');
        createCouponMutate(data.code, {
          onSuccess: (res) => {
            console.log('등록 성공',res);
          },
          onError: (res) => {
        addSnackBar({
          title: '등록실패',
          actionLabel: '이동',
          onActionClick: () => {
            router.push('/');
          },
          // 이동의 경우 onAutoHide가 꼭 필요하지 않을 수 있음
          duration: 4000,
        });
          }
        })
        console.log('서버에 요청');
      },
      duration: 4000, // 기본 4초
    });
    // createCouponMutate(data.code, {
    //   onSuccess: (res) => {
    //     console.log("등록 성공", res);
    //   },
    //   onError: () => {
    //     console.log(">>>>>>>>>>>>>>");
        
    //     addSnackBar({
    //       title: '새로운 플랜이 적용되었습니다.',
    //       caption: '지금 확인해보세요.',
    //       actionLabel: '이동',
    //       onActionClick: () => {
    //         router.push('/');
    //       },
    //       // 이동의 경우 onAutoHide가 꼭 필요하지 않을 수 있음
    //       duration: 4000,
    //     });
    //   },
    // });
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
