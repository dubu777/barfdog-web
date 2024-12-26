import { useMutation } from "@tanstack/react-query";
import { UseMutationCustomOptions } from "@/types";
import { createGeneralOrder } from "../order";


export function useCreateGeneralOrder(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: createGeneralOrder,
    ...mutationOptions,
  })
}