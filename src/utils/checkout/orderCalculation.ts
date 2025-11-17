import { IAMPORT_MIN_PAYMENT_PRICE } from "@/constants/payment";
import { GeneralOrderItem } from "@/types";

interface OrderCalculationProps {
  originalPrice: number;
  discountDefault?: number; // 구독 결제(플랜 할인), 일반 결제(관리자에서 적용한 상품 할인)
  discountGrade?: number; // 등급 할인 금액 - 구독
  discountCoupon?: number; // raw 쿠폰 할인 금액 (overDiscount 계산용)
  appliedCouponDiscount?: number; // 실제 적용된 쿠폰 할인 금액(초과 할인을 고려한 금액)
  userTotalReward: number; // 보유 적립금
  appliedReward: number; // 적용한 적립금
  freeCondition?: number; // 배송비 무료 적용되는 최소 금액
  deliveryPrice?: number; // 배송비
  orderItemDtoList?: GeneralOrderItem[];
  isBundleDelivery: boolean;
}

export const orderCalculation = ({
  originalPrice,
  discountDefault = 0,
  discountGrade = 0,
  discountCoupon = 0,
  appliedCouponDiscount = 0,
  userTotalReward,
  appliedReward,
  freeCondition,
  deliveryPrice,
  orderItemDtoList,
  isBundleDelivery,
}: OrderCalculationProps) => {
  // 배송비 할인 금액
  const calculateDeliveryDiscount = (): number => {
    const isFreeDelivery =
      isBundleDelivery ||
      (freeCondition && originalPrice >= freeCondition) ||
      !(orderItemDtoList?.some((item) => !item.deliveryFree) ?? false);

    return isFreeDelivery ? deliveryPrice ?? 0 : 0;
  };

  // 최종 배송비 계산
  const calculateDeliveryFee = (): number => {
    return (deliveryPrice ?? 0) - calculateDeliveryDiscount();
  };

  // 총 할인 금액 - 화면에 보여지는 총 할인 금액(UI용)
  const calculateTotalDiscount = () => {
    return (
      appliedReward + appliedCouponDiscount + discountGrade + discountDefault
    );
  };

  // 최종 결제 금액
  const calculateFinalPaymentAmount = () => {
    const totalDiscount = calculateTotalDiscount();
    const deliveryFee = calculateDeliveryFee();
    return Math.max(
      originalPrice + deliveryFee - totalDiscount,
      IAMPORT_MIN_PAYMENT_PRICE
    );
  };

  // 적용 가능한 최대 적립금 - 모두사용
  const calculateMaxAvailableReward = () => {
    const deliveryFee = calculateDeliveryFee();
    // 배송비가 있으면 최소 결제 금액 제한 없음,
    const minPaymentThreshold = deliveryFee > 0 ? 0 : IAMPORT_MIN_PAYMENT_PRICE;
    const availableMaxReward =
      originalPrice -
      discountDefault -
      appliedCouponDiscount -
      discountGrade -
      minPaymentThreshold;

    return Math.min(availableMaxReward, userTotalReward);
  };

  // 적용 가능한 쿠폰 할인금
  const calculateMaxAvailableCoupon = () => {
    const deliveryFee = calculateDeliveryFee();

    // 배송비가 있으면 최소 결제 금액 제한 없음, 없으면 제한 적용
    const minPaymentThreshold = deliveryFee > 0 ? 0 : IAMPORT_MIN_PAYMENT_PRICE;
    const availableMaxCouponDiscount =
      originalPrice -
      appliedReward -
      discountGrade -
      discountDefault -
      minPaymentThreshold;

    return Math.max(availableMaxCouponDiscount, 0);
  };

  // 초과 할인 금액 계산
  const calculateOverDiscount = () => {
    const deliveryFee = calculateDeliveryFee();
    // 배송비가 있으면 최소 결제 금액 제한 없음, 없으면 제한 적용
    const minPaymentThreshold = deliveryFee > 0 ? 0 : IAMPORT_MIN_PAYMENT_PRICE;

    // 사용자가 요청한 전체 할인 금액
    const rawDiscount =
      appliedReward + discountGrade + discountDefault + discountCoupon;

    // 최대 적용 가능한 할인 금액 (최소 결제 금액 고려)
    const maxAllowedDiscount = originalPrice - minPaymentThreshold;

    // 초과 할인 금액 = raw 할인 - 최대 허용 할인
    const overDiscount = rawDiscount - maxAllowedDiscount;

    return Math.max(overDiscount, 0);
  };

  return {
    deliveryFee: calculateDeliveryFee(),
    deliveryDiscount: calculateDeliveryDiscount(),
    finalPaymentAmount: calculateFinalPaymentAmount(),
    totalDiscount: calculateTotalDiscount(),
    maxAvailableReward: calculateMaxAvailableReward(),
    maxAvailableCoupon: calculateMaxAvailableCoupon(),
    overDiscount: calculateOverDiscount(),
  };
};
