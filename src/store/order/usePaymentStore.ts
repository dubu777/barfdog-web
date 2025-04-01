import { PaymentMethod } from '@/types';
import { create } from 'zustand';

interface PaymentStore {
  paymentMethod: PaymentMethod;
  setPaymentMethod: (method: PaymentMethod) => void; 
}

export const usePaymentStore = create<PaymentStore>((set) => ({
  paymentMethod: "NAVER_PAY",
  setPaymentMethod: (method) => set({ paymentMethod: method }),
}));
