import { UseMutationCustomOptions } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { verifyFindEmailCode } from "@/api/auth/auth";

export function useVerifyFindEmailCode(
  mutationOptions?: UseMutationCustomOptions
) {
  return useMutation({
    mutationFn: verifyFindEmailCode,
    ...mutationOptions,
  });
}
