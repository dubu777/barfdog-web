import { SkipType } from "@/types/mypage/subscription";

/**
 * 구독 건너뛰기 가능 여부를 판단
 * 다음 결제일까지 남은 일수가 5일 이하이면 true (건너뛰기 가능)
 * 5일 초과이면 false (건너뛰기 불가)
 * 
 * 비즈니스 로직:
 * - 결제일 당일부터 5일 전까지는 건너뛰기 가능
 * - 6일 전 이상은 너무 이르므로 건너뛰기 불가
 * 
 * 예시 (결제일이 10-31이라고 가정):
 *  today: 10-31 (당일) → diffInDays = 0 → true (건너뛰기 O)
 *  today: 10-30 (1일 전) → diffInDays = 1 → true (건너뛰기 O)
 *  today: 10-29 (2일 전) → diffInDays = 2 → true (건너뛰기 O)
 *  today: 10-28 (3일 전) → diffInDays = 3 → true (건너뛰기 O)
 *  today: 10-27 (4일 전) → diffInDays = 4 → true (건너뛰기 O)
 *  today: 10-26 (5일 전) → diffInDays = 5 → true (건너뛰기 O)
 *  today: 10-25 (6일 전) → diffInDays = 6 → false (건너뛰기 X)
 * 
 */
export const canSkipSubscription = (nextPaymentDate: string | null | undefined): boolean => {
  if (!nextPaymentDate) return false;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const paymentDate = new Date(nextPaymentDate);
  paymentDate.setHours(0, 0, 0, 0);

  // 남은 일수 계산 (nextPaymentDate - today)
  const diffTime = paymentDate.getTime() - today.getTime();
  const diffInDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  // 다음 결제일까지 5일 이하 남았으면 true (건너뛰기 가능)
  // 6일 전 이상은 너무 이르므로 건너뛰기 불가
  const availableSkipDate = 5;
  return diffInDays <= availableSkipDate;
};

/**
 * 변경 발송 예정일 계산
 * @param nextDeliveryDate 실제 다음 배송 예정일
 * @param skipType 건너뛰기 주기 (1주 / 1회)
 * @param weeklyPaymentCycle 플랜 주기
 * @returns 변경 발송 예정일
 */
export const calcChangedSubscribeDeliveryDate = (
  nextDeliveryDate: string,   // 실제 다음 배송 예정일
  skipType: SkipType, // 1주 / 1회
  weeklyPaymentCycle: number  // 플랜 주기
) => {
  const baseDate = new Date(nextDeliveryDate);

  let daysToAdd = 0;
  if (skipType === 'WEEK') {
    daysToAdd = 7; // 1주 건너뛰기 = 7일
  } else {
    daysToAdd = weeklyPaymentCycle * 7; // 1회 건너뛰기 = 플랜 주기 * 7일
  }

  const resultDate = new Date(baseDate);
  resultDate.setDate(resultDate.getDate() + daysToAdd);

  return resultDate.toISOString().slice(0, 10); // YYYY-MM-DD
};