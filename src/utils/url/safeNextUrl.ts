export function safeNextUrl(input: string | null | undefined) {
  // next 파라미터가 없으면 홈으로
  if (!input) return "/";
  // 절대 URL(https://, //)은 금지하여 외부 피싱 사이트로 빠지는 것을 방지
  if (/^(https?:)?\/\//i.test(input)) return "/";
  // 내부 경로(/로 시작)만 허용
  if (!input.startsWith("/")) return "/";
  return input;
}
