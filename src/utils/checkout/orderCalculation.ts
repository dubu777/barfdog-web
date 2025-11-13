import { IAMPORT_MIN_PAYMENT_PRICE } from "@/constants/payment";
import { GeneralOrderItem } from "@/types";

interface OrderCalculationProps {
  userTotalReward: number;
  appliedReward: number;
  discountPlan?: number;
  discountItem?: number;
  originalPrice: number;
  freeCondition?: number;
  deliveryPrice?: number;
  discountGrade?: number;
  orderItemDtoList?: GeneralOrderItem[];
  discountCouponAmount?: number;
  isBundleDelivery: boolean;
}

export const orderCalculation = ({
  originalPrice, // 원금
  discountPlan = 0, // 플랜 할인 - 구독
  discountGrade = 0, // 등급 할인 금액 - 구독
  discountItem = 0, // 관리자에서 적용한 상품 할인 - 일반
  userTotalReward, // 보유 적립금
  appliedReward, // 적용한 적립금
  freeCondition, // 배송비 무료 적용되는 최소 금액
  deliveryPrice, // 배송비
  orderItemDtoList,
  discountCouponAmount = 0,
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
      appliedReward +
      discountCouponAmount +
      discountGrade +
      discountPlan +
      discountItem
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
      discountPlan -
      discountCouponAmount -
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
      discountPlan -
      minPaymentThreshold;

    return Math.max(availableMaxCouponDiscount, 0);
  };

  return {
    deliveryFee: calculateDeliveryFee(),
    deliveryDiscount: calculateDeliveryDiscount(),
    finalPaymentAmount: calculateFinalPaymentAmount(),
    totalDiscount: calculateTotalDiscount(),
    maxAvailableReward: calculateMaxAvailableReward(),
    maxAvailableCoupon: calculateMaxAvailableCoupon(),
  };
};
