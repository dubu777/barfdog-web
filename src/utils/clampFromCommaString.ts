export function clampFromCommaString(value: string, max: number): number {
  // 콤마만 제거해서 숫자로 변환
  const normalized = (value ?? "").replace(/,/g, "").trim();
  const num = Number(normalized);

  // 숫자 아님 → 0
  if (!Number.isFinite(num)) return 0;

  // 0 미만 방지 + 상한선(max) 적용, 정수만 사용
  return Math.floor(Math.min(max, Math.max(0, num)));
}
