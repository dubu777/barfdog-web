import { AUTH_CONFIG } from "@/constants/auth";
import { getCookie } from "../auth/cookie";

/**
 * 언로드 타이밍에서도 전송 시도를 보장하기 위한 keepalive POST.
 */
export async function postKeepalive(
  url: string,
  extraHeaders?: Record<string, string>
) {
  const headers: Record<string, string> = { ...(extraHeaders ?? {}) };

  const token = getCookie(AUTH_CONFIG.ACCESS_TOKEN_COOKIE);
  if (token) headers.Authorization = `Bearer ${token}`;

  await fetch(url, {
    method: "POST",
    keepalive: true,
    credentials: "include",
    headers,
  });
}
