// src/hooks/useInitializeSubscriptionOrder.ts
import { useEffect } from 'react';
import { SubscriptionOrderSheetResponse } from '@/types';
import { useDeliveryStore } from '@/store/order/useDeliveryStore';
import { generateCustomerUid } from '@/utils/order/generateCustomerUid';
import { useOrderStore } from '@/store/order/useOrderStore';
import { useRewardStore } from '@/store/order/useRewardStore';

export function useInitializeSubscriptionOrder(
  subscriptionOrderSheetData: SubscriptionOrderSheetResponse | undefined
) {
  // store 업데이트 함수들
  const setDeliveryDto = useDeliveryStore((state) => state.setDeliveryDto);
  const setUserTotalReward = useRewardStore((state) => state.setUserTotalReward);
  const setCustomerUid = useOrderStore((state) => state.setCustomerUid);
  const customerUid = generateCustomerUid();
  useEffect(() => {
    if (!subscriptionOrderSheetData) return;
    const {
      defaultAddress,
      reward,
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
  }, [subscriptionOrderSheetData]);
}