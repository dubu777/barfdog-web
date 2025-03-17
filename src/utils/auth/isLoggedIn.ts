import { jwtDecode } from "jwt-decode";
import { AUTH_CONFIG } from "@/constants/auth";
import { getCookie } from "./cookie";

interface JwtPayload {
  exp?: number; // 만료 시간(초 단위)
}

/**
 * 쿠키에 저장된 엑세스 토큰의 존재 및 만료 여부를 검사합니다.
 * 토큰이 존재하고, 디코딩에 성공하며, 만료되지 않았다면 true를 반환합니다.
 */
export function isLoggedIn(): boolean {
  const token = getCookie(AUTH_CONFIG.ACCESS_TOKEN_COOKIE);
  if (token && token.trim().length > 0) {
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      // exp가 있고, 현재 시간이 만료 시간보다 늦으면 false 반환
      if (decoded.exp && Date.now() >= decoded.exp * 1000) {
        return false;
      }
      return true;
    } catch (error) {
      // 토큰 디코딩에 실패하면 유효하지 않은 토큰으로 판단
      return false;
    }
  }
  return false;
}
