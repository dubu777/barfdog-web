"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AUTH_CONFIG } from "@/constants/auth";
import { queryKeys } from "@/constants";
import { setCookie } from "@/utils/auth/cookie";
import { useAuthStore } from "@/store/useAuthStore";
import { useToastStore } from "@/store/useToastStore";
import { useRouter } from "next/navigation";
import { SnsProvider } from "@/types";
import { oauthCallbackLogin } from "../auth";

type Vars = {
  provider: SnsProvider;
  code: string;
  state?: string;
  next?: string;
};

export function useOAuthCallbackLogin() {
  const router = useRouter();
  const { setLoginUserInfo } = useAuthStore();
  const { addToast } = useToastStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ provider, code, state }: Vars) =>
      oauthCallbackLogin(provider, code, state),

    onSuccess: async (data, vars) => {
      // 1) 토큰 쿠키 저장(기존 패턴 유지: 클라에서 읽음)
      if (data.token) setCookie(AUTH_CONFIG.ACCESS_TOKEN_COOKIE, data.token);

      // 2) 전역 스토어 저장
      setLoginUserInfo(data);

      // 3) 사용자 캐시 무효화
      await queryClient.invalidateQueries({
        queryKey: [queryKeys.AUTH.BASE, queryKeys.AUTH.GET_USER_INFO],
      });

      // 4) 분기(next 우선)
      const next = vars.next ?? "/";
      console.log(data, "social login success");

      switch (data.userType) {
        case "NON_MEMBER":
          router.push(next);
          break;

        case "MEMBER":
          router.push(`/connect-sns?providerId=${data.providerId}`);
          break;

        case "MEMBER_WITH_SMS_KAKAO":
          if (vars.provider === "naver") {
            alert(
              "카카오 간편로그인이 연동된 계정입니다. 카카오로 로그인해주세요."
            );
            router.push("/login");
          } else {
            router.push(next);
          }
          break;

        case "MEMBER_WITH_SMS_NAVER":
          if (vars.provider === "kakao") {
            alert(
              "네이버 간편로그인이 연동된 계정입니다. 네이버로 로그인해주세요."
            );
            router.push("/login");
          } else {
            router.push(next);
          }
          break;

        default:
          router.push(next);
      }
    },

    onError: (err: any) => {
      console.error(err);
      const msg = err?.message ?? "SNS 로그인 요청 중 오류 발생";
      addToast(msg);
      router.replace("/login");
    },
  });
}
