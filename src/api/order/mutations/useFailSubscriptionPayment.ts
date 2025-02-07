import { useMutation } from "@tanstack/react-query";
import { UseMutationCustomOptions } from "@/types";
import { failSubscriptionPayment } from "../order";


export function useFailSubscriptionPayment(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: failSubscriptionPayment,
    ...mutationOptions,
  })
}