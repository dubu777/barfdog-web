import { NextRequest, NextResponse } from "next/server";
import { getNeedToSetPassword } from "@/api/auth/auth";
import { AUTH_CONFIG } from "@/constants/auth";

const isAuthenticated = (req: NextRequest) => {
	return req.cookies.get(AUTH_CONFIG.LOGIN_COOKIE)?.value;
};

const pathsRequiringPasswordSetup = [
	'/mypage/account/user-info',
	'/mypage/account/change-password',
	'/mypage/account/connected-sns',
	'/mypage/account/set-password',
];

const shouldRedirectToSetPassword = async (pathname: string) => {
	if (pathsRequiringPasswordSetup.includes(pathname)) {
		return await getNeedToSetPassword();
	}
	return false;
}

export async function middleware(req: Request) {
	console.log('요청된 URL:', req.url);

	// 현재 경로 확인
	const pathname = new URL(req.url).pathname;
	const token = isAuthenticated(req);

	// 로그인되지 않은 사용자는 /mypage 하위 경로에서 로그인 페이지로 리디렉션
	if (!token && pathname.startsWith('/mypage')) {
		return NextResponse.redirect(new URL('/login', req.nextUrl.origin));
	}

	const needToSetPassword = await shouldRedirectToSetPassword(pathname);
	if (needToSetPassword && pathname !== '/mypage/account/set-password') {
		const currentPathSegment = pathname.split('/').pop();
		return NextResponse.redirect(
			new URL(`/mypage/account/set-password?redirect=${currentPathSegment}`, req.url)
		)
	}

	return NextResponse.next();
}

export const config = {
	matcher: ['/mypage/:path*'],
}