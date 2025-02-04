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
	console.log('useLogin')
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
				// 임시비밀번호 발급 후 로그인 시도의 경우 팝업을 위한 params query 추가
				setCookie(AUTH_CONFIG.LOGIN_COOKIE, token, formData.tokenValidDays);
				useAuthStore.getState().setUserInfo(data);
				pushWithQuery('/', data.temporaryPassword ? { tempPw: true } : {});

				return data;
			} catch(error: unknown) {
				const errorMessage =
					axios.isAxiosError(error) && error.response
						? error.response.data?.message || "로그인에 실패했습니다."
						: "네트워크 오류가 발생했습니다.";
				
				console.error("로그인 실패:", error);
				alert(errorMessage);
				throw new Error(errorMessage);
			}
		},
		onSuccess: async (data) => {
			console.log('로그인 성공', data);
		},
		onError: (error) => {
			let errorStatus: number | undefined;
			let errorMessage = "서버 장애입니다. 잠시 후 다시 시도해주세요.";

			if (axios.isAxiosError(error)) {
				errorStatus = error.response?.status;

				if (error.response?.data?.errors?.[0]?.defaultMessage) {
				errorMessage = error.response.data.errors[0].defaultMessage;
				} else if (errorStatus === 400 || errorStatus === 404) {
				errorMessage =
					"아이디 또는 비밀번호가 정확하지 않습니다. \n계정정보를 확인해주세요.";
				}
			}

			console.log("로그인 실패", error);
			alert(errorMessage);
		},
		...mutationOptions,
	})
}
