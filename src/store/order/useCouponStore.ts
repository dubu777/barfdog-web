import { create } from "zustand";

interface CouponState {
  appliedCoupon: { couponId: number; discountAmount: number } | null;
  selectedCoupon: { couponId: number; discountAmount: number } | null;
  setAppliedCoupon: (coupon: { couponId: number; discountAmount: number } | null) => void;
  setSelectedCoupon: (coupon: { couponId: number; discountAmount: number } | null) => void;
  cancelAppliedCoupon: () => void;
}

export const useCouponStore = create<CouponState>((set) => ({
  appliedCoupon: null,
  selectedCoupon: null,
  setAppliedCoupon: (coupon) => set({ appliedCoupon: coupon }),
  setSelectedCoupon: (coupon) => set({ selectedCoupon: coupon }),
  cancelAppliedCoupon: () => set({ appliedCoupon: null }),
}));