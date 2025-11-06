import { UseMutationCustomOptions } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { resetPassword } from "@/api/auth/auth";

export function useResetPassword(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: resetPassword,
    ...mutationOptions,
  });
}
