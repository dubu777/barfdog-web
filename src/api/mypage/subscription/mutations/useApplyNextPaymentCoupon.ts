import { useMutation } from "@tanstack/react-query";
import { UseMutationCustomOptions } from "@/types";
import { ApplyNextPaymentCouponProps } from "@/types/mypage/subscription";
import { applyNextPaymentCoupon } from "../subscription";

export function useApplyNextPaymentCoupon(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: ({ 
      subscribeId, 
      body 
    }: { 
      subscribeId: number, 
      body: ApplyNextPaymentCouponProps
    }) => applyNextPaymentCoupon(subscribeId, body),
    ...mutationOptions,
  })
}