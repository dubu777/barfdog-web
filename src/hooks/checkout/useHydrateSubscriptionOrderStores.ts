"use client";

import { useEffect, useRef } from "react";
import { SubscriptionCheckoutResponse } from "@/types";
import { useDeliveryStore } from "@/store/checkout/useDeliveryStore";
import { useRewardStore } from "@/store/checkout/useRewardStore";
import { usePaymentStore } from "@/store/checkout/usePaymentStore";
import { useOrderStore } from "@/store/checkout/useOrderStore";
import { generateCustomerUid } from "@/utils/checkout/generateCustomerUid";
import { useCouponStore } from "@/store/checkout/useCouponStore";

/**
 * 서버에서 내려준 구독 주문 시트 데이터를 클라이언트 스토어로 한 번만' 주입
 * - 렌더 중 setState 방지: 반드시 useEffect 안에서 실행
 * - 중복 실행 방지: hydratedRef 사용
 */
export function useHydrateSubscriptionOrderStores(
  data: SubscriptionCheckoutResponse | undefined
) {
  const setDeliveryDto = useDeliveryStore((s) => s.setDeliveryDto);
  const setUserTotalReward = useRewardStore((s) => s.setUserTotalReward);
  const setOriginalPrice = usePaymentStore((s) => s.setOriginalPrice);
  const setDiscountPlan = usePaymentStore((s) => s.setDiscountPlan);
  const setDiscountGrade = usePaymentStore((s) => s.setDiscountGrade);
  const setRewardPercent = usePaymentStore((s) => s.setRewardPercent);
  const setCustomerUid = useOrderStore((s) => s.setCustomerUid);
  const setCurrentDeliveryDate = useOrderStore((s) => s.setCurrentDeliveryDate);
  const setSubscribeId = useOrderStore((s) => s.setSubscribeId);
  const setAppliedReward = useRewardStore((s) => s.setAppliedReward);
  const cancelAppliedCoupon = useCouponStore((s) => s.cancelAppliedCoupon);

  const hydratedRef = useRef(false);
  const lastSubscribeIdRef = useRef<number | null>(null);

  useEffect(() => {
    if (!data) return;

    // 다른 구독으로 변경된 경우 hydratedRef 초기화
    if (lastSubscribeIdRef.current !== data.subscribeInfo.id) {
      hydratedRef.current = false;
      lastSubscribeIdRef.current = data.subscribeInfo.id;
    }

    if (hydratedRef.current) return;

    const { memberInfo, subscribeInfo, deliveryInfo, paymentInfo } = data;
    const defaultAddress = deliveryInfo.defaultAddress;

    if (defaultAddress) {
      console.warn("기본 배송지가 없습니다.");
      setDeliveryDto(defaultAddress);
    }

    setUserTotalReward(memberInfo.availableReward);
    setOriginalPrice(paymentInfo.originalPrice);
    setDiscountPlan(paymentInfo.discountPlan);
    setDiscountGrade(paymentInfo.discountGrade);
    setRewardPercent(memberInfo.gradeInfo.rewardPercent);
    setAppliedReward(0);
    cancelAppliedCoupon();

    // 동적으로 생성되는 값도 이펙트 내부에서 계산/세팅
    setCustomerUid(generateCustomerUid());
    setCurrentDeliveryDate(deliveryInfo.currentDeliveryDate);
    setSubscribeId(subscribeInfo.id);
    hydratedRef.current = true;
  }, [
    data,
    setDeliveryDto,
    setUserTotalReward,
    setOriginalPrice,
    setDiscountPlan,
    setDiscountGrade,
    setRewardPercent,
    setCustomerUid,
    setCurrentDeliveryDate,
    setSubscribeId,
  ]);
}
