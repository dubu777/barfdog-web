interface DeliveryInfo {
  deliveryFreeConditionPrice: number | null;
}

interface Form {
  selfInfo?: {
    reward: number;
    discountGrade?: number;
  };
  discountReward: number;
  discountCoupon?: number;
  deliveryPrice: number;
  orderPrice: number;
  subscriptionMonth?: number | null;
  orderItemDtoList?: {
    discountAmount: number;
    deliveryFree: boolean;
  }[];
  bundle?: boolean;
}

interface Info {
  subscribeDto: {
    plan: string;
    originPrice: number;
  };
}

export const calcOrderSheetPrices = (
  form: Form,
  orderType: 'general' | 'subscribe' = 'general',
  deliveryInfo: DeliveryInfo = { deliveryFreeConditionPrice: null },
  info: Info
) => {
  // 배송비 계산
  const calculateDeliveryPrice = (
    orderType: 'general' | 'subscribe',
    form: Form,
    deliveryInfo: DeliveryInfo
  ): number => {
    if (orderType === 'subscribe') return 0;

    const isFreeDelivery =
      form.bundle ||
      (deliveryInfo.deliveryFreeConditionPrice &&
        form.orderPrice >= deliveryInfo.deliveryFreeConditionPrice) ||
      !(form.orderItemDtoList?.some((item) => !item.deliveryFree) ?? false);

    return isFreeDelivery ? 0 : form.deliveryPrice;
  };

  // 쿠폰 할인 계산
  const calculateDiscountCoupon = (
    orderItemDtoList?: { discountAmount: number }[]
  ): number => {
    return orderItemDtoList?.reduce((acc, item) => acc + item.discountAmount, 0) ?? 0;
  };

  // 등급 할인 계산
  const calculateDiscountGrade = (
    orderType: 'general' | 'subscribe',
    discountGrade?: number
  ): number => {
    return orderType === 'subscribe' ? (discountGrade ?? 0) : 0;
  };

  // 패키지 할인 계산
  const calculatePackageDiscount = (
    orderType: 'general' | 'subscribe',
    subscriptionMonth: number | null | undefined,
    info: Info
  ): number => {
    if (orderType !== 'subscribe' || subscriptionMonth === null) return 0;

    const subscriptionType = Object.values(subscriptionMonthType).find(
      (type) => type.VALUE === subscriptionMonth
    );

    if (!subscriptionType) return 0;

    const isFullPlan = ['FULL', 'TOPPING_FULL'].includes(info.subscribeDto.plan);
    const isHalfPlan = ['HALF', 'TOPPING_HALF'].includes(info.subscribeDto.plan);
    const deliveryCount = isFullPlan
      ? subscriptionType.fullDeliveryCount
      : isHalfPlan
      ? subscriptionType.halfDeliveryCount
      : 1;

    return Math.floor(
      info.subscribeDto.originPrice * deliveryCount * (subscriptionType.discount / 100)
    );
  };

  // 주요 변수 계산
  const orderPrice = Number(form.orderPrice);
  const discountReward = Number(form.discountReward);
  const deliveryPrice = calculateDeliveryPrice(orderType, form, deliveryInfo);
  const discountCoupon = calculateDiscountCoupon(form.orderItemDtoList);
  const discountGrade = calculateDiscountGrade(orderType, form.selfInfo?.discountGrade);
  const discountSubscriptionMonth = calculatePackageDiscount(
    orderType,
    form.subscriptionMonth,
    info
  );

  // 총 할인 및 결제 금액 계산
  const discountTotal =
    discountReward + discountCoupon + discountGrade + discountSubscriptionMonth;
  const calcedPaymentPrice = orderPrice + deliveryPrice - discountTotal;
  const paymentPrice = Math.max(calcedPaymentPrice, IAMPORT_MIN_PAYMENT_PRICE);
  const availableMaxDiscount = paymentPrice - IAMPORT_MIN_PAYMENT_PRICE;
  const userTotalReward = form.selfInfo?.reward ?? 0;
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
