import { useMutation } from "@tanstack/react-query";
import { createCoupon } from "@/api/mypage/coupon/coupon";
import { UseMutationCustomOptions } from "@/types";
import { CouponCategory } from "@/types/mypage/coupon";

export function useCreateCoupon(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: ({ code, couponCategory }: { code: string, couponCategory: CouponCategory }) => createCoupon(code, couponCategory),
    ...mutationOptions,
  })
}