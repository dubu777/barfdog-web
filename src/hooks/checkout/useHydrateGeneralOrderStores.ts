"use client";

import { useEffect } from "react";
import { GetGeneralCheckoutResponse } from "@/types";
import { useDeliveryStore } from "@/store/checkout/useDeliveryStore";
import { useRewardStore } from "@/store/checkout/useRewardStore";
import { usePaymentStore } from "@/store/checkout/usePaymentStore";

/**
 * 일반 주문 시트 → 여러 Store를 일관되게 동기화(하이드레이션)하는 훅
 * - 컨테이너에서는 sheet만 넘겨주면, 내부 useEffect가 변경 시점에 알아서 반영
 */
export function useHydrateGeneralOrderStores(
  sheet: GetGeneralCheckoutResponse | undefined
) {
  const {
    setDeliveryDto,
    setBackupDeliveryDto,
    setDeliveryId,
    setBundleDeliveryDto,
  } = useDeliveryStore();
  const setUserTotalReward = useRewardStore((s) => s.setUserTotalReward);
  const setOriginalPrice = usePaymentStore((s) => s.setOriginalPrice);
  const setRewardPercent = usePaymentStore((s) => s.setRewardPercent);
  useEffect(() => {
    if (!sheet) return;

    const { memberInfo, paymentInfo, defaultAddress, pakageableDeliveryList } =
      sheet;

    // 결제 금액(기준가) 동기화
    setOriginalPrice(paymentInfo.originalPrice);
    setDeliveryDto(defaultAddress);
    setRewardPercent(memberInfo.gradeInfo.rewardPercent);
    // 적립금 동기화
    setUserTotalReward(memberInfo.availableReward);

    // 번들 배송 가능 시 동기화
    if (pakageableDeliveryList && pakageableDeliveryList.length > 0) {
      const first = pakageableDeliveryList[0];
      setBundleDeliveryDto({
        id: first.id,
        deliveryName: first.deliveryName,
        isDefault: false,
        recipientName: first.recipientName,
        phoneNumber: first.phoneNumber,
        zipcode: first.zipcode,
        city: "", // PackageableDelivery doesn't have city field, using empty string
        street: first.street,
        detailAddress: first.detailAddress,
        request: first.request,
      });
      setDeliveryId(first.id);
    }
  }, [
    sheet,
    setOriginalPrice,
    setDeliveryDto,
    setBackupDeliveryDto,
    setUserTotalReward,
    setBundleDeliveryDto,
    setDeliveryId,
  ]);
}
