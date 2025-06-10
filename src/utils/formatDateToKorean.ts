/**
 * ISO 형식의 날짜 문자열을 "YYYY.MM.DD" 형식으로 변환합니다.
 * 예: "2025-12-01T23:59:59" → "2025.12.01"
 *
 * @param dateString - ISO 형식의 날짜 문자열
 * @returns "YYYY.MM.DD" 형식의 문자열
 */
export function formatDateToKorean(dateString: string): string {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // 월은 0부터 시작하므로 +1
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}.${month}.${day}`;
}