import { DeliveryPlan, MealPlan, Plan } from "@/types";

/**
 * mealPlan과 deliveryPlan 조합으로 Plan을 계산합니다.
 *
 * @param mealPlan - 1일 급여 횟수 (1 또는 2)
 * @param deliveryPlan - 배송 주기 (2주 또는 4주)
 * @returns Plan - "FULL" | "HALF" | "FOUR_WEEKS_TWO_MEAL"
 *
 * @example
 * getPlanFromMealAndDelivery(2, 2) // "FULL"
 * getPlanFromMealAndDelivery(1, 4) // "HALF"
 * getPlanFromMealAndDelivery(2, 4) // "FOUR_WEEKS_TWO_MEAL"
 * getPlanFromMealAndDelivery(1, 2) // 하루 1끼 2주는 배송비 단가가 맞지않아서 제외함, 예외처리
 */
export function getPlanFromMealAndDelivery(
  mealPlan: MealPlan,
  deliveryPlan: DeliveryPlan
): Plan {
  // mealPlan = 2, deliveryPlan = 2 => FULL
  if (mealPlan === 2 && deliveryPlan === 2) {
    return "FULL";
  }

  // mealPlan = 1, deliveryPlan = 4 => HALF
  if (mealPlan === 1 && deliveryPlan === 4) {
    return "HALF";
  }

  // mealPlan = 2, deliveryPlan = 4 => FOUR_WEEKS_TWO_MEAL
  if (mealPlan === 2 && deliveryPlan === 4) {
    return "FOUR_WEEKS_TWO_MEAL";
  }

  throw new Error(
    `Invalid combination: mealPlan=${mealPlan}, deliveryPlan=${deliveryPlan}`
  );
}
