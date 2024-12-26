import { PaymentMethod } from '@/constants/payment';
import { PaymentMethodType } from '@/types/payment';
import { create } from 'zustand';

interface PaymentStore {
  paymentMethod: PaymentMethodType;
  setPaymentMethod: (method: PaymentMethodType) => void; 
}

export const usePaymentStore = create<PaymentStore>((set, get) => ({
  paymentMethod: "naverpay",
  setPaymentMethod: (method) => set({ paymentMethod: method }),
}));
