import { create } from "zustand";
import {
  SaveGeneralOrderRequest,
  SaveSubscriptionOrderRequest,
  OrderType,
  ClientDeliveryDto,
  DeliveryDto,
} from "@/types";
import {
  initialGeneralOrderBody,
  initialSubscriptionOrderBody,
} from "@/config/orderInitialValues";

import { useDeliveryStore } from "./useDeliveryStore";
import { usePaymentStore } from "./usePaymentStore";
import { ORDER_TYPE } from "@/constants";
import { useRewardStore } from "./useRewardStore";
import { useCouponStore } from "./useCouponStore";
import { usePersistOrderStore } from "./usePersistOrderStore";

interface OrderState {
  agreePrivacy: boolean;
  agreeSubscription: boolean;
  customerUid: string;
  nextDeliveryDate: string;
  getRequestBody: (
    orderType: OrderType
  ) => SaveGeneralOrderRequest | SaveSubscriptionOrderRequest;
  // API가 일반 결제도 쿠폰 전체 적용으로 변경된다면 수정예정 => 삭제할듯
  setAgreePrivacy: (agreePrivacy: boolean) => void;
  setAgreeSubscription: (agreeSubscription: boolean) => void;
  setCustomerUid: (customerUid: string) => void;
  setNextDeliveryDate: (nextDeliveryDate: string) => void;
}

export const useOrderStore = create<OrderState>((set, get) => ({
  agreePrivacy: false,
  agreeSubscription: false,
  customerUid: "",
  nextDeliveryDate: "",

  getRequestBody: (orderType) => {
    const { agreePrivacy, customerUid, nextDeliveryDate } = get();

    // 필요한 데이터들을 각각의 store에서 가져옴
    const { deliveryDto, deliveryId, isBundleDelivery } =
      useDeliveryStore.getState();
    const {
      discountTotal,
      deliveryPrice,
      paymentPrice,
      paymentMethod,
      orderPrice,
      finalPrice,
      discountSubscribeAlliance,
      discountGrade,
    } = usePaymentStore.getState();
    const { appliedReward } = useRewardStore.getState();
    const { appliedCoupon } = useCouponStore.getState();
    const { orderItemDtoList } = usePersistOrderStore.getState();
    // defaultAddress, address 형태를 deliveryDto와 맞추기 위해
    const extractServerDeliveryDto = (dto: ClientDeliveryDto): DeliveryDto => {
      const {
        deliveryId,
        deliveryName,
        default: isDefault,
        ...serverDto
      } = dto;
      return serverDto;
    };

    const commonBody = {
      deliveryDto: extractServerDeliveryDto(deliveryDto),
      agreePrivacy,
      paymentMethod,
      discountCoupon: appliedCoupon?.discountAmount ?? 0,
      discountReward: appliedReward,
      discountTotal,
      deliveryPrice,
      paymentPrice,
      orderPrice,
      memberCouponId: appliedCoupon?.couponId ?? null,
    };

    if (orderType === ORDER_TYPE.GENERAL) {
      return {
        ...commonBody,
        finalPrice,
        orderItemDtoList,
        deliveryId: isBundleDelivery ? deliveryId : null,
      } as SaveGeneralOrderRequest;
    }

    return {
      ...commonBody,
      customerUid,
      nextDeliveryDate,
      discountGrade,
      discountSubscribeAlliance,
      overDiscount: 0,
    } as SaveSubscriptionOrderRequest;
  },

  setAgreePrivacy: (agreePrivacy) => set({ agreePrivacy }),
  setAgreeSubscription: (agreeSubscription) => set({ agreeSubscription }),
  setCustomerUid: (customerUid) => set({ customerUid }),
  setNextDeliveryDate: (nextDeliveryDate) => set({ nextDeliveryDate }),
}));
