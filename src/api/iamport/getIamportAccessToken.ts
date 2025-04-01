// src/api/iamport/getIamportAccessToken.ts
import axios from "axios";
import { headers } from "next/headers"; // ✅ Next.js 서버에서 요청 헤더 가져오기

let cachedToken: string | null = null;
let tokenExpiresAt: number = 0;

/**
 * IAMPORT Access Token을 가져오는 공통 함수 (서버 전용, 캐싱 적용)
 */
export const getIamportAccessToken = async (): Promise<string | null> => {
  try {
    const now = Math.floor(Date.now() / 1000); // 현재 시간 (초 단위)

    // 캐싱된 토큰이 있고, 만료되지 않았다면 그대로 사용
    if (cachedToken && tokenExpiresAt > now) {
      return cachedToken;
    }

    // 서버 환경에서 현재 요청의 브라우저 주소 가져오기
    const host = headers().get("host"); // 예: localhost:4001, www.barfdog.co.kr
    const protocol = headers().get("x-forwarded-proto") || "https"; // 기본 HTTPS 사용
    const siteURL = host
      ? `${protocol}://${host}`
      : process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:4000";

    console.log(`현재 환경에서 siteURL: ${siteURL}`);

    // IAMPORT Access Token 요청
    const { data } = await axios.get(`${siteURL}/api/iamport/token`);
    const accessToken = data?.accessToken;
    const expiredAt = data?.expiredAt; // IAMPORT에서 제공하는 만료 시간 (Unix Timestamp)

    if (!accessToken || !expiredAt) {
      console.error("IAMPORT 토큰 요청 실패");
      return null;
    }

    // 토큰 캐싱 (IAMPORT가 제공하는 만료 시간 기준)
    cachedToken = accessToken;
    tokenExpiresAt = expiredAt; // 만료 시간을 IAMPORT 응답 값으로 설정

    console.log(
      `IAMPORT 토큰 발급됨 (만료 시간: ${new Date(
        expiredAt * 1000
      ).toISOString()})`
    );

    return cachedToken;
  } catch (error) {
    console.error("IAMPORT 토큰 요청 실패:", error);
    return null;
  }
};
