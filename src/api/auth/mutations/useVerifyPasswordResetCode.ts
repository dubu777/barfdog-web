import { UseMutationCustomOptions } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { verifyPasswordResetCode } from "../auth";

export function useVerifyPasswordResetCode(
  mutationOptions?: UseMutationCustomOptions
) {
  return useMutation({
    mutationFn: verifyPasswordResetCode,
    ...mutationOptions,
  });
}
