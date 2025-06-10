import { useMutation } from "@tanstack/react-query";
import { UseMutationCustomOptions } from "@/types";
import { failGeneralPayment } from "../order";


export function useFailGeneralPayment(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: failGeneralPayment,
    ...mutationOptions,
  })
}