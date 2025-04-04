// src/hooks/useInitializeSubscriptionOrder.ts
import { useEffect } from 'react';
import { SubscriptionOrderSheetResponse } from '@/types';
import { useDeliveryStore } from '@/store/order/useDeliveryStore';
import { generateCustomerUid } from '@/utils/order/generateCustomerUid';
import { useOrderStore } from '@/store/order/useOrderStore';
import { useRewardStore } from '@/store/order/useRewardStore';
import { calculateNextDeliveryDate } from '@/utils/subscription/calculateNextDeliveryDate';
import { usePaymentStore } from '@/store/order/usePaymentStore';

export function useInitializeSubscriptionOrder(
  subscriptionOrderSheetData: SubscriptionOrderSheetResponse | undefined
) {
  // store 업데이트 함수들
  const setDeliveryDto = useDeliveryStore((state) => state.setDeliveryDto);
  const setUserTotalReward = useRewardStore((state) => state.setUserTotalReward);
  const setOrderPrice = usePaymentStore(state => state.setOrderPrice)
  const setDiscountGrade = usePaymentStore(state => state.setDiscountGrade)
  const setCustomerUid = useOrderStore((state) => state.setCustomerUid);
  const setNextDeliveryDate = useOrderStore((state) => state.setNextDeliveryDate);

  const customerUid = generateCustomerUid();
  const nextDeliveryDate = calculateNextDeliveryDate()
  useEffect(() => {
    if (!subscriptionOrderSheetData) return;
    const {
      defaultAddress,
      reward,
      subscribeDto,
    } = subscriptionOrderSheetData;
    setDeliveryDto({
      default: defaultAddress.default,
      deliveryId: defaultAddress.id,
      deliveryName: defaultAddress.deliveryName ?? defaultAddress.recipientName,
      recipientName: defaultAddress.recipientName,
      phoneNumber: defaultAddress.phoneNumber,
      zipcode: defaultAddress.zipcode,
      street: defaultAddress.street,
      detailAddress: defaultAddress.detailAddress,
      request: defaultAddress.request,
    });
    setUserTotalReward(reward);
    setCustomerUid(customerUid)
    setNextDeliveryDate(nextDeliveryDate)
    setDiscountGrade(subscribeDto.discountGrade)
    setOrderPrice(subscribeDto.nextPaymentPrice)
  }, [subscriptionOrderSheetData]);
}