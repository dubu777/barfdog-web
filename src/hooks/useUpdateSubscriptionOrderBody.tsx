import { useEffect } from "react";
import {
  SaveSubscriptionOrderRequest,
  SubscriptionOrderSheetResponse,
} from "@/types";
import { ORDER_TYPE } from "@/constants";
import { useOrderStore } from "@/store/order/useOrderStore";
import { generateCustomerUid } from "@/utils/order/generateCustomerUid";
import { useRewardStore } from "@/store/order/useRewardStore";
import { useDeliveryStore } from "@/store/order/useDeliveryStore";

export function useUpdateSubscriptionOrderBody(
  subscriptionOrderSheetData: SubscriptionOrderSheetResponse,
) {
  const updateOrderBody = useOrderStore(state => state.updateOrderBody);
  const setDeliveryDto = useDeliveryStore(state => state.setDeliveryDto);
  const setUserTotalReward = useRewardStore(state => state.setUserTotalReward);
  const customerUid = generateCustomerUid();

  useEffect(() => {
    const {
      address,
      subscribeDto,
      nextDeliveryDate,
      name,
      phoneNumber,
      reward,
    } = subscriptionOrderSheetData;

    const discountGrade = subscribeDto.discountGrade || 0;


    const updatedBody: SaveSubscriptionOrderRequest = {
      customerUid,
      memberCouponId: null,
      deliveryDto: {
        name: name, // 수령자 이름
        phone: phoneNumber,
        zipcode: address.zipcode,
        street: address.street,
        detailAddress: address.detailAddress,
        request: "",
      },
      deliveryPrice: 0,
      discountCoupon: 0,
      discountGrade,
      discountReward: 0,
      discountSubscriptionMonth: 0,
      discountTotal: 0,
      nextDeliveryDate,
      orderPrice: subscribeDto.nextPaymentPrice,
      overDiscount: 0,
      paymentMethod: "NAVER_PAY",
      paymentPrice: subscribeDto.nextPaymentPrice - discountGrade,
      subscriptionMonth: null,
      agreePrivacy: false,
      brochure: false,
    };

    updateOrderBody(updatedBody, ORDER_TYPE.SUBSCRIPTION);
    setDeliveryDto({
      name: name, // 수령자 이름
      phone: phoneNumber,
      zipcode: address.zipcode,
      street: address.street,
      detailAddress: address.detailAddress,
      request: "",
    });
    setUserTotalReward(reward);
  }, [subscriptionOrderSheetData]);
}
