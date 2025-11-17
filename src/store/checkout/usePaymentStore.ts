import { PaymentMethod } from "@/types";
import { create } from "zustand";

interface PaymentStore {
  paymentMethod: PaymentMethod;
  discountTotal: number;
  paymentPrice: number;
  discountPlan: number;
  deliveryPrice: number;
  finalPrice: number;
  originalPrice: number;
  discountGrade: number;
  orderId: number | null;
  overDiscount: number;

  setPaymentMethod: (method: PaymentMethod) => void;
  setDiscountTotal: (amount: number) => void;
  setDeliveryPrice: (amount: number) => void;
  setPaymentPrice: (amount: number) => void;
  setDiscountPlan: (amount: number) => void;
  setFinalPrice: (amount: number) => void;
  setOriginalPrice: (amount: number) => void;
  setDiscountGrade: (amount: number) => void;
  setOrderId: (id: number) => void;
  setOverDiscount: (amount: number) => void;
}

export const usePaymentStore = create<PaymentStore>((set) => ({
  paymentMethod: "NAVER_PAY",
  discountTotal: 0,
  discountPlan: 0,
  paymentPrice: 0,
  deliveryPrice: 0,
  finalPrice: 0,
  originalPrice: 0,
  discountGrade: 0,
  overDiscount: 0,
  orderId: null,

  setPaymentMethod: (method) => set({ paymentMethod: method }),
  setDiscountTotal: (amount) => set({ discountTotal: Number(amount) }),
  setDeliveryPrice: (amount) => set({ deliveryPrice: Number(amount) }),
  setPaymentPrice: (amount) => set({ paymentPrice: Number(amount) }),
  setDiscountPlan: (amount) => set({ discountPlan: Number(amount) }),
  setFinalPrice: (amount) => set({ finalPrice: Number(amount) }),
  setOriginalPrice: (amount) => set({ originalPrice: Number(amount) }),
  setDiscountGrade: (amount) => set({ discountGrade: Number(amount) }),
  setOverDiscount: (amount) => set({ overDiscount: Number(amount) }),
  setOrderId: (id) => set({ orderId: id }),
}));
