import { create } from "zustand";
import {
  CreateGeneralOrderRequest,
  CreateSubscriptionOrderRequest,
  OrderType,
} from "@/types";
import {
  initialGeneralOrderBody,
  initialSubscriptionOrderBody,
} from "@/config/orderInitialValues";

import { useDeliveryStore } from "./useDeliveryStore";
import { usePaymentStore } from "./usePaymentStore";
import { useCouponStore } from "./useCouponStore";
import { ORDER_TYPE } from "@/constants";
import { useDiscountStore } from "./useDiscountStore";
import { useRewardStore } from "./useRewardStore";

interface OrderState {
  generalOrderBody: CreateGeneralOrderRequest;
  subscriptionOrderBody: CreateSubscriptionOrderRequest;
  updateOrderBody: (
    updates: Partial<
      CreateGeneralOrderRequest | CreateSubscriptionOrderRequest
    >,
    orderType: OrderType
  ) => void;
  getRequestBody: (
    orderType: OrderType
  ) => CreateGeneralOrderRequest | CreateSubscriptionOrderRequest;
  updateAppliedCoupon: (
    type: OrderType,
    itemId: number | null,
    itemPrice: number,
    couponId: number,
    discountAmount: number
  ) => void;
  // API가 일반 결제도 쿠폰 전체 적용으로 변경된다면 수정예정 => 삭제할듯
  getAppliedCouponDiscount: (itemId: number) => number | undefined;
  cancelAppliedCoupon: (type: OrderType, itemId: number | null) => void;
  isAppliedCoupon: (couponId: number) => boolean;

}

export const useOrderStore2 = create<OrderState>((set, get) => ({
  generalOrderBody: initialGeneralOrderBody,
  subscriptionOrderBody: initialSubscriptionOrderBody,

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
    const { generalOrderBody, subscriptionOrderBody } = get();

    // 필요한 데이터들을 각각의 store에서 가져옴
    const { deliveryDto, deliveryId } = useDeliveryStore.getState();
    const { paymentMethod } = usePaymentStore.getState();
    const { discountCoupon, discountTotal, deliveryPrice, paymentPrice } = useDiscountStore.getState();
    const { appliedReward } = useRewardStore.getState();

    const commonBody = {
      deliveryDto,
      paymentMethod,
      discountCoupon,
      discountTotal,
      deliveryPrice,
      paymentPrice,
    };

    if (orderType === ORDER_TYPE.GENERAL) {
      return { ...generalOrderBody, ...commonBody, deliveryId } as CreateGeneralOrderRequest;
    }

    return { ...subscriptionOrderBody, ...commonBody } as CreateSubscriptionOrderRequest;
  },
    // 쿠폰 적용
    updateAppliedCoupon: (type, itemId, itemPrice, couponId, discountAmount) =>
      set((state) => {
        if (type === ORDER_TYPE.GENERAL) {
          const updatedItems = state.generalOrderBody.orderItemDtoList.map(
            (item) =>
              item.itemId === itemId
                ? {
                    ...item,
                    memberCouponId: couponId,
                    discountAmount,
                    finalPrice: itemPrice - discountAmount,
                  }
                : item
          );
          return {
            generalOrderBody: {
              ...state.generalOrderBody,
              orderItemDtoList: updatedItems,
            },
          };
        } else if (type === ORDER_TYPE.SUBSCRIPTION) {
          return {
            subscriptionOrderBody: {
              ...state.subscriptionOrderBody,
              memberCouponId: couponId,
              discountCoupon: discountAmount,
            },
          };
        }
        return state;
      }),
    getAppliedCouponDiscount: (itemId) => {
      const orderItem = get().generalOrderBody.orderItemDtoList.find(
        (item) => item.itemId === itemId
      );
      return orderItem?.discountAmount;
    },
      // 쿠폰 취소
  cancelAppliedCoupon: (type, itemId) =>
    set((state) => {
      if (type === ORDER_TYPE.GENERAL) {
        const updatedItems = state.generalOrderBody.orderItemDtoList.map(
          (item) =>
            item.itemId === itemId
              ? {
                  ...item,
                  memberCouponId: null,
                  discountAmount: 0,
                }
              : item
        );
        return {
          generalOrderBody: {
            ...state.generalOrderBody,
            orderItemDtoList: updatedItems,
          },
        };
      } else if (type === ORDER_TYPE.SUBSCRIPTION) {
        return {
          subscriptionOrderBody: {
            ...state.subscriptionOrderBody,
            memberCouponId: null,
            discountCoupon: 0,
          },
        };
      }
      return state;
    }),
    isAppliedCoupon: (couponId) => {
      const appliedItem = get().generalOrderBody.orderItemDtoList.find(
        (item) => item.memberCouponId === couponId
      );
      return !!appliedItem;
    },
  
}));
