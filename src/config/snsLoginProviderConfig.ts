import { StaticImageData } from "next/image";
import KakaoImage from "/public/images/icons/kakao.png";
import NaverImage from "/public/images/icons/naver.png";
import { SnSProvider } from "@/types";

interface ProviderOAuthConfig {
  codeUrl: string;     // 인가 코드 요청 URL
  tokenUrl: string;    // 토큰 요청 URL
  grantType: string;   // 토큰 요청 시 grant_type 값
  responseType: string; // 인가 코드 요청 시 response_type 값
}

interface ProviderConfig {
  clientId: string;
  clientSecret: string;
  redirectUri: string;
  auth: ProviderOAuthConfig;
  image: StaticImageData;
  alt: string;
  loginText: string;
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
    image: KakaoImage,
    alt: "카카오 이미지",
    loginText: "카카오로 1초만에 로그인",
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
    image: NaverImage,
    alt: "네이버 이미지",
    loginText: "네이버로 1초만에 로그인",
  },
};
