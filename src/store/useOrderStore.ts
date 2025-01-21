import {
  initialDeliveryDto,
  initialGeneralOrderBody,
  initialSubscriptionOrderBody,
} from "@/config/orderInitialValues";
import { ORDER_TYPE } from "@/constants";
import {
  CreateGeneralOrderRequest,
  CreateSubscriptionOrderRequest,
  DeliveryDto,
  OrderType,
  PaymentMethod,
} from "@/types";
import { create } from "zustand";

interface OrderState {
  generalOrderBody: CreateGeneralOrderRequest;
  subscriptionOrderBody: CreateSubscriptionOrderRequest;
  selectedCoupon: { couponId: number; discountAmount: number } | null;
  deliveryDto: DeliveryDto;
  paymentMethod: PaymentMethod;
  isBundleDelivery: boolean;
  packageMonth: number | null;
  deliveryId: number | null;
  userTotalReward: number;
  appliedReward: number;
  maxAvailableDiscount: number;
  maxAvailableReward: number;
  discountTotal: number;
  discountCoupon: number;
  deliveryPrice: number;
  paymentPrice: number;
  setMaxAvailableReward: (amount: number) => void;
  setPaymentPrice: (amount: number) => void;
  setDiscountTotal: (amount: number) => void;
  setDiscountCoupon: (amount: number) => void;
  setDeliveryPrice: (amount: number) => void;

  setMaxAvailableDiscount: (reward: number) => void;
  setUserTotalReward: (reward: number) => void;
  setAppliedReward: (reward: number) => void;
  getDeliveryId: () => void;
  setDeliveryId: (deliveryId: number | null) => void;
  updateOrderBody: (
    updates: Partial<
      CreateGeneralOrderRequest | CreateSubscriptionOrderRequest
    >,
    orderType: OrderType
  ) => void;
  getRequestBody: (
    orderType: OrderType
  ) => CreateGeneralOrderRequest | CreateSubscriptionOrderRequest;
  setSelectedCoupon: (
    coupon: { couponId: number; discountAmount: number } | null
  ) => void;
  updateAppliedCoupon: (
    type: OrderType,
    itemId: number | null,
    itemPrice: number,
    couponId: number,
    discountAmount: number
  ) => void;
  updateSelectedCoupon: (couponId: number, discountAmount: number) => void;
  cancelAppliedCoupon: (type: OrderType, itemId: number | null) => void;
  getAppliedCouponDiscount: (itemId: number) => number | undefined;
  isAppliedCoupon: (couponId: number) => boolean;

  setDeliveryDto: (delivery: DeliveryDto) => void;
  setPaymentMethod: (method: PaymentMethod) => void;
  isDefaultAddress: (deliveryId: number) => boolean;

  setIsBundleDelivery: (isBundleDelivery: boolean) => void;

  setPackageMonth: (month: number | null) => void;
}

export const useOrderStore = create<OrderState>((set, get) => ({
  generalOrderBody: initialGeneralOrderBody,
  subscriptionOrderBody: initialSubscriptionOrderBody,
  selectedCoupon: null,
  isBundleDelivery: false,
  packageMonth: null,
  deliveryDto: initialDeliveryDto,
  paymentMethod: "NAVER_PAY",
  deliveryId: null,
  userTotalReward: 0,
  appliedReward: 0,
  maxAvailableDiscount: 0,
  maxAvailableReward: 0,
  discountTotal: 0,
  discountCoupon: 0,
  deliveryPrice: 0,
  paymentPrice: 0,
  setMaxAvailableReward: (amount) =>
    set(() => ({
      maxAvailableReward: Number(amount),
    })),
  setPaymentPrice: (amount) =>
    set(() => ({
      paymentPrice: Number(amount),
    })),
  setDiscountTotal: (amount) =>
    set(() => ({
      discountTotal: Number(amount),
    })),
  setDiscountCoupon: (amount) =>
    set(() => ({
      discountCoupon: Number(amount),
    })),
  setDeliveryPrice: (amount) =>
    set(() => ({
      deliveryPrice: Number(amount),
    })),

  setMaxAvailableDiscount: (reward) =>
    set(() => ({
      maxAvailableDiscount: Number(reward),
    })),
  setUserTotalReward: (reward) =>
    set(() => ({
      userTotalReward: Number(reward),
    })),
  setAppliedReward: (reward) =>
    set(() => ({
      appliedReward: Number(reward),
    })),
  setDeliveryId: (deliveryId) =>
    set(() => ({
      deliveryId,
    })),
  // generalOrderBody, subscriptionOrderBody 업데이트
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
  getRequestBody: (orderType: OrderType) => {
    const {
      generalOrderBody,
      subscriptionOrderBody,
      paymentMethod,
      deliveryId,
      deliveryDto,
      deliveryPrice,
      discountCoupon,
      discountTotal,
      appliedReward,
      paymentPrice,
    } = get();

    const commonBody = {
      deliveryDto,
      paymentMethod,
      deliveryPrice,
      discountTotal,
      discountCoupon,
      discountReward: appliedReward,
      paymentPrice,
    };

    if (orderType === ORDER_TYPE.GENERAL) {
      return {
        ...generalOrderBody,
        ...commonBody,
        deliveryId,
      } as CreateGeneralOrderRequest;
    }

    return {
      ...subscriptionOrderBody,
      ...commonBody,
    } as CreateSubscriptionOrderRequest;
  },
  setDeliveryDto: (delivery) => set(() => ({ deliveryDto: delivery })),
  setPaymentMethod: (method) => set(() => ({ paymentMethod: method })),
  getDeliveryId: () => {
    const isBundle = get().isBundleDelivery;
    if (isBundle) {
      return get().generalOrderBody.deliveryId;
    }
    return null;
  },
  // 쿠폰 관련 상태
  setSelectedCoupon: (coupon) =>
    set(() => ({
      selectedCoupon: coupon,
    })),
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

  setIsBundleDelivery: (isBundleDelivery) =>
    set(() => ({
      isBundleDelivery,
    })),

  // 기본 배송지 확인 - 추후에 defaultAddress에 Id가 추가되면 수정 필요
  isDefaultAddress: (deliveryId) => {
    return get().generalOrderBody.deliveryId === deliveryId;
  },

  setPackageMonth: (month) =>
    set(() => ({
      packageMonth: month,
    })),
}));
