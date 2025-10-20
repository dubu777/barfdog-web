import { useMutation } from "@tanstack/react-query";
import { UseMutationCustomOptions } from "@/types";
import { logout } from "../auth";

export function useLogout(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: logout,
    ...mutationOptions,
  });
}
