import { useMutation } from "@tanstack/react-query";
import { UseMutationCustomOptions } from "@/types";
import { ApplyNextPaymentCouponProps } from "@/types/mypage/subscription";
import { cancelAppliedNextPaymentCoupon } from "../subscription";

export function useCancelAppliedNextPaymentCoupon(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: ({ 
      subscribeId, 
      body 
    }: { 
      subscribeId: number, 
      body: ApplyNextPaymentCouponProps
    }) => cancelAppliedNextPaymentCoupon(subscribeId, body),
    ...mutationOptions,
  })
}