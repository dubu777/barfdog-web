import { create } from "zustand";
import {
  SaveGeneralOrderRequest,
  OrderType,
  PrepareSubscriptionPaymentRequest,
} from "@/types";

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
  currentDeliveryDate: string;
  subscribeId: number | null;
  getRequestBody: (
    orderType: OrderType
  ) => SaveGeneralOrderRequest | PrepareSubscriptionPaymentRequest;
  setAgreePrivacy: (agreePrivacy: boolean) => void;
  setAgreeSubscription: (agreeSubscription: boolean) => void;
  setCustomerUid: (customerUid: string) => void;
  setCurrentDeliveryDate: (currentDeliveryDate: string) => void;
  setSubscribeId: (subscribeId: number) => void;
}

export const useOrderStore = create<OrderState>((set, get) => ({
  agreePrivacy: false,
  agreeSubscription: false,
  customerUid: "",
  currentDeliveryDate: "",
  subscribeId: null,

  getRequestBody: (orderType) => {
    const { agreePrivacy, customerUid, currentDeliveryDate, subscribeId } =
      get();

    // 필요한 데이터들을 각각의 store에서 가져옴
    const { deliveryDto, deliveryId, isBundleDelivery } =
      useDeliveryStore.getState();
    const {
      discountTotal,
      deliveryPrice,
      paymentPrice,
      paymentMethod,
      originalPrice,
      discountGrade,
    } = usePaymentStore.getState();
    const { appliedReward } = useRewardStore.getState();
    const { appliedCoupon } = useCouponStore.getState();
    const { orderItemDtoList } = usePersistOrderStore.getState();

    const commonBody = {
      deliveryDto,
      agreePrivacy,
      paymentMethod,
      discountCoupon: appliedCoupon?.discountAmount ?? 0,
      discountReward: appliedReward,
      discountTotal,
      deliveryPrice,
      paymentPrice,
      orderPrice: originalPrice,
      memberCouponId: appliedCoupon?.couponId ?? null,
    };

    if (orderType === ORDER_TYPE.GENERAL) {
      return {
        ...commonBody,
        orderItemDtoList,
        deliveryId: isBundleDelivery ? deliveryId : null,
      } as SaveGeneralOrderRequest;
    }

    // 구독 결제: PrepareSubscriptionPaymentRequest 구조로 변환
    if (!deliveryDto || !subscribeId) {
      throw new Error("구독 결제에 필요한 정보가 없습니다.");
    }

    const { discountPlan } = usePaymentStore.getState();

    return {
      subscribeId,
      memberCouponId: appliedCoupon?.couponId ?? null,
      deliveryInfo: {
        address: deliveryDto,
        currentDeliveryDate,
      },
      paymentInfo: {
        customerUid,
        originalPrice,
        discountPlan,
        discountGrade,
        discountCoupon: appliedCoupon?.discountAmount ?? 0,
        discountReward: appliedReward,
        discountTotal,
        overDiscount: 0,
        deliveryPrice,
        paymentPrice,
        paymentMethod,
      },
    } as PrepareSubscriptionPaymentRequest;
  },

  setAgreePrivacy: (agreePrivacy) => set({ agreePrivacy }),
  setAgreeSubscription: (agreeSubscription) => set({ agreeSubscription }),
  setCustomerUid: (customerUid) => set({ customerUid }),
  setCurrentDeliveryDate: (currentDeliveryDate) => set({ currentDeliveryDate }),
  setSubscribeId: (subscribeId) => set({ subscribeId }),
}));
