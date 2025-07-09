import { NextRequest, NextResponse } from "next/server";
import { AUTH_CONFIG } from "@/constants/auth";
import { isAuthenticated } from "./utils/auth/isAuthenticated";

// 보호가 필요한 경로
// const protectedPaths = ["/mypage", "/order", "/diet-analysis/", "/health-note", "/cart"];
// renewal 서버에서 로그인이 안돼서 테스트를 위해 /health-note 임시로 제외함
const protectedPaths = ["/mypage", "/order", "/diet-analysis/", "/cart"];

// 예외 경로
const exceptionPaths = ["/health-note/guest"];

const isProtectedPath = (pathname: string): boolean => {
  // 예외 경로와 일치하면 보호 대상 아님
  if (exceptionPaths.includes(pathname)) {
    return false;
  }

  // 2) 그 외에 protectedPaths 배열에 정의된 접두사로 시작하면 보호 대상
  return protectedPaths.some((prefix) => {
    // 접두사와 정확히 같거나, 접두사 + "/" 로 시작하는 경우
    return pathname === prefix || pathname.startsWith(prefix + "/");
  });
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
    "/cart",
  ],
};
