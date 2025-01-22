import { useEffect } from "react";
import {
  CreateSubscriptionOrderRequest,
  SubscriptionOrderSheetResponse,
} from "@/types";
import { useDiscountStore } from "@/store/order/useDiscountStore";
import { ORDER_TYPE } from "@/constants";
import { useOrderStore } from "@/store/order/useOrderStore";
import { generateCustomerUid } from "@/utils/order/generateCustomerUid";

export function useUpdateSubscriptionOrderBody(
  subscriptionOrderSheetData: SubscriptionOrderSheetResponse,
) {
  const { updateOrderBody } = useOrderStore();
  const { setDiscountTotal } = useDiscountStore();
  const customerUid = generateCustomerUid();

  useEffect(() => {
    const {
      defaultAddress,
      subscribeDto,
      nextDeliveryDate,
      name,
      phoneNumber,
    } = subscriptionOrderSheetData;

    const discountGrade = subscribeDto.discountGrade || 0;

    setDiscountTotal(subscribeDto.nextPaymentPrice - discountGrade);

    const updatedBody: CreateSubscriptionOrderRequest = {
      customerUid,
      memberCouponId: null,
      deliveryDto: {
        name: name, // 수령자 이름
        phone: phoneNumber,
        zipcode: defaultAddress.zipcode,
        street: defaultAddress.street,
        detailAddress: defaultAddress.detailAddress,
        request: "",
      },
      deliveryPrice: 0,
      discountCoupon: 0,
      discountGrade,
      discountReward: 0,
      discountSubscriptionMonth: 0,
      discountTotal: subscribeDto.nextPaymentPrice - discountGrade,
      nextDeliveryDate,
      orderPrice: subscribeDto.nextPaymentPrice,
      overDiscount: 0,
      paymentMethod: "NAVER_PAY",
      paymentPrice: subscribeDto.nextPaymentPrice - discountGrade,
      subscriptionMonth: null,
      agreePrivacy: true,
      brochure: true,
    };

    updateOrderBody(updatedBody, ORDER_TYPE.SUBSCRIPTION);
  }, [subscriptionOrderSheetData]);
}
