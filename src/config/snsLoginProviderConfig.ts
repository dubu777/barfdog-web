import { StaticImageData } from "next/image";
import KakaoImage from "/public/images/icons/kakao.png";
import NaverImage from "/public/images/icons/naver.png";
import { SnSProvider } from "@/types";

interface ProviderConfig {
  clientId: string;
  redirectUri: string;
  authUrl: string;
  image: StaticImageData;
  alt: string;
  loginText: string;
}

export const SNS_PROVIDER_CONFIG: Record<SnSProvider, ProviderConfig> = {
  kakao: {
    clientId: process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY || "",
    redirectUri: process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI || "",
    authUrl: "https://kauth.kakao.com/oauth/authorize",
    image: KakaoImage,
    alt: "카카오 이미지",
    loginText: "카카오로 1초만에 로그인",
  },
  naver: {
    clientId: process.env.NEXT_PUBLIC_NAVER_CLIENT_ID || "",
    redirectUri: process.env.NEXT_PUBLIC_NAVER_REDIRECT_URI || "",
    authUrl: "https://nid.naver.com/oauth2.0/authorize",
    image: NaverImage,
    alt: "네이버 이미지",
    loginText: "네이버로 1초만에 로그인",
  },
};
