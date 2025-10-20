import { create } from "zustand";
import { persist } from "zustand/middleware";
import { PaymentItem } from "@/types/mypage/subscription";

const initialState = {
  paymentMethodDetail: null,
};


interface MypageStore {
  paymentMethodDetail: PaymentItem | null;
  setPaymentMethodDetail: (paymentMethodDetail: PaymentItem) => void;
  reset: () => void;
}

export const usePersistMypageStore = create(
  persist<MypageStore>(
    (set) => ({
      ...initialState,
      setPaymentMethodDetail: (paymentMethodDetail) => set((state) => ({ ...state, paymentMethodDetail })),
      reset: () => {
        set(initialState);
      }
    }),
    {
      name: 'mypage',
    }
  )
);