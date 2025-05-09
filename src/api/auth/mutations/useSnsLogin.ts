import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UseMutationCustomOptions } from "@/types";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import { setCookie } from "@/utils/auth/cookie";
import { AUTH_CONFIG } from "@/constants/auth";
import { snsLogin } from "../auth";
import { queryKeys } from "@/constants";

export function useSnsLogin(
  mutationOptions?: UseMutationCustomOptions
) {
  const router = useRouter();
  const { setLoginUserInfo } = useAuthStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: snsLogin,
    onSuccess: async (data, variables, context) => {
		console.log('소셜 로그인 mutate', data);

      // 토큰이 있으면 쿠키에 저장
      if (data.token) {
        setCookie(AUTH_CONFIG.ACCESS_TOKEN_COOKIE, data.token);
      }

      // 로그인한 유저 정보를 전역 스토어에 저장
      setLoginUserInfo(data);

      // 채널톡에서 사용되는 사용자 정보 캐시 무효화
      await queryClient.invalidateQueries({
        queryKey: [queryKeys.AUTH.BASE, queryKeys.AUTH.GET_USER_INFO]
      });

      // userType에 따른 라우팅 처리
      switch (data.userType) {
				// 비회원(첫 sns 로그인)
        case 'NON_MEMBER': {
          router.push("/");
          break;
        }
				// 기존 이메일 회원
        case 'MEMBER': {
          router.push(`/account/connect-sns?providerId=${data.providerId}`);
          break;
        }
				// 카카오 로그인 회원
        case 'MEMBER_WITH_SMS_KAKAO': {
          if (variables.provider === 'naver') {
            alert("카카오 간편로그인이 연동된 계정입니다. 카카오로 로그인해주세요.");
            router.push('/login');
          } else {
            router.push('/');
          }
          break;
        }
				// 네이버 로그인 회원
        case 'MEMBER_WITH_SMS_NAVER': {
          if (variables.provider === 'kakao') {
            alert("네이버 간편로그인이 연동된 계정입니다. 네이버로 로그인해주세요.");
            router.push('/login');
          } else {
            router.push('/');
          }
          break;
        }
        default: {
          router.push('/');
        }
      }

      if (mutationOptions?.onSuccess) {
        mutationOptions.onSuccess(data, variables, context);
      }
    },
    ...mutationOptions,
  });
}