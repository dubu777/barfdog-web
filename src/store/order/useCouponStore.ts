import { create } from "zustand";

interface CouponState {
  appliedCoupon: { couponId: number; discountAmount: number } | null;
  selectedCoupon: { couponId: number; discountAmount: number } | null;
  maxAvailableCouponDiscount: number;
  setAppliedCoupon: (coupon: { couponId: number; discountAmount: number } | null) => void;
  setSelectedCoupon: (coupon: { couponId: number; discountAmount: number } | null) => void;
  cancelAppliedCoupon: () => void;
  setMaxAvailableCouponDiscount: (amount: number) => void;
}

export const useCouponStore = create<CouponState>((set) => ({
  appliedCoupon: null,
  selectedCoupon: null,
  maxAvailableCouponDiscount: 0,
  setAppliedCoupon: (coupon) => set({ appliedCoupon: coupon }),
  setSelectedCoupon: (coupon) => set({ selectedCoupon: coupon }),
  cancelAppliedCoupon: () => set({ appliedCoupon: null }),
  setMaxAvailableCouponDiscount: (amount) => set({maxAvailableCouponDiscount: amount})
}));