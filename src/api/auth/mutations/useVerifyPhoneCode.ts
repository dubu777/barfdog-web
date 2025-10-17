import { UseMutationCustomOptions } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { verifyPhoneCode } from "@/api/auth/auth";

export function useVerifyPhoneCode(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: verifyPhoneCode,
    ...mutationOptions,
  });
}
