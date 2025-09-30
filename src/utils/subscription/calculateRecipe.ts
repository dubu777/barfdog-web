// src/utils/priceUtils.ts
import { DeliveryPlan, MealPlan } from "@/types/subscription";
import { roundTo } from "../numberUtils";

export interface CalculateRecipePackReturn {
  recommendedPackGrams: number; // 추천 급여량
  packGrams: number; // 팩당 그램 수 (추천 or 커스텀)
  packPrice: number; // 팩당 가격
  pricePer10g: number; // 10g당 가격
  under20g?: number;
}

export interface CalculateRecipePackInput {
  recommendedPackGrams: number; // 추천 급여량
  pricePerGram: number; // 1g당 가격
  customPackGrams?: number; // 사용자 지정 팩당 그램 (없으면 추천 그램 사용)
}

export interface CalculateRecipeTotalOutput {
  originalPrice: number; // 할인 전 총액
  discountAmount: number; // 할인 금액
  discountedPrice: number; // 할인 후 결제액
}

export interface CalculateTotalPriceOutput {
  totalOriginalPrice: number;
  paymentExpectedPrice: number;
  totalDiscountAmount: number;
}

/** 배송 팩 수 결정 (레시피 개수에 따라 조정) */
export function calculateDeliveryCyclePackCount(
  mealPlan: MealPlan,
  deliveryPlan: DeliveryPlan,
  recipeCount: number = 1
): number {
  let basePacks: number;

  // 하루 1끼면 항상 28팩 (한 끼면 배송주기 4주만 선택 가능하기 때문)
  if (mealPlan === "ONE_MEAL") {
    basePacks = 28;
  }
  // 하루 2끼면 주기에 따라
  else if (mealPlan === "TWO_MEAL") {
    if (deliveryPlan === "TWO_WEEK") basePacks = 28;
    else if (deliveryPlan === "FOUR_WEEK") basePacks = 56;
    else throw new Error("유효하지 않은 deliveryPlan 값입니다.");
  } else {
    throw new Error("유효하지 않은 mealPlan 값입니다.");
  }

  // 레시피 개수가 2개면 팩 수 절반
  return recipeCount === 2 ? basePacks / 2 : basePacks;
}

/** 할인율 결정 */
export function calculateMealDiscountRate(mealPlan: MealPlan): number {
  return mealPlan === "ONE_MEAL" ? 0.03 : 0.05;
}

/**
 * 총액·할인·최종금액 계산
 * (이전 computeCyclePricing → calculateRecipeTotal)
 */
export function calculateRecipeTotal(
  packPrice: number,
  mealPlan: MealPlan,
  deliveryPlan: DeliveryPlan,
  recipeCount: 0 | 1 | 2
): CalculateRecipeTotalOutput {
  const packsPerCycle = calculateDeliveryCyclePackCount(
    mealPlan,
    deliveryPlan,
    recipeCount
  );
  const discountRate = calculateMealDiscountRate(mealPlan);

  const originalPrice = roundTo(packPrice * packsPerCycle, 0);
  const discountAmount = roundTo(originalPrice * discountRate, 0);
  const discountedPrice = roundTo(originalPrice - discountAmount, 0);

  return { originalPrice, discountAmount, discountedPrice };
}
/**
 * 한 팩당 그램 → 팩당 가격 → 10g당 가격 계산
 */
export function calculateRecipePack({
  recommendedPackGrams,
  pricePerGram,
  customPackGrams,
}: CalculateRecipePackInput): CalculateRecipePackReturn {
  // 20g 미만일 때 사용자 안내용 값 반환
  const under20g = recommendedPackGrams < 20 ? recommendedPackGrams : undefined;

  // 실제 계산에 사용할 그램: custom이 있으면 custom, 없으면 recommended
  const usedPackGrams =
    customPackGrams != null ? customPackGrams : recommendedPackGrams;

  const packGrams = roundTo(usedPackGrams, 1);
  const packPrice = roundTo(packGrams * pricePerGram, 0);
  const pricePer10g = roundTo(pricePerGram * 10, 0);

  return { recommendedPackGrams, packGrams, packPrice, pricePer10g, under20g };
}
