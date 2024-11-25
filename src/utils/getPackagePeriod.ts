export function getPackagePeriod(startDate: string, subscriptionMonth: number): string {
  // 구독 시작 날짜와 구독 월 횟수 기준으로 패키지 기간 계산
  const formatDate = (date: Date): string =>
    `${date.getFullYear()}/${String(date.getMonth() + 1).padStart(2, '0')}/${String(date.getDate()).padStart(2, '0')}`;

  const start = new Date(startDate);
  const end = new Date(start);
  end.setMonth(end.getMonth() + subscriptionMonth);

  // 시작 날짜와 종료 날짜 중 종료 날짜만 포함
  return `~ ${formatDate(end)}`;
}