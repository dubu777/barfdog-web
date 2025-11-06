import { useMutation } from "@tanstack/react-query";
import { UseMutationCustomOptions } from "@/types";
import { signup } from "../auth";

export function useSignup(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: signup,
    ...mutationOptions,
  });
}
