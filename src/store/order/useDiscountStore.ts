import { create } from "zustand";

interface DiscountState {
  maxAvailableDiscount: number;
  discountTotal: number;
  discountCoupon: number;
  deliveryPrice: number;
  paymentPrice: number;
  discountPlan: number;

  setMaxAvailableDiscount: (amount: number) => void;
  setDiscountTotal: (amount: number) => void;
  setDiscountCoupon: (amount: number) => void;
  setDeliveryPrice: (amount: number) => void;
  setPaymentPrice: (amount: number) => void;
  setDiscountPlan: (amount: number) => void;
}

export const useDiscountStore = create<DiscountState>((set) => ({
  maxAvailableDiscount: 0,
  discountTotal: 0,
  discountCoupon: 0,
  deliveryPrice: 0,
  paymentPrice: 0,
  discountPlan: 0,

  setMaxAvailableDiscount: (amount) => set({maxAvailableDiscount: Number(amount)}),
  setDiscountTotal: (amount) => set({ discountTotal: Number(amount) }),
  setDiscountCoupon: (amount) => set({ discountCoupon: Number(amount) }),
  setDeliveryPrice: (amount) => set({ deliveryPrice: Number(amount) }),
  setPaymentPrice: (amount) => set({ paymentPrice: Number(amount) }),
  setDiscountPlan: (amount) => set({ discountPlan: Number(amount) }),
}));
