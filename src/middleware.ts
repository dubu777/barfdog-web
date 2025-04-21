import { NextRequest, NextResponse } from "next/server";
import { getNeedToSetPassword } from "@/api/auth/auth";
import { AUTH_CONFIG } from "@/constants/auth";
import { isAuthenticated } from "./utils/auth/isAuthenticated";
import { cookies } from "next/headers";


const pathsRequiringPasswordSetup = [
	'/mypage/account/user-info',
	'/mypage/account/change-password',
	'/mypage/account/connect-sns',
	'/mypage/account/set-password',
	'/mypage/account/notification',
];

const protectedPaths = [
  '/mypage',
  '/order',
  '/subscription'
];

const isProtectedPath = (pathname: string): boolean => {
  return protectedPaths.some(path => pathname.startsWith(path));
};


const shouldRedirectToSetPassword = async (pathname: string) => {
	if (pathsRequiringPasswordSetup.includes(pathname)) {
		return await getNeedToSetPassword();
	}
	return false;
}

export async function middleware(req: NextRequest) {
	console.log('요청된 URL:', req.url);

const token = req.cookies.get(AUTH_CONFIG.ACCESS_TOKEN_COOKIE)?.value;
const isAuth = isAuthenticated(token);

	// 현재 경로 확인
	const pathname = new URL(req.url).pathname;
	let needToSetPassword = false;

	const logoutWithDeleteCookies = () => {
		const response = NextResponse.redirect(new URL('/login', req.nextUrl.origin));

		const cookiesToDelete = [AUTH_CONFIG.ACCESS_TOKEN_COOKIE, AUTH_CONFIG.REFRESH_TOKEN_COOKIE];
		cookiesToDelete.forEach(cookie => {
			response.cookies.set(cookie, '', { path: '/', maxAge: 0 })
		})

		return response;
	}

	try {
		needToSetPassword = await shouldRedirectToSetPassword(pathname);
	} catch (error) {
		console.error('비밀번호 설정 여부 확인 중 오류 발생:', error);
		// 에러 발생 시 로그인 페이지로 리디렉션
		return logoutWithDeleteCookies();
	}

  // 보호된 경로에 대한 접근 체크
  if (isProtectedPath(pathname)) {
    const token = req.cookies.get(AUTH_CONFIG.ACCESS_TOKEN_COOKIE)?.value;
    if (!isAuthenticated(token)) {
			return logoutWithDeleteCookies();
    }
  }

	if (pathname === '/login' && isAuth) {	
      return NextResponse.redirect(new URL('/', req.nextUrl.origin));
    }

	// if (needToSetPassword && pathname !== '/mypage/account/set-password') {
	// 	const currentPathSegment = pathname.split('/').pop();
	// 	return NextResponse.redirect(
	// 		new URL(`/mypage/account/set-password?redirect=${currentPathSegment}`, req.url)
	// 	)
	// } else {

	// }

	return NextResponse.next();
}

export const config = {
  matcher: [
    '/mypage/:path*',
    '/order/:path*',
    '/subscription/:path*',
		'/login',
  ]
}