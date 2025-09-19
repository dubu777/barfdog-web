import { NextRequest, NextResponse } from "next/server"; // Next.js App Router의 Route Handler 타입
import { cookies } from "next/headers"; // 서버에서 쿠키를 읽고/쓰기 위한 헬퍼
import { OAUTH_SERVER_CONFIG } from "@/config/oauthServer"; // 서버 전용 OAuth 설정
import { generateState } from "@/utils/auth/state"; // CSRF/RP Mix-Up 방지용 state 생성
import { safeNextUrl } from "@/utils/url/safeNextUrl"; // 오픈 리다이렉트 방지 유틸
import { SnsProvider } from "@/types";

export async function GET(
  req: NextRequest,
  { params }: { params: { provider: SnsProvider } }
) {
  const provider = params.provider; // kakao | naver 등 공급자 식별
  const config = OAUTH_SERVER_CONFIG[provider]; // 공급자별 설정 로드
  if (!config) {
    // 지원하지 않는 공급자에 대한 방어적 대응
    return NextResponse.redirect(
      new URL("/login?error=unsupported_provider", req.url)
    );
  }

  const url = new URL(req.url); // 현재 요청 URL 파싱
  const next = safeNextUrl(url.searchParams.get("next")); // 최종 이동 목적지(next) 검증

  const state = generateState(); // 난수 state 생성(CSRF/RP Mix-Up 방지)

  // 콜백에서 검증하기 위해 state/next를 HttpOnly 쿠키로 짧게(5분) 보관
  const jar = cookies();
  const base = {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: true,
    path: "/",
  };
  jar.set(`oauth.${provider}.state`, state, { ...base, maxAge: 60 * 5 });
  jar.set("oauth.next", next, { ...base, maxAge: 60 * 5 });

  // 공급자 인가 URL 구성(Authorization Code Flow, PKCE 없이)
  const authorize = new URL(config.authorizeUrl);
  authorize.searchParams.set("response_type", "code"); // 인가 코드 발급 요청
  authorize.searchParams.set("client_id", config.clientId); // 공급자에 등록된 클라이언트 아이디
  authorize.searchParams.set("redirect_uri", config.redirectUri); // 콜백 URL(콘솔 등록과 동일)
  authorize.searchParams.set("state", state); // 인가 요청-응답 짝 확인용 토큰

  // 사용자를 공급자 동의 화면으로 보냄(302)
  return NextResponse.redirect(authorize.toString(), { status: 302 });
}
