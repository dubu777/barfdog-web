import "server-only";
import crypto from "crypto";

export function generateState(length = 16) {
  // 인가 요청과 콜백 요청이 짝이 맞는지 검증할 랜덤 토큰(CSRF 방지)
  return crypto.randomBytes(length).toString("base64url");
}
