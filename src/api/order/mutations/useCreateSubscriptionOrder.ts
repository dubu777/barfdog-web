import { useMutation } from "@tanstack/react-query";
import { UseMutationCustomOptions } from "@/types";
import { createSubscriptionOrder } from "../order";


export function useCreateSubscriptionOrder(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: createSubscriptionOrder,
    ...mutationOptions,
  })
}