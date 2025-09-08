// src/utils/priceUtils.ts
import { DeliveryPlan, MealPlan } from "@/types/subscription";
import { roundTo } from "../numberUtils";
import { SubscriptionValues } from "../validation/subscriptionValidation";

export interface CalculateRecipePackOutput {
  recommendedPackGrams: number; // 추천 급여량
  packGrams: number; // 팩당 그램 수 (추천 or 커스텀)
  packPrice: number; // 팩당 가격
  pricePer10g: number; // 10g당 가격
  under20g?: number;
}

export interface CalculateRecipePackInput {
  rawFoodItem: {
    recipeId: number;
    gramPerKal: number;
    pricePerGram: number;
    oneMealRecommendGram: number; // 서버에서 계산된 추천 급여량
  }; // rawFood 데이터
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
    else if (deliveryPlan === "ONE_WEEK") basePacks = 14;
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
  recipeCount: 1 | 2
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

export function calculateTotalSubscriptionPrice(
  rawFoods: SubscriptionValues["rawFoods"],
  mealPlan: MealPlan,
  deliveryPlan: DeliveryPlan
): CalculateTotalPriceOutput {
  const recipeCount = rawFoods.length as 1 | 2;

  const recipes = rawFoods.map((item) => {
    const { originalPrice, discountAmount, discountedPrice } =
      calculateRecipeTotal(
        item.packPrice ?? 0,
        mealPlan,
        deliveryPlan,
        recipeCount
      );
    return {
      ...item,
      originalPrice,
      discountAmount,
      discountedPrice,
    };
  });

  const totalOriginalPrice = recipes.reduce(
    (s, r) => s + (r.originalPrice ?? 0),
    0
  );
  const paymentExpectedPrice = recipes.reduce(
    (s, r) => s + (r.discountedPrice ?? 0),
    0
  );
  const totalDiscountAmount = totalOriginalPrice - paymentExpectedPrice;

  return { totalOriginalPrice, paymentExpectedPrice, totalDiscountAmount };
}

/**
 * 한 팩당 그램 → 팩당 가격 → 10g당 가격 계산
 */
export function calculateRecipePack({
  rawFoodItem,
  customPackGrams,
}: CalculateRecipePackInput): CalculateRecipePackOutput {
  // 서버에서 이미 계산된 추천 급여량 사용
  let recommendedPackGrams = rawFoodItem.oneMealRecommendGram;
  const pricePerGram = rawFoodItem.pricePerGram;

  // 레거시 여부에 따라 pricePerGram 조정
  // 기존 구독자 혜택 제거 정책 확정시 주석 된 부분 삭제
  // const isLegacy = ORIGIN_SUBSCRIBE_ID_SET.has(subscribeId);
  // const legacyConst = LEGACY_RECIPE_CONSTANTS[rawFoodItem.recipeId];
  // if (isLegacy && legacyConst) {
  //   pricePerGram = legacyConst.pricePerGram;
  // }

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
