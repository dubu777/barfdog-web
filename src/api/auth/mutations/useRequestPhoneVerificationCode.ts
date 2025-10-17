import { UseMutationCustomOptions } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { requestPhoneVerificationCode } from "../auth";

export function useRequestPhoneVerificationCode(
  mutationOptions?: UseMutationCustomOptions
) {
  return useMutation({
    mutationFn: requestPhoneVerificationCode,
    ...mutationOptions,
  });
}
