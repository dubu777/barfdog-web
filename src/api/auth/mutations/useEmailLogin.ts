import { UseMutationCustomOptions } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { login } from "@/api/auth/auth";
import { setCookie } from "@/utils/cookie";
import { AUTH_CONFIG } from "@/constants/auth";
import { useAuthStore } from "@/store/useAuthStore";
import useDynamicQueryPush from "@/hooks/useDynamicQueryPush";
import axios from "axios";

export { useEmailLogin };

function useEmailLogin(mutationOptions?: UseMutationCustomOptions) {
	const { pushWithQuery } = useDynamicQueryPush();

	return useMutation({
		mutationFn: async (formData: { email: string, password: string}) => {
			try {
				const result = await login({
					email: formData.email,
					password: formData.password,
				});

				const token = result.headers.authorization.split(" ")[1];
				const data = result.data;

				if (!token) {
					throw new Error("토큰이 제공되지 않았습니다.");
				}

				setCookie(AUTH_CONFIG.ACCESS_TOKEN_COOKIE, token);
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
