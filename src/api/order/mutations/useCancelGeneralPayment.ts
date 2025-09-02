import { useMutation } from "@tanstack/react-query";
import { UseMutationCustomOptions } from "@/types";
import { cancelGeneralPayment } from "../order";

export function useCancelGeneralPayment(
  mutationOptions?: UseMutationCustomOptions
) {
  return useMutation({
    mutationFn: cancelGeneralPayment,
    ...mutationOptions,
  });
}
