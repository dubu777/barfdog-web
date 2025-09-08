import KakaoIcon from "public/images/logo/auth/kakao-logo.svg";
import NaverIcon from "public/images/logo/auth/naver-logo.svg";
import KakaoSymbolIcon from "public/images/mypage/kakao-symbol.svg";
import NaverSymbolIcon from "public/images/mypage/naver-symbol.svg";

import { SnSProvider } from "@/types";
import { themeVars } from "@/styles/theme.css";

interface ProviderOAuthConfig {
  codeUrl: string; // 인가 코드 요청 URL
  tokenUrl: string; // 토큰 요청 URL
  grantType: string; // 토큰 요청 시 grant_type 값
  responseType: string; // 인가 코드 요청 시 response_type 값
}

interface ProviderConfig {
  clientId: string;
  clientSecret: string;
  redirectUri: string;
  auth: ProviderOAuthConfig;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  alt: string;
  loginText: string;
  symbolIcon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  color: string;
  fontColor: string;
  name: string;
}

export const SNS_LOGIN_CONFIG: Record<SnSProvider, ProviderConfig> = {
  kakao: {
    clientId: process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY || "",
    clientSecret: process.env.NEXT_PUBLIC_KAKAO_CLIENT_SECRET || "",
    redirectUri: process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI || "",
    auth: {
      codeUrl: "https://kauth.kakao.com/oauth/authorize",
      tokenUrl: "https://kauth.kakao.com/oauth/token",
      grantType: "authorization_code",
      responseType: "code",
    },
    icon: KakaoIcon,
    alt: "카카오 이미지",
    loginText: "카카오로 시작하기",
    symbolIcon: KakaoSymbolIcon,
    color: themeVars.colors.kakao.kakaoBackground,
    fontColor: 'kakaoFont',
    name: "카카오",
  },
  naver: {
    clientId: process.env.NEXT_PUBLIC_NAVER_CLIENT_ID || "",
    clientSecret: process.env.NEXT_PUBLIC_NAVER_CLIENT_SECRET || "",
    redirectUri: process.env.NEXT_PUBLIC_NAVER_REDIRECT_URI || "",
    auth: {
      codeUrl: "https://nid.naver.com/oauth2.0/authorize",
      tokenUrl: "/oauth2.0/token",
      grantType: "authorization_code",
      responseType: "code",
    },
    icon: NaverIcon,
    alt: "네이버 이미지",
    loginText: "네이버로 시작하기",
    symbolIcon: NaverSymbolIcon,
    color: themeVars.colors.naver.naverBackground,
    fontColor: 'naverFont',
    name: "네이버",
  },
};
