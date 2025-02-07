import { useMutation } from "@tanstack/react-query";
import { UseMutationCustomOptions } from "@/types";
import { createIamportSubscriptionPayment } from "../iamport";



export function useCreateIamportSubscriptionPayment(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: createIamportSubscriptionPayment,
    ...mutationOptions,
  })
}