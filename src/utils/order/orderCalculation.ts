import { ORDER_TYPE } from "@/constants";
import { IAMPORT_MIN_PAYMENT_PRICE, PACKAGE_INFO } from "@/constants/payment";
import { useOrderStore } from "@/store/useOrderStore";
import { GeneralOrderItem, OrderType } from "@/types";

interface OrderCalculationProps {
  orderType: OrderType;
  userTotalReward: number;
  appliedReward: number;
  orderPrice: number;
  freeCondition?: number;
  deliveryPrice?: number;
  orderItemDtoList?: GeneralOrderItem[];
  plan?: string;
}

export const orderCalculation = ({
  orderType,
  orderPrice, // 원금
  userTotalReward, // 보유 적립금
  appliedReward, // 적용한 적립금
  freeCondition, // 배송비 무료 금액
  deliveryPrice,
  orderItemDtoList,
  plan,
}: OrderCalculationProps) => {
  const {
    isBundleDelivery,
    generalOrderBody,
    subscriptionOrderBody,
    packageMonth,
  } = useOrderStore();

  // 배송비
  const calculateDeliveryFee = (): number => {
    if (orderType === ORDER_TYPE.SUBSCRIPTION) return 0;

    const isFreeDelivery =
      isBundleDelivery ||
      (freeCondition && orderPrice >= freeCondition) ||
      !(orderItemDtoList?.some((item) => !item.deliveryFree) ?? false);

    return isFreeDelivery ? 0 : deliveryPrice ?? 0;
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

  // 패키지 할인 금액
  const calculatePackageDiscount = (): number => {
    if (orderType === ORDER_TYPE.GENERAL || !packageMonth) return 0;

    const packageType = Object.values(PACKAGE_INFO).find(
      (type) => type.value === packageMonth
    );

    if (!packageType || packageType.discount === 0 || !plan) return 0;

    const isFullPlan = ["FULL", "TOPPING_FULL"].includes(plan);
    const isHalfPlan = ["HALF", "TOPPING_HALF"].includes(plan);

    const deliveryCount = isFullPlan
      ? packageType.fullDeliveryCount
      : isHalfPlan
      ? packageType.halfDeliveryCount
      : 1;

    return Math.floor(
      orderPrice * deliveryCount * (packageType.discount / 100)
    );
  };

  // 총 할인 금액
  const calculateTotalDiscount = () => {
    const totalCouponDiscount = calculateTotalCouponDiscount();
    const discountGrade = calculateGradeDiscount();
    const packageDiscount = calculatePackageDiscount();
    return (
      appliedReward + totalCouponDiscount + discountGrade + packageDiscount
    );
  };

  // 최종 결제 금액
  const calculateFinalPaymentAmount = () => {
    const totalDiscount = calculateTotalDiscount();
    const deliveryPrice = calculateDeliveryFee();
    return Math.max(
      orderPrice + deliveryPrice - totalDiscount,
      IAMPORT_MIN_PAYMENT_PRICE
    );
  };

  // 적용 가능한 최대 할인
  const calculateMaxAvailableDiscount = () => {
    const finalPaymentAmount = calculateFinalPaymentAmount();
    const availableMaxDiscount = finalPaymentAmount - IAMPORT_MIN_PAYMENT_PRICE;
    return Math.min(availableMaxDiscount, userTotalReward);
  };

  // 적용 가능한 최대 적립금 - 모두사용
  const calculateMaxAvailableReward = () => {
    const deliveryPrice = calculateDeliveryFee();
    const totalCouponDiscount = calculateTotalCouponDiscount();
    const discountGrade = calculateGradeDiscount();
    const packageDiscount = calculatePackageDiscount();
    const availableMaxReward =
      orderPrice -
      deliveryPrice -
      totalCouponDiscount -
      discountGrade -
      packageDiscount -
      IAMPORT_MIN_PAYMENT_PRICE;
    return Math.min(availableMaxReward, userTotalReward);
  };

  return {
    deliveryFee: calculateDeliveryFee(),
    finalPaymentAmount: calculateFinalPaymentAmount(),
    gradeDiscount: calculateGradeDiscount(),
    maxAvailableDiscount: calculateMaxAvailableDiscount(),
    packageDiscount: calculatePackageDiscount(),
    totalCouponDiscount: calculateTotalCouponDiscount(),
    totalDiscount: calculateTotalDiscount(),
    maxAvailableReward: calculateMaxAvailableReward(),
  };
};
