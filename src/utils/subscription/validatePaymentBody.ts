import { PaymentBody } from "@/types";

export function validatePaymentBody(body: PaymentBody): string | null {
  if (!body.plan) return "플랜이 선택되지 않았습니다.";
  if (!body.recipeIdList || body.recipeIdList.length === 0) return "레시피가 선택되지 않았습니다.";
  if (isNaN(body.nextPaymentPrice) || body.nextPaymentPrice <= 0) return "유효하지 않은 가격입니다.";
  if (!body.oneDayRecommendKcal) return "반려견 칼로리 정보가 누락되었습니다.";
  return null;
}