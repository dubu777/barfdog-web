import { create } from "zustand";

interface CouponState {
  selectedCoupon: { couponId: number; discountAmount: number } | null;
  setSelectedCoupon: (
    coupon: { couponId: number; discountAmount: number } | null
  ) => void;
  updateSelectedCoupon: (couponId: number, discountAmount: number) => void;
  cancelAppliedCoupon: () => void;
}

export const useCouponStore = create<CouponState>((set) => ({
  selectedCoupon: null,

  setSelectedCoupon: (coupon) => set({ selectedCoupon: coupon }),

  updateSelectedCoupon: (couponId, discountAmount) =>
    set((state) => {
      const isAlreadySelected = state.selectedCoupon?.couponId === couponId;
      return {
        selectedCoupon: isAlreadySelected
          ? null
          : { couponId, discountAmount },
      };
    }),
  cancelAppliedCoupon: () => set({ selectedCoupon: null }),
}));
