"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AUTH_CONFIG } from "@/constants/auth";
import { queryKeys } from "@/constants";
import { setCookie } from "@/utils/auth/cookie";
import { useToastStore } from "@/store/useToastStore";
import { useRouter } from "next/navigation";
import { SnsProvider } from "@/types";
import { oauthCallbackLogin } from "../auth";
import { buildOAuthAlertConfig } from "@/config/buildOAuthAlertConfig";
import { useAlertModalStore } from "@/store/useAlertModalStore";

type Vars = {
  provider: SnsProvider;
  code: string;
  state?: string;
  next?: string;
};

export function useOAuthCallbackLogin() {
  const router = useRouter();
  const addToast = useToastStore((state) => state.addToast);
  const { open, close } = useAlertModalStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ provider, code, state }: Vars) =>
      oauthCallbackLogin(provider, code, state),

    onSuccess: async (data, vars) => {
      const { response, token } = data;

      // 1) 토큰 쿠키 저장
      if (token) setCookie(AUTH_CONFIG.ACCESS_TOKEN_COOKIE, token);

      // 3) 사용자 캐시 무효화
      await queryClient.invalidateQueries({
        queryKey: [queryKeys.AUTH.BASE, queryKeys.AUTH.GET_USER_INFO],
      });
      // 4) 분기(next 우선) - result 에 따른 Alert Modal or 리다이렉트 처리
      const next = vars.next ?? "/";
      const config = buildOAuthAlertConfig(response, next);

      // Alert Modal이 필요한 경우
      if (config) {
        const { route, title, content, confirmText } = config;
        router.replace(route);

        open({
          title,
          content,
          confirmText,
          closeOnBackgroundClick: false,
          onConfirm: () => {
            close();
          },
        });
        return;
      }

      // Alert Modal 없는 경우
      if (response.success) {
        router.replace(next);
        return;
      }

      router.replace("/login");
    },

    onError: (err: any) => {
      console.error(err);
      const msg = "SNS 로그인에 실패했습니다";
      addToast(msg);
      router.replace("/login");
    },
  });
}
