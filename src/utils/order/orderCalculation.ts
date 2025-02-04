import { total } from "@/components/pages/mypage/reward/Reward.css";
import { ORDER_TYPE } from "@/constants";
import { IAMPORT_MIN_PAYMENT_PRICE } from "@/constants/payment";
import { useDeliveryStore } from "@/store/order/useDeliveryStore";
import { useOrderStore } from "@/store/order/useOrderStore";
import { SaveGeneralOrderRequest, SaveSubscriptionOrderRequest, GeneralOrderItem, OrderType } from "@/types";

interface OrderCalculationProps {
  orderType: OrderType;
  generalOrderBody: SaveGeneralOrderRequest;
  subscriptionOrderBody: SaveSubscriptionOrderRequest;
  userTotalReward: number;
  appliedReward: number;
  orderPrice: number;
  freeCondition?: number;
  deliveryPrice?: number;
  orderItemDtoList?: GeneralOrderItem[];
  plan?: string;
  isBundleDelivery: boolean;
}

export const orderCalculation = ({
  orderType,
  generalOrderBody,
  subscriptionOrderBody,
  orderPrice, // 원금
  userTotalReward, // 보유 적립금
  appliedReward, // 적용한 적립금
  freeCondition, // 배송비 무료 금액
  deliveryPrice,
  orderItemDtoList,
  plan,
  isBundleDelivery,
}: OrderCalculationProps) => {

  // 배송비 할인 금액
  const calculateDeliveryDiscount = (): number => {
    const isFreeDelivery =
      isBundleDelivery ||
      (freeCondition && orderPrice >= freeCondition) ||
      !(orderItemDtoList?.some((item) => !item.deliveryFree) ?? false);

    return isFreeDelivery ? deliveryPrice ?? 0 : 0;
  };

  // 최종 배송비 계산
  const calculateDeliveryFee = (): number => {
    return (deliveryPrice ?? 0) - calculateDeliveryDiscount();
  };

  // 총 쿠폰 할인 금액
  const calculateTotalCouponDiscount = (): number => {
    if (orderType === ORDER_TYPE.GENERAL) {
      return (
        generalOrderBody?.orderItemDtoList?.reduce(
          (acc, item) => acc + (item.discountAmount || 0),
          0
        ) ?? 0
      );
    } else {
      return subscriptionOrderBody.discountCoupon;
    }
  };

  // 등급 할인 금액
  const calculateGradeDiscount = (): number => {
    return orderType === ORDER_TYPE.SUBSCRIPTION
      ? subscriptionOrderBody?.discountGrade ?? 0
      : 0;
  };

  const calculatePlanDiscount = (): number => {
    if (plan === "FULL") {
      return Math.round(orderPrice * 0.05); // FULL 플랜 5% 할인
    } else if (plan === "HALF") {
      return Math.round(orderPrice * 0.03); // HALF 플랜 3% 할인
    }
    return 0; // 플랜이 없거나 다른 값일 경우 할인 없음
  };

  // 총 할인 금액 - 화면에 보여지는 총 할인 금액
  const calculateTotalDiscount = () => {
    const totalCouponDiscount = calculateTotalCouponDiscount();
    const discountGrade = calculateGradeDiscount();
    const planDiscount = calculatePlanDiscount();
    return (
      appliedReward + totalCouponDiscount + discountGrade + planDiscount
    );
  };

// 플랜 할인 제외한 총 할인 금액 - 서버에 보내는 총 할인 금액
const calculateTotalDiscountWithoutPlan = (): number => {
  const totalCouponDiscount = calculateTotalCouponDiscount();
  const discountGrade = calculateGradeDiscount();

  return appliedReward + totalCouponDiscount + discountGrade;
};

  // 최종 결제 금액
  const calculateFinalPaymentAmount = () => {
    const totalDiscount = calculateTotalDiscount();
    const deliveryFee = calculateDeliveryFee();
    return Math.max(
      orderPrice + deliveryFee - totalDiscount,
      IAMPORT_MIN_PAYMENT_PRICE
    );
  };

// 적용 가능한 최대 할인
const calculateMaxAvailableDiscount = () => {
  const finalPaymentAmount = calculateFinalPaymentAmount();
  const deliveryFee = calculateDeliveryFee();

  // 배송비가 있으면 최소 결제 금액 제한 없음, 없으면 제한 적용
  const minPaymentThreshold = deliveryFee > 0 ? 0 : IAMPORT_MIN_PAYMENT_PRICE;
  const availableMaxDiscount = finalPaymentAmount - minPaymentThreshold;

  return Math.max(availableMaxDiscount, 0);
};

// 적용 가능한 최대 적립금 - 모두사용
const calculateMaxAvailableReward = () => {
  const totalCouponDiscount = calculateTotalCouponDiscount();
  const discountGrade = calculateGradeDiscount();
  const planDiscount = calculatePlanDiscount();
  const deliveryFee = calculateDeliveryFee();

  // 배송비가 있으면 최소 결제 금액 제한 없음, 없으면 제한 적용
  const minPaymentThreshold = deliveryFee > 0 ? 0 : IAMPORT_MIN_PAYMENT_PRICE;
  const availableMaxReward =
    orderPrice - totalCouponDiscount - discountGrade - planDiscount - minPaymentThreshold;

  return Math.min(availableMaxReward, userTotalReward);
};



  return {
    deliveryFee: calculateDeliveryFee(),
    deliveryDiscount: calculateDeliveryDiscount(),
    finalPaymentAmount: calculateFinalPaymentAmount(),
    gradeDiscount: calculateGradeDiscount(),
    planDiscount: calculatePlanDiscount(),
    maxAvailableDiscount: calculateMaxAvailableDiscount(),
    totalCouponDiscount: calculateTotalCouponDiscount(),
    totalDiscount: calculateTotalDiscount(),
    totalDiscountWithoutPlan: calculateTotalDiscountWithoutPlan(),
    maxAvailableReward: calculateMaxAvailableReward(),
  };
};