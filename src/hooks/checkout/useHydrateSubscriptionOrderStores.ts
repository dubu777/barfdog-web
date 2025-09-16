"use client";

import { useEffect, useRef } from "react";
import { SubscriptionOrderSheetResponse } from "@/types";
import { useDeliveryStore } from "@/store/checkout/useDeliveryStore";
import { useRewardStore } from "@/store/checkout/useRewardStore";
import { usePaymentStore } from "@/store/checkout/usePaymentStore";
import { useOrderStore } from "@/store/checkout/useOrderStore";
import { generateCustomerUid } from "@/utils/checkout/generateCustomerUid";
import { calculateNextDeliveryDate } from "@/utils/subscription/calculateNextDeliveryDate";

/**
 * 서버에서 내려준 구독 주문 시트 데이터를 클라이언트 스토어로 한 번만' 주입
 * - 렌더 중 setState 방지: 반드시 useEffect 안에서 실행
 * - 중복 실행 방지: hydratedRef 사용
 */
export function useHydrateSubscriptionOrderStores(
  data: SubscriptionOrderSheetResponse | undefined
) {
  const setDeliveryDto = useDeliveryStore((s) => s.setDeliveryDto);
  const setUserTotalReward = useRewardStore((s) => s.setUserTotalReward);
  const setOrderPrice = usePaymentStore((s) => s.setOrderPrice);
  const setDiscountGrade = usePaymentStore((s) => s.setDiscountGrade);
  const setCustomerUid = useOrderStore((s) => s.setCustomerUid);
  const setNextDeliveryDate = useOrderStore((s) => s.setNextDeliveryDate);

  const hydratedRef = useRef(false);

  useEffect(() => {
    if (!data || hydratedRef.current) return;

    const { defaultAddress, reward, subscribeDto } = data;

    // 렌더 단계가 아닌 이펙트에서만 상태 세팅
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
    setDiscountGrade(subscribeDto.discountGrade);
    setOrderPrice(subscribeDto.nextPaymentPrice);

    // 동적으로 생성되는 값도 이펙트 내부에서 계산/세팅
    setCustomerUid(generateCustomerUid());
    setNextDeliveryDate(calculateNextDeliveryDate());

    hydratedRef.current = true;
  }, [
    data,
    setDeliveryDto,
    setUserTotalReward,
    setOrderPrice,
    setDiscountGrade,
    setCustomerUid,
    setNextDeliveryDate,
  ]);
}
