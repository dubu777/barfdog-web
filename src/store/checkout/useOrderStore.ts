import { create } from "zustand";
import {
  PrepareGeneralPaymentRequest,
  OrderType,
  PrepareSubscriptionPaymentRequest,
} from "@/types";

import { useDeliveryStore } from "./useDeliveryStore";
import { usePaymentStore } from "./usePaymentStore";
import { ORDER_TYPE } from "@/constants";
import { useRewardStore } from "./useRewardStore";
import { useCouponStore } from "./useCouponStore";
import { usePersistOrderStore } from "./usePersistOrderStore";
import { convertToDeliveryRequest } from "@/utils/delivery/convertToDeliveryRequest";

interface OrderState {
  agreePrivacy: boolean;
  agreeSubscription: boolean;
  customerUid: string;
  currentDeliveryDate: string;
  subscribeId: number | null;
  getRequestBody: (
    orderType: OrderType
  ) => PrepareGeneralPaymentRequest | PrepareSubscriptionPaymentRequest;
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
    const { customerUid, currentDeliveryDate, subscribeId } = get();

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
      overDiscount,
      saveReward,
    } = usePaymentStore.getState();
    const { appliedReward } = useRewardStore.getState();
    const { appliedCoupon } = useCouponStore.getState();
    const { itemList } = usePersistOrderStore.getState();

    if (orderType === ORDER_TYPE.GENERAL) {
      if (!deliveryDto) {
        throw new Error("일반 결제에 필요한 배송지 정보가 없습니다.");
      }

      return {
        itemList,
        memberCouponId: appliedCoupon?.couponId ?? null,
        deliveryInfo: {
          address: convertToDeliveryRequest(deliveryDto),
          deliveryId: isBundleDelivery ? deliveryId : null,
        },
        paymentInfo: {
          originalPrice,
          discountTotal,
          discountProduct: 0, // 상품 기본 할인은 서버에서 계산됨
          discountReward: appliedReward,
          discountCoupon: appliedCoupon?.discountAmount ?? 0,
          deliveryPrice,
          paymentPrice,
          overDiscount,
          saveReward,
          paymentMethod,
        },
      } as PrepareGeneralPaymentRequest;
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
        address: convertToDeliveryRequest(deliveryDto),
        currentDeliveryDate,
      },
      paymentInfo: {
        customerUid,
        originalPrice,
        discountPlan,
        discountGrade,
        discountCoupon: appliedCoupon?.appliedDiscountAmount ?? 0,
        discountReward: appliedReward,
        discountTotal,
        overDiscount,
        deliveryPrice,
        paymentPrice,
        paymentMethod,
        saveReward,
      },
    } as PrepareSubscriptionPaymentRequest;
  },

  setAgreePrivacy: (agreePrivacy) => set({ agreePrivacy }),
  setAgreeSubscription: (agreeSubscription) => set({ agreeSubscription }),
  setCustomerUid: (customerUid) => set({ customerUid }),
  setCurrentDeliveryDate: (currentDeliveryDate) => set({ currentDeliveryDate }),
  setSubscribeId: (subscribeId) => set({ subscribeId }),
}));
