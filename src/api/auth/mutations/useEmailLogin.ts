import { UseMutationCustomOptions } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { login } from "@/api/auth/auth";
import { setCookie } from "@/utils/cookie";
import { AUTH_CONFIG } from "@/constants/auth";
import { useAuthStore } from "@/store/useAuthStore";
import { useDynamicQueryPush } from "@/hooks/useDynamicQueryPush";
import axios from "axios";

export { useEmailLogin };

function useEmailLogin(mutationOptions?: UseMutationCustomOptions) {
	const { pushWithQuery } = useDynamicQueryPush();

	return useMutation({
		mutationFn: async (formData: { email: string, password: string, tokenValidDays: number }) => {
			try {
				const result = await login({
					email: formData.email,
					password: formData.password,
					tokenValidDays: formData.tokenValidDays,
				});

				const token = result.headers.authorization.split(" ")[1];
				const data = result.data;

				if (!token) {
					throw new Error("토큰이 제공되지 않았습니다.");
				}

				// next/headers 의 cookie httpOnly
				// token 값과 이에 준하는 tokenValidDays 일자 적용 및 userInfo 저장 (persist 추가 적용 필요)
				setCookie(AUTH_CONFIG.LOGIN_COOKIE, token, formData.tokenValidDays);
				useAuthStore.getState().setUserInfo(data);

				// 임시 비밀번호 발급 후 로그인 시도의 경우 비밀번호 생성 팝업을 위한 params query 추가
				pushWithQuery('/', data.temporaryPassword ? { tempPw: true } : {});

				return data;
			} catch(error) {
				const errorMessage =
					axios.isAxiosError(error) && error.response
						? error.response.data?.errors?.[0].defaultMessage || "로그인에 실패했습니다."
						: "네트워크 오류가 발생했습니다.";
				
				console.log("로그인 실패:", error);
				alert(errorMessage);
				throw new Error(String(error));
			}
		},
		onSuccess: async (data) => {
			console.log('로그인 성공', data);
		},
		onError: (error) => {
			console.log("로그인 실패", error);
		},
		...mutationOptions,
	})
}
