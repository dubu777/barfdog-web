import { useMutation } from "@tanstack/react-query";
import { UseMutationCustomOptions } from "@/types";
import { saveSubscriptionOrder } from "../order";


export function useSaveSubscriptionOrder(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: saveSubscriptionOrder,
    ...mutationOptions,
  })
}