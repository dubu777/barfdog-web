import { SkipType } from "@/types/mypage/subscription";

/**
 * 구독 건너뛰기 가능 여부를 판단
 * 다음 결제일까지 남은 일수가 5일 이상이면 true (건너뛰기 가능)
 * 5일 미만이면 false (건너뛰기 불가 - 이미 생산/배송 준비가 시작되었을 수 있음)
 * 
 * 비즈니스 로직:
 * - 배송일 전 주 토요일에 생산이 시작되므로, 최소 5일 전에 건너뛰기 결정이 필요
 * - 너무 임박하면 생산 준비가 이미 시작되어 비효율적
 * 
 * 예시:
 *  today: 2025-11-01
 *  nextPaymentDate: 2025-11-07 → true (6일 남음, 5일 이상)
 *  nextPaymentDate: 2025-11-06 → true (5일 남음, 5일 이상)
 *  nextPaymentDate: 2025-11-05 → false (4일 남음, 5일 미만)
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

  // 다음 결제일까지 5일 이상 남았으면 true (건너뛰기 가능)
  // 5일 미만이면 생산 준비가 시작되었을 수 있어 건너뛰기 불가
  const availableSkipDate = 5;
  return diffInDays >= availableSkipDate;
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