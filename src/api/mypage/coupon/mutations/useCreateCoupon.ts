import { useMutation } from "@tanstack/react-query";
import { createCoupon } from "@/api/mypage/coupon/coupon";
import { UseMutationCustomOptions } from "@/types";

export function useCreateCoupon(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: ({ code }: { code: string }) => createCoupon(code),
    ...mutationOptions,
  })
}