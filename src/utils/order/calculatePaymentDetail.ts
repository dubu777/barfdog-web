import { ORDER_TYPE } from "@/constants";
import { IAMPORT_MIN_PAYMENT_PRICE, PACKAGE_INFO } from "@/constants/payment";
import { useOrderStore } from "@/store/useOrderStore";
import { GeneralOrderSheetResponse, OrderType, SubscriptionOrderSheetResponse } from "@/types";


export const calcOrderSheetPrices = (
  orderType: OrderType,
  generalOrderSheetData?: GeneralOrderSheetResponse,
  subscriptionOrderSheetData?: SubscriptionOrderSheetResponse
) => {
  const {
    isBundleDelivery,
    generalOrderBody,
    subscriptionOrderBody,
    packageMonth,
  } = useOrderStore();

  // 배송비 계산
  const calculateDeliveryPrice = (): number => {
    if (orderType === ORDER_TYPE.SUBSCRIPTION) return 0;

    const isFreeDelivery =
      isBundleDelivery ||
      (generalOrderSheetData?.freeCondition &&
        generalOrderSheetData.orderPrice >= generalOrderSheetData.freeCondition) ||
      !(generalOrderSheetData?.orderItemDtoList?.some((item) => !item.deliveryFree) ?? false);

    return isFreeDelivery ? 0 : generalOrderSheetData?.deliveryPrice ?? 0;
  };

  // 쿠폰 할인 계산
  const calculateDiscountCoupon = (): number => {
    return generalOrderBody?.orderItemDtoList?.reduce(
      (acc, item) => acc + (item.discountAmount || 0),
      0
    ) ?? 0;
  };

  // 등급 할인 계산
  const calculateDiscountGrade = (): number => {
    return orderType === ORDER_TYPE.SUBSCRIPTION
      ? subscriptionOrderBody?.discountGrade ?? 0
      : 0;
  };

  // 패키지 할인 계산
  const calculatePackageDiscount = (): number => {
    if (orderType === ORDER_TYPE.GENERAL || !packageMonth) return 0;

    const packageType = Object.values(PACKAGE_INFO).find(
      (type) => type.value === packageMonth
    );

    if (!packageType || packageType.discount === 0 || !subscriptionOrderSheetData) return 0;

    const isFullPlan = ["FULL", "TOPPING_FULL"].includes(subscriptionOrderSheetData.subscribeDto.plan);
    const isHalfPlan = ["HALF", "TOPPING_HALF"].includes(subscriptionOrderSheetData.subscribeDto.plan);

    const deliveryCount = isFullPlan
      ? packageType.fullDeliveryCount
      : isHalfPlan
      ? packageType.halfDeliveryCount
      : 1;

    return Math.floor(
      (subscriptionOrderSheetData.subscribeDto.nextPaymentPrice) *
        deliveryCount *
        (packageType.discount / 100)
    );
  };

  // 주요 변수 계산
  const orderPrice = orderType === ORDER_TYPE.GENERAL
    ? generalOrderBody.orderPrice
    : subscriptionOrderBody.orderPrice;

  const discountReward = orderType === ORDER_TYPE.GENERAL
    ? generalOrderBody.discountReward
    : subscriptionOrderBody.discountReward;

  const userTotalReward = orderType === ORDER_TYPE.GENERAL
    ? generalOrderSheetData?.reward ?? 0
    : subscriptionOrderSheetData?.reward ?? 0;
  
  const deliveryPrice = calculateDeliveryPrice();
  const discountCoupon = calculateDiscountCoupon();
  const discountGrade = calculateDiscountGrade();
  const discountSubscriptionMonth = calculatePackageDiscount();

  // 총 할인 및 결제 금액 계산
  const discountTotal = discountReward + discountCoupon + discountGrade + discountSubscriptionMonth;
  const calculatedPaymentPrice = orderPrice + deliveryPrice - discountTotal;
  const paymentPrice = Math.max(calculatedPaymentPrice, IAMPORT_MIN_PAYMENT_PRICE);
  const availableMaxDiscount = paymentPrice - IAMPORT_MIN_PAYMENT_PRICE;

  const availableMaxReward = Math.min(availableMaxDiscount, userTotalReward);

  return {
    discountReward,
    discountCoupon,
    discountGrade,
    discountSubscriptionMonth,
    discountTotal,
    paymentPrice,
    availableMaxDiscount,
    deliveryPrice,
    availableMaxReward,
  };
};