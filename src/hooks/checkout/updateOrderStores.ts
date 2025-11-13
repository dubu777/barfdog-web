import { useCallback } from "react";
import { GeneralOrderSheetResponse } from "@/types";
import { useDeliveryStore } from "@/store/checkout/useDeliveryStore";
import { useRewardStore } from "@/store/checkout/useRewardStore";
import { usePaymentStore } from "@/store/checkout/usePaymentStore";

/**
 * 주문 정보 조회 성공시 모든 store 상태를 업데이트하는 훅
 */
export const useUpdateOrderStores = () => {
  const {
    setDeliveryDto,
    setBackupDeliveryDto,
    setDeliveryId,
    setBundleDeliveryDto,
  } = useDeliveryStore();
  const setUserTotalReward = useRewardStore(
    (state) => state.setUserTotalReward
  );
  const setOrderPrice = usePaymentStore((state) => state.setOrderPrice);

  const updateStores = useCallback(
    (data: GeneralOrderSheetResponse) => {
      // 초기 값 상태 업데이트
      setOrderPrice(data.orderPrice);

      const deliveryInfo = {
        isDefault: data.defaultAddress.default,
        id: data.defaultAddress.id,
        deliveryName:
          data.defaultAddress.deliveryName ?? data.defaultAddress.recipientName,
        recipientName: data.defaultAddress.recipientName,
        phoneNumber: data.defaultAddress.phoneNumber,
        zipcode: data.defaultAddress.zipcode,
        street: data.defaultAddress.street,
        detailAddress: data.defaultAddress.detailAddress,
        request: data.defaultAddress.request,
      };

      setDeliveryDto(deliveryInfo);
      setBackupDeliveryDto(deliveryInfo);
      setUserTotalReward(data.reward);

      // 번들 배송이 가능한 경우에만 번들 배송 정보 설정
      if (data.deliveryAddress && data.deliveryAddress.length > 0) {
        setBundleDeliveryDto({
          id: data.deliveryAddress[0].id,
          deliveryName:
            data.deliveryAddress[0].deliveryName ??
            data.deliveryAddress[0].recipientName,
          isDefault: false,
          recipientName: data.deliveryAddress[0].recipientName,
          phoneNumber: data.deliveryAddress[0].phoneNumber,
          zipcode: data.deliveryAddress[0].zipcode,
          street: data.deliveryAddress[0].street,
          detailAddress: data.deliveryAddress[0].detailAddress,
          request: "",
        });
        setDeliveryId(data.deliveryAddress[0].id);
      }
    },
    [
      setOrderPrice,
      setDeliveryDto,
      setBackupDeliveryDto,
      setUserTotalReward,
      setBundleDeliveryDto,
      setDeliveryId,
    ]
  );

  return updateStores;
};
