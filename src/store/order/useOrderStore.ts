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
import { useDiscountStore } from "./useDiscountStore";
import { useRewardStore } from "./useRewardStore";
import { useCouponStore } from "./useCouponStore";

interface OrderState {
  generalOrderBody: SaveGeneralOrderRequest;
  subscriptionOrderBody: SaveSubscriptionOrderRequest;
  finalPrice: number;
  agreePrivacy: boolean;
  agreeSubscription: boolean;
  setFinalPrice: (amount: number) => void;
  updateOrderBody: (
    updates: Partial<SaveGeneralOrderRequest | SaveSubscriptionOrderRequest>,
    orderType: OrderType
  ) => void;
  getRequestBody: (
    orderType: OrderType
  ) => SaveGeneralOrderRequest | SaveSubscriptionOrderRequest;
  // API가 일반 결제도 쿠폰 전체 적용으로 변경된다면 수정예정 => 삭제할듯
  setAgreePrivacy: (agreePrivacy: boolean) => void;
  setAgreeSubscription: (agreeSubscription: boolean) => void;
}

export const useOrderStore = create<OrderState>((set, get) => ({
  generalOrderBody: initialGeneralOrderBody,
  subscriptionOrderBody: initialSubscriptionOrderBody,
  agreePrivacy: false,
  agreeSubscription: false,
  finalPrice: 0,

  updateOrderBody: (updates, orderType) =>
    set((state) => {
      if (orderType === ORDER_TYPE.GENERAL) {
        return {
          generalOrderBody: { ...state.generalOrderBody, ...updates },
        };
      }
      return {
        subscriptionOrderBody: { ...state.subscriptionOrderBody, ...updates },
      };
    }),

  getRequestBody: (orderType) => {
    const { generalOrderBody, subscriptionOrderBody, agreePrivacy, finalPrice } =
      get();

    // 필요한 데이터들을 각각의 store에서 가져옴
    const { deliveryDto, deliveryId, isBundleDelivery } = useDeliveryStore.getState();
    const { paymentMethod } = usePaymentStore.getState();
    const { discountCoupon, discountTotal, deliveryPrice, paymentPrice } =
      useDiscountStore.getState();
    const { appliedReward } = useRewardStore.getState();
    const { appliedCoupon } = useCouponStore.getState();

    const extractServerDeliveryDto = (dto: ClientDeliveryDto): DeliveryDto => {
      const { deliveryId, deliveryName, default: isDefault, ...serverDto } = dto;
      return serverDto;
    };

    const commonBody = {
      deliveryDto: extractServerDeliveryDto(deliveryDto),
      agreePrivacy,
      paymentMethod,
      discountCoupon,
      discountReward: appliedReward,
      discountTotal,
      deliveryPrice,
      paymentPrice,
      memberCouponId: appliedCoupon?.couponId ?? null,
      
    };

    if (orderType === ORDER_TYPE.GENERAL) {
      return {
        ...generalOrderBody,
        ...commonBody,
        finalPrice,
        deliveryId: isBundleDelivery ? deliveryId : null,
      } as SaveGeneralOrderRequest;
    }

    return {
      ...subscriptionOrderBody,
      ...commonBody,
      deliveryDto: {
        detailAddress: deliveryDto.detailAddress,
        recipientName: deliveryDto.recipientName,
        phoneNumber: deliveryDto.phoneNumber,
        request: deliveryDto.request,
        street: deliveryDto.street,
        zipcode: deliveryDto.zipcode,
        deliveryName: "테스트 이름",
      },
    } as SaveSubscriptionOrderRequest;
  },

  setAgreePrivacy: (agreePrivacy) => set({ agreePrivacy }),
  setAgreeSubscription: (agreeSubscription) => set({ agreeSubscription }),
  setFinalPrice: (finalPrice) => set({finalPrice}),
}));
