// src/utils/priceUtils.ts
import {
  DEFAULT_MEALS_PER_DAY,
  LEGACY_RECIPE_CONSTANTS,
  ORIGIN_SUBSCRIBE_ID_SET,
} from "@/constants";
import { RecipeDto } from "@/types";
import { roundTo } from "../numberUtils";

/** 배송 팩 수 결정 (레시피 개수에 따라 조정) */
export function calculateDeliveryCyclePackCount(
  mealsPerDay: 1 | 2,
  deliveryCycleWeeks: 2 | 4,
  recipeCount: number = 1
): number {
  let basePacks: number;

  // 하루 1끼면 항상 28팩 (한 끼면 배송주기 4주만 선택 가능하기 때문)
  if (mealsPerDay === 1) {
    basePacks = 28;
  }
  // 하루 2끼면 주기에 따라
  else if (mealsPerDay === 2) {
    if (deliveryCycleWeeks === 2) basePacks = 28;
    else if (deliveryCycleWeeks === 4) basePacks = 56;
    else throw new Error("유효하지 않은 deliveryCycleWeeks 값입니다.");
  } else {
    throw new Error("유효하지 않은 mealsPerDay 값입니다.");
  }

  // 레시피 개수가 2개면 팩 수 절반
  return recipeCount === 2 ? basePacks / 2 : basePacks;
}

/** 할인율 결정 */
export function calculateMealDiscountRate(mealsPerDay: 1 | 2): number {
  return mealsPerDay === 1 ? 0.03 : 0.05;
}

export interface CalculateRecipeTotalOutput {
  originPrice: number; // 할인 전 총액
  discountAmount: number; // 할인 금액
  salePrice: number; // 할인 후 결제액
}

/**
 * 총액·할인·최종금액 계산
 * (이전 computeCyclePricing → calculateRecipeTotal)
 */
export function calculateRecipeTotal(
  packPrice: number,
  mealsPerDay: 1 | 2,
  deliveryCycleWeeks: 2 | 4,
  recipeCount: 1 | 2
): CalculateRecipeTotalOutput {
  const packsPerCycle = calculateDeliveryCyclePackCount(
    mealsPerDay,
    deliveryCycleWeeks,
    recipeCount
  );
  const discountRate = calculateMealDiscountRate(mealsPerDay);

  const originPrice = roundTo(packPrice * packsPerCycle, 0);
  const discountAmount = roundTo(originPrice * discountRate, 0);
  const salePrice = roundTo(originPrice - discountAmount, 0);

  return { originPrice, discountAmount, salePrice };
}

export interface CalculateRecipePackOutput {
  recommendedPackGrams: number; // 추천 급여량
  packGrams: number; // 팩당 그램 수 (추천 or 커스텀)
  packPrice: number; // 팩당 가격
  pricePer10g: number; // 10g당 가격
}

export interface CalculateRecipePackInput {
  dailyRecommendKcal: number; // 하루 권장 칼로리
  recipeDto: RecipeDto; // 선택된 레시피 DTO
  subscribeId: number; // 구독 ID (레거시 여부 판단용)
  customPackGrams?: number; // 사용자 지정 팩당 그램 (없으면 추천 그램 사용)
}

/**
 * 한 팩당 그램 → 팩당 가격 → 10g당 가격 계산
 */
export function calculateRecipePack({
  dailyRecommendKcal,
  recipeDto,
  subscribeId,
  customPackGrams,
}: CalculateRecipePackInput): CalculateRecipePackOutput {
  // 레거시 여부에 따라 gramPerKcal/pricePerGram 결정
  const isLegacy = ORIGIN_SUBSCRIBE_ID_SET.has(subscribeId);
  const legacyConst = LEGACY_RECIPE_CONSTANTS[recipeDto.id];
  const { gramPerKcal, pricePerGram } =
    isLegacy && legacyConst ? legacyConst : recipeDto;

  // 추천 급여량
  const recommendedPackGrams = roundTo(
    (dailyRecommendKcal * gramPerKcal) / DEFAULT_MEALS_PER_DAY,
    1
  );

  // 실제 계산에 사용할 그램: custom이 있으면 custom, 없으면 recommended
  const usedPackGrams =
    customPackGrams != null ? customPackGrams : recommendedPackGrams;

  const packGrams = roundTo(usedPackGrams, 1);
  const packPrice = roundTo(packGrams * pricePerGram, 0);
  const pricePer10g = roundTo(pricePerGram * 10, 0);

  return { recommendedPackGrams, packGrams, packPrice, pricePer10g };
}
