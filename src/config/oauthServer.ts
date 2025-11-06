export const OAUTH_SERVER_CONFIG = {
  kakao: {
    clientId: process.env.KAKAO_REST_API_KEY!, // 공급자 콘솔의 REST API Key(클라이언트 식별자)
    clientSecret: process.env.KAKAO_CLIENT_SECRET || "", // 카카오는 시크릿이 옵션이므로 빈 문자열 허용
    redirectUri: process.env.KAKAO_REDIRECT_URI!,
    tokenUrl: "https://kauth.kakao.com/oauth/token", // 토큰 교환 엔드포인트
    requireState: false, // 카카오는 state 파라미터가 필수가 아님
  },
  naver: {
    clientId: process.env.NAVER_CLIENT_ID || "",
    clientSecret: process.env.NAVER_CLIENT_SECRET || "", // 필수
    redirectUri: process.env.NAVER_REDIRECT_URI || "",
    tokenUrl: "https://nid.naver.com/oauth2.0/token",
    requireState: true, // 네이버는 state 파라미터가 필수
  },
} as const;
