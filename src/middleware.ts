import { getNeedToSetPassword } from "@/api/auth/auth";
import { NextResponse } from "next/server";

export async function middleware(req: Request) {
	console.log('Middleware 실행됨!'); // 실행 로그 확인
	console.log('요청된 URL:', req.url);

	// 현재 경로 확인
	const pathname = new URL(req.url).pathname;

	// 리디렉션을 해야 하는 경로인지 확인
	const pathsRequiringPasswordSetup = [
		'/mypage/account/user-info',
		'/mypage/account/change-password',
		'/mypage/account/connected-sns',
		'/mypage/account/set-password',
	];
	console.log('pathsRequiringPasswordSetup', pathsRequiringPasswordSetup)
	// 조건에 맞는 경로로 접근 시, 패스워드 설정 여부를 체크
	if (pathsRequiringPasswordSetup.includes(pathname)) {
		const needToSetPassword = await getNeedToSetPassword();

		// 필요할 경우 리디렉션
		if (needToSetPassword) {
			if (pathname !== '/mypage/account/set-password') {
				const currentPath: string[] = pathsRequiringPasswordSetup.find(path => path === pathname)?.split('/') || [];
				return NextResponse.redirect(new URL(`/mypage/account/set-password?redirect=${currentPath[currentPath?.length - 1]}`, req.url));
			}
		}
	}

	return NextResponse.next();
}

export const config = {
	matcher: ['/mypage/account/:path*'],
}