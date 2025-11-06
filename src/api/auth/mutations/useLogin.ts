import { UseMutationCustomOptions } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login } from "@/api/auth/auth";

import { queryKeys } from "@/constants";
import { setCookie } from "@/utils/auth/cookie";
import { AUTH_CONFIG } from "@/constants/auth";

export function useLogin(mutationOptions?: UseMutationCustomOptions) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: login,
    onSuccess: async (res: any) => {
      const token = res?.headers?.authorization;

      if (token) {
        setCookie(AUTH_CONFIG.ACCESS_TOKEN_COOKIE, token);
      }
      await queryClient.invalidateQueries({
        queryKey: [queryKeys.AUTH.BASE, queryKeys.AUTH.GET_USER_INFO],
      });
    },
    ...mutationOptions,
  });
}
