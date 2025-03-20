import { create } from "zustand";

interface CouponState {
  appliedCoupon: { couponId: number; discountAmount: number } | null;
  setAppliedCoupon: (couponId: number, discountAmount: number) => void;
  cancelAppliedCoupon: () => void;
}

export const useCouponStore = create<CouponState>((set) => ({
  appliedCoupon: null,
  setAppliedCoupon: (couponId, discountAmount) =>
    set({ appliedCoupon: { couponId, discountAmount } }),
  cancelAppliedCoupon: () => set({ appliedCoupon: null }),
}));
