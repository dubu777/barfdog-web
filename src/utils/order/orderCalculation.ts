import { ORDER_TYPE } from "@/constants";
import { IAMPORT_MIN_PAYMENT_PRICE, PACKAGE_INFO } from "@/constants/payment";
import { useOrderStore } from "@/store/useOrderStore";
import {
  GeneralOrderSheetResponse,
  OrderType,
  SubscriptionOrderSheetResponse,
} from "@/types";

interface CalculateOrderSummaryProps {
  orderType: OrderType;
  generalOrderSheetData?: GeneralOrderSheetResponse;
  subscriptionOrderSheetData?: SubscriptionOrderSheetResponse;
  userTotalReward: number;
  appliedReward: number;
  orderPrice: number;
}

export const orderCalculation = ({
  orderType,
  generalOrderSheetData,
  subscriptionOrderSheetData,
  orderPrice,
  userTotalReward,
  appliedReward,
}: CalculateOrderSummaryProps) => {
  const {
    isBundleDelivery,
    generalOrderBody,
    subscriptionOrderBody,
    packageMonth,
  } = useOrderStore();



  // 배송비
  const calculateDeliveryFee = (): number => {
    if (orderType === ORDER_TYPE.SUBSCRIPTION || !generalOrderSheetData) return 0;

    const isFreeDelivery =
      isBundleDelivery ||
      (generalOrderSheetData?.freeCondition &&
        generalOrderSheetData.orderPrice >=
          generalOrderSheetData.freeCondition) ||
      !(
        generalOrderSheetData?.orderItemDtoList?.some(
          (item) => !item.deliveryFree
        ) ?? false
      );

    return isFreeDelivery ? 0 : generalOrderSheetData?.deliveryPrice ?? 0;
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
      return (subscriptionOrderBody.discountCoupon)
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

    if (
      !packageType ||
      packageType.discount === 0 ||
      !subscriptionOrderSheetData
    )
      return 0;

    const isFullPlan = ["FULL", "TOPPING_FULL"].includes(
      subscriptionOrderSheetData.subscribeDto.plan
    );
    const isHalfPlan = ["HALF", "TOPPING_HALF"].includes(
      subscriptionOrderSheetData.subscribeDto.plan
    );

    const deliveryCount = isFullPlan
      ? packageType.fullDeliveryCount
      : isHalfPlan
      ? packageType.halfDeliveryCount
      : 1;

    return Math.floor(
      subscriptionOrderSheetData.subscribeDto.nextPaymentPrice *
        deliveryCount *
        (packageType.discount / 100)
    );
  };

  // 총 할인 금액
  const calculateTotalDiscount = () => {
    const totalCouponDiscount = calculateTotalCouponDiscount();
    const discountGrade = calculateGradeDiscount();
    const packageDiscount = calculatePackageDiscount();
    return appliedReward + totalCouponDiscount + discountGrade + packageDiscount
  }

  // 최종 결제 금액
  const calculateFinalPaymentAmount = () => {
    const totalDiscount = calculateTotalDiscount()
    const deliveryPrice = calculateDeliveryFee();
    return Math.max(orderPrice + deliveryPrice - totalDiscount, IAMPORT_MIN_PAYMENT_PRICE)
  }

  // 적용 가능한 최대 적립금 - 모두사용
  const calculateMaxRewardAmount = () => {
    const finalPaymentAmount = calculateFinalPaymentAmount();
    const availableMaxDiscount = finalPaymentAmount - IAMPORT_MIN_PAYMENT_PRICE;
    return Math.min(availableMaxDiscount, userTotalReward);
  }

  // const deliveryPrice = calculateDeliveryFee();
  // const discountCoupon = calculateTotalCouponDiscount();
  // const packageDiscount = calculatePackageDiscount();

  // 총 할인 및 결제 금액 계산
  // const discountTotal =
  //   discountReward + discountCoupon + discountGrade + discountSubscriptionMonth;
  // const calculatedPaymentPrice = orderPrice + deliveryPrice - discountTotal;
  // const paymentPrice = Math.max(
  //   calculatedPaymentPrice,
  //   IAMPORT_MIN_PAYMENT_PRICE
  // );
  // const availableMaxDiscount = paymentPrice - IAMPORT_MIN_PAYMENT_PRICE;

  // const availableMaxReward = Math.min(availableMaxDiscount, userTotalReward);

  return {
    // discountReward,
    // discountCoupon,
    // discountGrade,
    // discountSubscriptionMonth,
    // discountTotal,
    // paymentPrice,
    // availableMaxDiscount,
    // deliveryPrice,
    // availableMaxReward,
  };
};
