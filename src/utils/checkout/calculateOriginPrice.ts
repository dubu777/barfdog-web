import { PlanName } from "@/types";

/**
 * 할인된 결제 금액과 플랜 정보를 기반으로 원금(할인 전 가격)을 계산
 * @param nextPaymentPrice 할인된 결제 금액
 * @param plan 구독 플랜 (FULL, HALF)
 * @returns 할인 적용 전 원금
 */
export const calculateOriginPrice = (
  nextPaymentPrice: number,
  plan: PlanName
): number => {
  if (plan === "FULL") {
    return Math.round(nextPaymentPrice / 0.95); // 5% 할인 역계산
  } else if (plan === "HALF") {
    return Math.round(nextPaymentPrice / 0.97); // 3% 할인 역계산
  }
  return nextPaymentPrice;
};
