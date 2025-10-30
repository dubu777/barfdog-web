import { useMutation } from "@tanstack/react-query";
import { createCoupon } from "@/api/coupon/coupon";
import { CouponCategory, UseMutationCustomOptions } from "@/types";

export function useCreateCoupon(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: ({ 
      code, 
      couponCategory 
    }: { 
      code: string, 
      couponCategory: CouponCategory 
    }) => createCoupon(code, couponCategory),
    ...mutationOptions,
  })
}