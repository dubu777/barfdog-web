import { NextRequest, NextResponse } from "next/server";
import { AUTH_CONFIG } from "@/constants/auth";
import { isAuthenticated } from "./utils/auth/isAuthenticated";

const protectedPaths = [
  "/mypage",
  "/order",
  "/diet-analysis/",
  "/health-note/",
];

const isProtectedPath = (pathname: string): boolean => {
  return protectedPaths.some((path) => pathname.startsWith(path));
};

export async function middleware(req: NextRequest) {
  console.log("요청된 URL:", req.url);

  const token = req.cookies.get(AUTH_CONFIG.ACCESS_TOKEN_COOKIE)?.value;
  const isAuth = isAuthenticated(token);
  const { pathname, search } = new URL(req.url);

  const logoutWithDeleteCookies = () => {
    const loginUrl = new URL("/login", req.nextUrl.origin);
    loginUrl.searchParams.set("next", pathname + search);

    const res = NextResponse.redirect(loginUrl);
    [AUTH_CONFIG.ACCESS_TOKEN_COOKIE, AUTH_CONFIG.REFRESH_TOKEN_COOKIE].forEach(
      (cookie) => {
        res.cookies.set(cookie, "", { path: "/", maxAge: 0 });
      }
    );
    return res;
  };

  // 보호된 경로에 대한 접근 체크
  if (isProtectedPath(pathname) && !isAuth) {
    return logoutWithDeleteCookies();
  }

  // 로그인한 사용자가 '/login'에 직접 접근한 경우 메인 페이지로 리디렉트
  // 단, '/login/redirect'와 같은 경로는 예외로 허용 (마이페이지 SNS 연동시 필요)
  if (!pathname.includes("/redirect") && pathname === "/login" && isAuth) {
    return NextResponse.redirect(new URL("/", req.nextUrl.origin));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/mypage/:path*",
    "/order/:path*",
    "/login",
    "/diet-analysis/:path*",
    "/health-note/:path*",
  ],
};
