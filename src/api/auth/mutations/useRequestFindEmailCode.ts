import { UseMutationCustomOptions } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { requestFindEmailCode } from "@/api/auth/auth";

export function useRequestFindEmailCode(
  mutationOptions?: UseMutationCustomOptions
) {
  return useMutation({
    mutationFn: requestFindEmailCode,
    ...mutationOptions,
  });
}
