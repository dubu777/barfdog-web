import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UseMutationCustomOptions } from "@/types";
import { logout } from "../auth";
import { deleteCookie } from "@/utils/auth/cookie";
import { AUTH_CONFIG } from "@/constants/auth";
import { useRouter } from "next/navigation";
import {
  isReactNativeWebView,
  notifyLogoutToNative,
} from "@/utils/webview/webview";

export function useLogout(mutationOptions?: UseMutationCustomOptions) {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      // 1. 쿠키 삭제
      deleteCookie(AUTH_CONFIG.ACCESS_TOKEN_COOKIE);
      deleteCookie(AUTH_CONFIG.REFRESH_TOKEN_COOKIE);

      // 2. React Query 캐시 정리
      queryClient.clear();

      // 3. 환경별 리다이렉트
      if (isReactNativeWebView()) {
        notifyLogoutToNative();
        // Native가 리다이렉트 처리
      } else {
        router.push("/");
        router.refresh();
      }
    },
    onError: (error) => {
      console.error("로그아웃 실패:", error);
    },
    ...mutationOptions,
  });
}
