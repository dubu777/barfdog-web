import { generalOrderBody } from "@/constants";
import { CreateGeneralOrderRequest, DeliveryDto, OrderItemDto, PaymentMethod } from "@/types";
import { create } from "zustand";

interface OrderState {
  generalOrderBody: CreateGeneralOrderRequest;
  updateGeneralOrderBody: (updates: Partial<CreateGeneralOrderRequest>) => void;
  
  updateAppliedCoupon: (
    itemId: number | null,
    couponId: number,
    discountAmount: number
  ) => void;
  getAppliedCouponDiscount: (itemId: number) => number | undefined;
  setOrderItemDtoList: (orderItemDtoList: OrderItemDto[]) => void;
  setDeliveryDto: (deliveryDto: DeliveryDto) => void;
  setPaymentMethod: (paymentMethod: PaymentMethod) => void;
  setAgreePrivacy: (agree: boolean) => void;
}

export const useOrderStore = create<OrderState>((set, get) => ({
  generalOrderBody: generalOrderBody,

  // 기본 업데이트 함수
  updateGeneralOrderBody: (updates) =>
    set((state) => ({
      generalOrderBody: {
        ...state.generalOrderBody,
        ...updates,
      },
    })),


  updateAppliedCoupon: (itemId, couponId, discountAmount) =>
    set((state) => ({
      generalOrderBody: {
        ...state.generalOrderBody,
        orderItemDtoList: state.generalOrderBody.orderItemDtoList.map((item) =>
          item.itemId === itemId
            ? {
                ...item,
                memberCouponId: couponId,
                discountAmount,
              }
            : item
        ),
      },
    })),

    getAppliedCouponDiscount: (itemId) => {
      const orderItem = get().generalOrderBody.orderItemDtoList.find(
        (item) => item.itemId === itemId
      );
      return orderItem?.discountAmount;
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
