import { useMutation } from "@tanstack/react-query";
import { UseMutationCustomOptions } from "@/types";
import { successSubscriptionPayment } from "../order";


export function useSuccessSubscriptionPayment(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: successSubscriptionPayment,
    ...mutationOptions,
  })
}