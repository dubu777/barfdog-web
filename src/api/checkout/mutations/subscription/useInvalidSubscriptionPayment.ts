import { useMutation } from "@tanstack/react-query";
import { UseMutationCustomOptions } from "@/types";
import { invalidSuccessSubscriptionPayment } from "../../checkout";

export function useInvalidSubscriptionPayment(
  mutationOptions?: UseMutationCustomOptions
) {
  return useMutation({
    mutationFn: invalidSuccessSubscriptionPayment,
    ...mutationOptions,
  });
}
