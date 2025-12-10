import { NextRequest, NextResponse } from "next/server";
import { AUTH_CONFIG } from "@/constants/auth";
import { isAuthenticated } from "./utils/auth/isAuthenticated";

// 보호가 필요한 경로
const protectedPaths = [
  "/mypage",
  "/checkout",
  "/diet-analysis",
  "/cart",
  "/health-note",
  "/pet",
  "/subscribe",
];

// 예외 경로
const exceptionPaths = ["/health-note/guest", "/diet-analysis/guest"];

// 정규 페이지와 게스트 페이지 간의 매핑 규칙 정의
const guestRoutes = [
  { base: "/diet-analysis", guest: "/diet-analysis/guest" },
  { base: "/health-note", guest: "/health-note/guest" },
];

// pathname이 특정 base 경로(또는 그 하위 경로)에 포함되는지 검사
const matchBase = (pathname: string, base: string) =>
  pathname === base || pathname.startsWith(base + "/");

// 기존 요청의 쿼리스트링을 유지한 상태로 지정된 경로로 리다이렉트
const redirectPreserve = (req: NextRequest, to: string) => {
  const url = new URL(to, req.nextUrl.origin);
  url.search = new URL(req.url).search;
  return NextResponse.redirect(url);
};

// pathname이 base 또는 guest 규칙과 매칭되는 guestRoutes 항목을 반환
const findRouteBy = <K extends "base" | "guest">(pathname: string, key: K) =>
  guestRoutes.find((r) => matchBase(pathname, r[key]));

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

// 액세스 토큰 추출(Authorization 헤더)
function extractAccessToken(res: Response): string | null {
  const header =
    res.headers.get("authorization") || res.headers.get("Authorization");
  return header && header.startsWith("Bearer ") ? header.slice(7) : null;
}

// 서버(미들웨어)에서 리프레시 시도
async function tryServerRefresh(req: NextRequest): Promise<string | null> {
  const url = new URL("/api/v2/public/accounts/refresh", req.nextUrl.origin);
  const cookieHeader = req.headers.get("cookie") ?? "";

  const res = await fetch(url.toString(), {
    method: "POST",
    headers: { cookie: cookieHeader },
  });

  if (!res.ok) return null;
  return extractAccessToken(res);
}

function redirectToLoginAndClear(req: NextRequest) {
  const { pathname, search } = new URL(req.url);
  const loginUrl = new URL("/login", req.nextUrl.origin);
  loginUrl.searchParams.set("next", pathname + search);

  const res = NextResponse.redirect(loginUrl);
  [AUTH_CONFIG.ACCESS_TOKEN_COOKIE, AUTH_CONFIG.REFRESH_TOKEN_COOKIE].forEach(
    (cookie) => {
      res.cookies.set(cookie, "", { path: "/", maxAge: 0 });
    }
  );
  return res;
}

export async function middleware(req: NextRequest) {
  const { pathname } = new URL(req.url);

  // refresh 자체는 통과
  if (pathname.startsWith("/api/v2/public/accounts/refresh")) {
    const res = NextResponse.next();
    res.headers.set("x-pathname", pathname);
    return res;
  }

  const token = req.cookies.get(AUTH_CONFIG.ACCESS_TOKEN_COOKIE)?.value;

  const isAuthed = isAuthenticated(token);

  // 보호된 경로 접근인데 액세스 토큰이 유효하지 않으면 서버에서 먼저 리프레시 시도
  if (isProtectedPath(pathname) && !isAuthed) {
    const refreshedToken = await tryServerRefresh(req);

    if (refreshedToken) {
      // 새 토큰을 응답 쿠키에 세팅 후 통과
      const res = NextResponse.next();

      // 여기 설정은 프로젝트의 쿠키 정책과 일치시킬 것
      // (js에서 읽어 Authorization 헤더에 주입한다면 httpOnly: false 필요)
      res.cookies.set(AUTH_CONFIG.ACCESS_TOKEN_COOKIE, refreshedToken, {
        path: "/",
        sameSite: "none",
        secure: true,
      });

      res.headers.set("x-pathname", pathname);
      return res;
    }

    // 비로그인 사용자가 정규 경로 접근시 게스트 경로로 보내기
    const matchedRoute = findRouteBy(pathname, "base");
    if (matchedRoute) return redirectPreserve(req, matchedRoute.guest);

    // 리프레시 실패 → 로그인으로
    return redirectToLoginAndClear(req);
  }

  // 로그인한 사용자가 게스트 경로 접근시 정규 경로로 보내기
  if (isAuthed) {
    const matchedRoute = findRouteBy(pathname, "guest");
    if (matchedRoute) return redirectPreserve(req, matchedRoute.base);
  }

  // 로그인한 사용자가 '/login'에 접근하면 루트로
  if (!pathname.includes("/redirect") && pathname === "/login" && isAuthed) {
    return NextResponse.redirect(new URL("/", req.nextUrl.origin));
  }

  const res = NextResponse.next();
  res.headers.set("x-pathname", pathname);
  return res;
}

export const config = {
  matcher: [
    "/mypage/:path*",
    "/checkout/:path*",
    "/login",
    "/diet-analysis/:path*",
    "/health-note/:path*",
    "/cart",
    "/subscribe/:path*",
    "/pet/:path*",
    "/store/:path*",
  ],
};
