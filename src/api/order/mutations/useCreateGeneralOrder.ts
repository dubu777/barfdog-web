import { useMutation } from "@tanstack/react-query";
import { UseMutationCustomOptions } from "@/types";
import { createGeneralOrderSheet } from "../order";


export function useCreateGeneralOrder(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: createGeneralOrderSheet,
    ...mutationOptions,
  })
}