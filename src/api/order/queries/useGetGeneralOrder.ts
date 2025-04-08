import {
  useMutation,
} from "@tanstack/react-query";
import { getGeneralOrder } from "../order";
import { UseMutationCustomOptions } from "@/types";
import { useDeliveryStore } from "@/store/order/useDeliveryStore";
import { useRewardStore } from "@/store/order/useRewardStore";
import { usePaymentStore } from "@/store/order/usePaymentStore";

// 캐싱 및 상태 업데이트
export function useGetGeneralOrder(
  mutationOptions?: UseMutationCustomOptions
) {
  const { setDeliveryDto, setBackupDeliveryDto, setDeliveryId, setBundleDeliveryDto } = useDeliveryStore();
  const setUserTotalReward = useRewardStore(state => state.setUserTotalReward);
  const setOrderPrice = usePaymentStore(state => state.setOrderPrice)
  return useMutation({
    mutationFn: getGeneralOrder,
    onSuccess: (data) => {
      // 초기 값 상태 업데이트
      setOrderPrice(data.orderPrice)
      setDeliveryDto({
        default: data.defaultAddress.default,
        deliveryId: data.defaultAddress.id,
        deliveryName: data.defaultAddress.deliveryName ?? data.defaultAddress.recipientName,
        recipientName: data.defaultAddress.recipientName,
        phoneNumber: data.defaultAddress.phoneNumber,
        zipcode: data.defaultAddress.zipcode,
        street: data.defaultAddress.street,
        detailAddress: data.defaultAddress.detailAddress,
        request: data.defaultAddress.request,
      });
      setBackupDeliveryDto({
        default: data.defaultAddress.default,
        deliveryId: data.defaultAddress.id,
        deliveryName: data.defaultAddress.deliveryName ?? data.defaultAddress.recipientName,
        recipientName: data.defaultAddress.recipientName,
        phoneNumber: data.defaultAddress.phoneNumber,
        zipcode: data.defaultAddress.zipcode,
        street: data.defaultAddress.street,
        detailAddress: data.defaultAddress.detailAddress,
        request: data.defaultAddress.request,
      });
      setUserTotalReward(data.reward);
      if (data.deliveryAddress && data.deliveryAddress.length > 0) {
        setBundleDeliveryDto({
          deliveryId: data.deliveryAddress[0].id,
          deliveryName: data.deliveryAddress[0].deliveryName ?? data.deliveryAddress[0].recipientName,
          default: false,
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
    onError: (err) => {
      console.error("일반 결제 주문 정보 조회 에러", err);
    },
    ...mutationOptions,
  });
}