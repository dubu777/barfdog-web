import { UseMutationCustomOptions } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { requestPasswordResetCode } from "@/api/auth/auth";

export function useRequestPasswordResetCode(
  mutationOptions?: UseMutationCustomOptions
) {
  return useMutation({
    mutationFn: requestPasswordResetCode,
    ...mutationOptions,
  });
}
