import { generalOrderBody, ORDER_TYPE, subscriptionOrderBody } from "@/constants";
import {
  CreateGeneralOrderRequest,
  CreateSubscriptionOrderRequest,
  DeliveryDto,
  OrderItemDto,
  OrderType,
  PaymentMethod,
} from "@/types";
import { create } from "zustand";

interface OrderState {
  generalOrderBody: CreateGeneralOrderRequest;
  subscriptionOrderBody: CreateSubscriptionOrderRequest;
  updateOrderBody: (
    updates: Partial<CreateGeneralOrderRequest | CreateSubscriptionOrderRequest>,
    orderType: OrderType
  ) => void;

  selectedCoupon: { couponId: number; discountAmount: number } | null;
  setSelectedCoupon: (
    coupon: { couponId: number; discountAmount: number } | null
  ) => void;
  updateAppliedCoupon: (
    type: OrderType,
    itemId: number | null,
    couponId: number,
    discountAmount: number
  ) => void;
  updateSelectedCoupon: (
    couponId: number,
    discountAmount: number,
  )  => void;
  cancelAppliedCoupon: (type: OrderType, itemId: number | null) => void;
  getAppliedCouponDiscount: (itemId: number) => number | undefined;
  isAppliedCoupon: (couponId: number) => boolean;
  setOrderItemDtoList: (orderItemDtoList: OrderItemDto[]) => void;
  setDeliveryDto: (deliveryDto: DeliveryDto) => void;
  isDefaultAddress: (deliveryId: number) => boolean;

  isBundleDelivery: boolean;
  setIsBundleDelivery: (isBundleDelivery: boolean) => void;
  packageMonth: number | null;
  setPackageMonth: (month: number | null) => void;
  setPaymentMethod: (paymentMethod: PaymentMethod) => void;
  setAgreePrivacy: (agree: boolean) => void;
}

export const useOrderStore = create<OrderState>((set, get) => ({
  generalOrderBody,
  subscriptionOrderBody,

  updateOrderBody: (updates, orderType) => {
    set((state) => {
      if (orderType === ORDER_TYPE.GENERAL) {
        return {
          generalOrderBody: {
            ...state.generalOrderBody,
            ...updates,
          },
        };
      } else if (orderType === ORDER_TYPE.SUBSCRIPTION) {
        return {
          subscriptionOrderBody: {
            ...state.subscriptionOrderBody,
            ...updates,
          },
        };
      }
      return state; // 기본적으로 상태를 반환
    });
  },
  // 쿠폰 관련 상태
  selectedCoupon: null,
  setSelectedCoupon: (coupon) =>
    set(() => ({
      selectedCoupon: coupon,
    })),
  // 쿠폰 적용
  // 쿠폰 적용
  updateAppliedCoupon: (type, itemId, couponId, discountAmount) =>
    set((state) => {
      if (type === ORDER_TYPE.GENERAL) {
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
    updateSelectedCoupon: (couponId, discountAmount) =>
      set((state) => {
        const isCouponSelected = state.selectedCoupon?.couponId === couponId;
    
        return {
          selectedCoupon: isCouponSelected ? null : { couponId, discountAmount },
        };
      }),
  // 쿠폰 취소
  cancelAppliedCoupon: (type, itemId) =>
    set((state) => {
      if (type === ORDER_TYPE.GENERAL) {
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

  isBundleDelivery: false,
  setIsBundleDelivery: (isBundleDelivery) =>
    set(() => ({
      isBundleDelivery,
    })),
  // 배송지 관련 상태
  setDeliveryDto: (deliveryDto) =>
    set((state) => ({
      generalOrderBody: {
        ...state.generalOrderBody,
        deliveryDto,
      },
    })),
    // 기본 배송지 확인 - 추후에 defaultAddress에 Id가 추가되면 수정 필요
    isDefaultAddress: (deliveryId) => {
    return get().generalOrderBody.deliveryId === deliveryId;
  },

  packageMonth: null,
  setPackageMonth: (month) => 
    set(() => ({
      packageMonth: month,
    })),
  setOrderItemDtoList: (orderItemDtoList) =>
    set((state) => ({
      generalOrderBody: {
        ...state.generalOrderBody,
        orderItemDtoList,
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
