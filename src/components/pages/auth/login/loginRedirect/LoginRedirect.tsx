'use client';
import * as styles from './LoginRedirect.css';
import Loader from "@/components/common/loader/Loader";
import { useLoginWithProvider } from "@/api/auth/mutations/useLoginWithProvider";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import { SnSProvider } from '@/types';
import { setCookie } from "@/utils/cookie";
import { AUTH_CONFIG } from "@/constants/auth";

interface LoginRedirectProps {
	searchParams: {
		provider: SnSProvider;
		code: string;
	}
}
const LoginRedirect = ({ searchParams }: LoginRedirectProps) => {
	const router = useRouter();
	const code = searchParams.code;
	const provider = searchParams.provider;
	const { data, error, isError } = useLoginWithProvider(provider, code);
	const { setLoginUserInfo } = useAuthStore();

	useEffect(() => {
		if (!data) return;

		if (isError) {
			alert(error?.message || '로그인 실패');
			router.push('/login');
			return;
		}

		const userType = data.userType;
		setLoginUserInfo(data);

		switch (userType) {
			case 'NON_MEMBER': {
				// 비회원
				router.push("/signup?redirect=login");
				break;
			}
			case 'MEMBER': {
				// 회원 (sns 연동 X)
				router.push(`/account/connect-sns?providerId=${data.providerId}`);
				break;
			}
			//
			case 'MEMBER_WITH_SMS_KAKAO': {
				// 회원 (카카오 연동)
				if (provider === 'naver') {
					alert("카카오 간편로그인이 연동된 계정입니다. 카카오로 로그인해주세요.");
					router.push('/login');
				} else {
					// 연동 확인 후 추가 로그인 처리 필요 (토큰값)
					router.push('/');
				}
				break;
			}
			case 'MEMBER_WITH_SMS_NAVER': {
				if (provider === 'kakao') {
					alert("네이버 간편로그인이 연동된 계정입니다. 네이버로 로그인해주세요.");
					router.push('/login');
				} else {
					// 연동 확인 후 추가 로그인 처리 필요 (토큰값)
					router.push('/');
				}
				break;
			}
			default: {
				if(data.token) {
					setCookie(AUTH_CONFIG.ACCESS_TOKEN_COOKIE, data.token);
					router.push('/');
				}
			}
		}
	}, [data, router])
	return (
		<div className={styles.loginRedirectContainer}>
			<Loader />
		</div>
	);
};

export default LoginRedirect;
