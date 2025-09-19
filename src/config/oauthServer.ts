export const OAUTH_SERVER_CONFIG = {
  kakao: {
    clientId: process.env.KAKAO_REST_API_KEY!, // 공급자 콘솔의 REST API Key(클라이언트 식별자)
    clientSecret: process.env.KAKAO_CLIENT_SECRET ?? "", // 카카오는 시크릿이 옵션일 수 있으므로 빈 문자열 허용
    redirectUri: process.env.KAKAO_REDIRECT_URI!, // 콘솔에 등록된 콜백 URL과 동일해야 함
    authorizeUrl: "https://kauth.kakao.com/oauth/authorize", // 인가(동의) 화면 엔드포인트
    tokenUrl: "https://kauth.kakao.com/oauth/token", // 토큰 교환 엔드포인트(서버에서만 호출)
  },
  naver: {
    clientId: process.env.NAVER_CLIENT_ID!, // 네이버 클라이언트 아이디
    clientSecret: process.env.NAVER_CLIENT_SECRET!, // 네이버 클라이언트 시크릿(필수)
    redirectUri: process.env.NAVER_REDIRECT_URI!, // 네이버 콜백 URL
    authorizeUrl: "https://nid.naver.com/oauth2.0/authorize", // 인가 화면 엔드포인트
    tokenUrl: "https://nid.naver.com/oauth2.0/token", // 토큰 교환 엔드포인트
  },
} as const;
