import { create } from "zustand";

interface DiscountState {
  maxAvailableReward: number;
  maxAvailableDiscount: number;
  discountTotal: number;
  discountCoupon: number;
  deliveryPrice: number;
  paymentPrice: number;

  setMaxAvailableDiscount: (reward: number) => void;
  setDiscountTotal: (amount: number) => void;
  setDiscountCoupon: (amount: number) => void;
  setDeliveryPrice: (amount: number) => void;
  setPaymentPrice: (amount: number) => void;
}

export const useDiscountStore = create<DiscountState>((set) => ({
  maxAvailableReward: 0,
  maxAvailableDiscount: 0,
  discountTotal: 0,
  discountCoupon: 0,
  deliveryPrice: 0,
  paymentPrice: 0,

  setMaxAvailableDiscount: (reward) => set({maxAvailableDiscount: Number(reward)}),
  setDiscountTotal: (amount) => set({ discountTotal: Number(amount) }),
  setDiscountCoupon: (amount) => set({ discountCoupon: Number(amount) }),
  setDeliveryPrice: (amount) => set({ deliveryPrice: Number(amount) }),
  setPaymentPrice: (amount) => set({ paymentPrice: Number(amount) }),
}));
