// src/app/api/oauth/[provider]/callback/route.ts
import { NextRequest, NextResponse } from "next/server"; // Route Handler 타입
import { cookies } from "next/headers"; // 서버쿠키 접근
import { OAUTH_SERVER_CONFIG } from "@/config/oauthServer"; // 서버 전용 OAuth 설정
import { safeNextUrl } from "@/utils/url/safeNextUrl"; // 오픈 리다이렉트 방지 유틸
import { SnsProvider } from "@/types";

// resultCode → message 매핑 (기존 코드 이식)
const CodeMessage: Record<number, string> = {
  101: "카카오 연결에 실패했습니다.",
  102: "이미 카카오로 연결된 계정입니다.",
  103: "존재하지 않는 계정입니다.",
  406: "회원의 나이가 14세 미만입니다.",
  24: "인증에 실패했습니다.",
  28: "OAuth 인증 헤더가 없습니다.",
  251: "회원가입이 필요합니다.",
  252: "SNS 연동이 필요합니다.",
  253: "카카오 간편로그인이 연동된 계정입니다. 카카오로 로그인해주세요.",
  254: "네이버 간편로그인이 연동된 계정입니다. 네이버로 로그인해주세요.",
  200: "간편 로그인에 성공했습니다.",
  500: "일시적인 서버 오류입니다. 관리자에게 문의해주세요.",
  403: "호출 권한이 없습니다.",
  404: "해당 데이터가 없습니다.",
} as const;

type UserType =
  | "NON_MEMBER"
  | "MEMBER"
  | "MEMBER_WITH_SMS_KAKAO"
  | "MEMBER_WITH_SMS_NAVER"
  | "SUCCESS";

function deriveUserType(code?: number): UserType {
  switch (code) {
    case 251:
      return "NON_MEMBER";
    case 252:
      return "MEMBER";
    case 253:
      return "MEMBER_WITH_SMS_KAKAO";
    case 254:
      return "MEMBER_WITH_SMS_NAVER";
    case 200:
      return "SUCCESS";
    default:
      return "NON_MEMBER";
  }
}

// (PKCE 없이) Authorization Code → Access Token 교환 함수
async function exchangeToken(provider: SnsProvider, code: string) {
  const config = OAUTH_SERVER_CONFIG[provider];

  // OAuth 표준 폼 데이터 구성
  const body = new URLSearchParams({
    grant_type: "authorization_code", // 인가 코드 교환 그랜트 타입
    client_id: config.clientId, // 클라이언트 아이디
    redirect_uri: config.redirectUri, // 콜백 URL(인가요청과 동일해야 함)
    code, // 공급자가 콜백으로 준 일회용 인가 코드
  });

  // 네이버(및 일부 공급자)는 client_secret이 필수 → 있으면 포함
  if (config.clientSecret) body.set("client_secret", config.clientSecret);

  // 서버 간 통신으로 토큰 엔드포인트 호출(브라우저 아님 → CORS 제약 없음)
  const res = await fetch(config.tokenUrl, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" }, // 폼 인코딩
    body, // 폼 데이터 전송
  });

  // 토큰 교환 실패 시 에러 처리
  if (!res.ok) throw new Error(`Token exchange failed (${res.status})`);

  // 공급자 응답(JSON)에 access_token 등이 포함됨
  return res.json() as Promise<{ access_token: string }>;
}

export async function GET(
  req: NextRequest,
  { params }: { params: { provider: SnsProvider } }
) {
  const provider = params.provider; // kakao | naver
  const config = OAUTH_SERVER_CONFIG[provider]; // 설정 로드
  if (!config) {
    return NextResponse.redirect(
      new URL("/login?error=unsupported_provider", req.url)
    );
  }

  // 콜백 쿼리에서 code/state 추출
  const url = new URL(req.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");

  // Start 단계에서 저장한 state/next를 읽음
  const jar = cookies();
  const storedState = jar.get(`oauth.${provider}.state`)?.value;
  const next = safeNextUrl(jar.get("oauth.next")?.value);

  // 일회성 쿠키는 재사용 방지를 위해 즉시 제거
  jar.delete(`oauth.${provider}.state`);
  jar.delete("oauth.next");

  // state 검증 실패/누락 시 안전하게 로그인 화면으로 돌려보냄
  if (!code || !state || !storedState || state !== storedState) {
    return NextResponse.redirect(
      new URL("/login?error=invalid_state", req.url)
    );
  }

  // 1) OAuth 제공업체 토큰 획득
  const token = await exchangeToken(provider, code);

  // 2) (권장) 백엔드(BFF)에 로그인 위임 → 백엔드가 HttpOnly 세션 쿠키를 내려주도록 설계
  const bffRes = await fetch(
    `${process.env.BACKEND_URL}/api/login/${provider}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" }, // 백엔드 규약에 맞춤
      body: JSON.stringify({ accessToken: token.access_token }), // 공급자 액세스 토큰 전달
      // 필요 시 credentials, 헤더 등 추가(리버스 프록시/도메인 구성에 따라)
    }
  );

  // 백엔드 인증 실패 시 로그인 화면으로 복귀(에러 코드/로그는 서버에서 기록)
  if (!bffRes.ok) {
    return NextResponse.redirect(
      new URL("/login?error=signin_failed", req.url)
    );
  }

  // 3) 모든 게 OK면 최종 목적지로 302 이동
  return NextResponse.redirect(new URL(next, req.url), { status: 302 });
}
