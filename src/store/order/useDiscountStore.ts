import { create } from "zustand";

interface DiscountState {
  discountTotal: number;
  deliveryPrice: number;
  paymentPrice: number;
  discountPlan: number;

  setDiscountTotal: (amount: number) => void;
  setDeliveryPrice: (amount: number) => void;
  setPaymentPrice: (amount: number) => void;
  setDiscountPlan: (amount: number) => void;
}

export const useDiscountStore = create<DiscountState>((set) => ({
  discountTotal: 0,
  deliveryPrice: 0,
  paymentPrice: 0,
  discountPlan: 0,

  setDiscountTotal: (amount) => set({ discountTotal: Number(amount) }),
  setDeliveryPrice: (amount) => set({ deliveryPrice: Number(amount) }),
  setPaymentPrice: (amount) => set({ paymentPrice: Number(amount) }),
  setDiscountPlan: (amount) => set({ discountPlan: Number(amount) }),
}));
