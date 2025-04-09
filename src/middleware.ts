import { NextRequest, NextResponse } from "next/server";
import { getNeedToSetPassword } from "@/api/auth/auth";
import { AUTH_CONFIG } from "@/constants/auth";
import { isAuthenticated } from "./utils/auth/isAuthenticated";


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

	try {
		needToSetPassword = await shouldRedirectToSetPassword(pathname);
	} catch (error) {
		console.error('비밀번호 설정 여부 확인 중 오류 발생:', error);
		// 에러 발생 시 로그인 페이지로 리디렉션
		return NextResponse.redirect(new URL('/login', req.nextUrl.origin));
	}

	console.log('needToSetPassword', needToSetPassword)
  // 보호된 경로에 대한 접근 체크
  if (isProtectedPath(pathname) && !isAuth) {
      return NextResponse.redirect(new URL('/login', req.nextUrl.origin));
  }

	if (pathname === '/login' && isAuth) {	
      return NextResponse.redirect(new URL('/', req.nextUrl.origin));
    }

	if (needToSetPassword && pathname !== '/mypage/account/set-password') {
		const currentPathSegment = pathname.split('/').pop();
		return NextResponse.redirect(
			new URL(`/mypage/account/set-password?redirect=${currentPathSegment}`, req.url)
		)
	} else {

	}

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