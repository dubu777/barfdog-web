import { generalOrderBody } from "@/constants";
import {
  CreateGeneralOrderRequest,
  DeliveryDto,
  OrderItemDto,
  PaymentMethod,
} from "@/types";
import { create } from "zustand";

interface OrderState {
  generalOrderBody: CreateGeneralOrderRequest;
  updateGeneralOrderBody: (updates: Partial<CreateGeneralOrderRequest>) => void;

  selectedCoupon: { couponId: number; discountAmount: number } | null;
  setSelectedCoupon: (
    coupon: { couponId: number; discountAmount: number } | null
  ) => void;
  updateAppliedCoupon: (
    itemId: number | null,
    couponId: number,
    discountAmount: number
  ) => void;
  cancelAppliedCoupon: (itemId: number | null) => void;
  getAppliedCouponDiscount: (itemId: number) => number | undefined;
  isAppliedCoupon: (couponId: number) => boolean;
  setOrderItemDtoList: (orderItemDtoList: OrderItemDto[]) => void;
  setDeliveryDto: (deliveryDto: DeliveryDto) => void;
  setPaymentMethod: (paymentMethod: PaymentMethod) => void;
  setAgreePrivacy: (agree: boolean) => void;
}

export const useOrderStore = create<OrderState>((set, get) => ({
  generalOrderBody: generalOrderBody,
  updateGeneralOrderBody: (updates) =>
    set((state) => ({
      generalOrderBody: {
        ...state.generalOrderBody,
        ...updates,
      },
    })),

  selectedCoupon: null,
  setSelectedCoupon: (coupon) =>
    set(() => ({
      selectedCoupon: coupon,
    })),
  updateAppliedCoupon: (itemId, couponId, discountAmount) =>
    set((state) => {
      const updatedItems = state.generalOrderBody.orderItemDtoList.map((item) =>
        item.itemId === itemId
          ? {
              ...item,
              memberCouponId: couponId,
              discountAmount,
            }
          : item
      );
      return {
        generalOrderBody: {
          ...state.generalOrderBody,
          orderItemDtoList: updatedItems,
        },
      };
    }),
  cancelAppliedCoupon: (itemId) =>
    set((state) => {
      const updatedItems = state.generalOrderBody.orderItemDtoList.map((item) =>
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
    }),
  getAppliedCouponDiscount: (itemId) => {
    const orderItem = get().generalOrderBody.orderItemDtoList.find(
      (item) => item.itemId === itemId
    );
    return orderItem?.discountAmount;
  },

  isAppliedCoupon: (couponId) => {
    const appliedItem = get().generalOrderBody.orderItemDtoList.find(
      (item) => item.memberCouponId === couponId
    );
    return !!appliedItem;
  },
  setOrderItemDtoList: (orderItemDtoList) =>
    set((state) => ({
      generalOrderBody: {
        ...state.generalOrderBody,
        orderItemDtoList,
      },
    })),
  setDeliveryDto: (deliveryDto) =>
    set((state) => ({
      generalOrderBody: {
        ...state.generalOrderBody,
        deliveryDto,
      },
    })),
  setPaymentMethod: (paymentMethod) =>
    set((state) => ({
      generalOrderBody: {
        ...state.generalOrderBody,
        paymentMethod,
      },
    })),
  setAgreePrivacy: (agree) =>
    set((state) => ({
      generalOrderBody: {
        ...state.generalOrderBody,
        agreePrivacy: agree,
      },
    })),
}));
