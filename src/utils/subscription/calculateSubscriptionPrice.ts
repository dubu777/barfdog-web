import { DEFAULT_MEALS_PER_DAY, LEGACY_RECIPE_CONSTANTS, ORIGIN_SUBSCRIBE_ID_SET } from "@/constants";
import { RecipeDto } from "@/types";
import { roundTo } from "../numberUtils";

export interface SubscriptionPriceBreakdown {
  packPrice: number;
  packGrams: number;
  totalPrice?: number;
  discountAmount?: number;
  finalPrice?: number;
}

export interface CalculateSubscriptionPriceInput {
  dailyRecommendKcal: number;        // 하루 권장 칼로리
  recipeDto: RecipeDto;              // 선택된 레시피
  subscribeId: number;            // 구독 ID
  deliveryCycleWeeks?: 2 | 4;        // 배송 주기 (있을 때만 할인 적용)
  mealsPerDay?: 1 | 2;               // 하루 끼니 수 (있을 때만 할인 적용)
  customPackGrams?: number;          // 사용자가 설정한 한 팩당 그램
}

export interface CalculateSubscriptionPriceOutput {
  recommended: SubscriptionPriceBreakdown;
  custom?: SubscriptionPriceBreakdown;
}

/** 배송 팩 수 결정 (props 전달 시만 호출) */
function determinePacksPerCycle(
  mealsPerDay: 1 | 2,
  deliveryCycleWeeks: 2 | 4
): number {
  if (mealsPerDay === 1 && deliveryCycleWeeks === 4) return 28;
  if (mealsPerDay === 2 && deliveryCycleWeeks === 2) return 28;
  if (mealsPerDay === 2 && deliveryCycleWeeks === 4) return 56;
  throw new Error("유효하지 않은 값입니다.");
}

/** 할인율 결정 (props 전달 시만 호출) */
function determineDiscountRate(mealsPerDay: 1 | 2): number {
  return mealsPerDay === 1 ? 0.03 : 0.05;
}

/** 가격 계산 흐름: 팩당 그램 → 팩당 가격 → 총 금액 → 할인금액 → 최종 가격 */
function computeBreakdown(
  packGrams: number,
  pricePerGram: number,
  packsPerCycle: number,
  discountRate: number
): SubscriptionPriceBreakdown {
  const packPrice = packGrams * pricePerGram;
  const totalPrice = packPrice * packsPerCycle;
  const discountAmount = totalPrice * discountRate;
  const rawFinalPrice = totalPrice - discountAmount;

  // 최종 반환 시 소수점 자리수별 반올림
  return {
    packGrams: roundTo(packGrams, 1),           // 2째 자리에서 반올림
    packPrice: roundTo(packPrice, 0),            // 1째 자리에서 반올림
    totalPrice: roundTo(totalPrice, 0),          // 1째 자리에서 반올림
    discountAmount: roundTo(discountAmount, 0),  // 1째 자리에서 반올림
    finalPrice: roundTo(rawFinalPrice, 0),          // 1째 자리에서 반올림
  };
}
/** 주문 금액 계산: deliveryCycleWeeks, mealsPerDay 없으면 packGrams와 packPrice만 반환 */
export function calculateSubscriptionPrice({
  dailyRecommendKcal,
  recipeDto,
  subscribeId,
  deliveryCycleWeeks,
  mealsPerDay,
  customPackGrams,
}: CalculateSubscriptionPriceInput): CalculateSubscriptionPriceOutput {
  // 레거시 상수 적용 여부
  const isLegacyMember = ORIGIN_SUBSCRIBE_ID_SET.has(subscribeId);
  const legacyConst = LEGACY_RECIPE_CONSTANTS[recipeDto.id];
  const { gramPerKcal, pricePerGram } = (isLegacyMember && legacyConst)
  ? legacyConst
  : recipeDto;
  
  // 팩당 그램 계산
  const recommendedGrams = (dailyRecommendKcal * gramPerKcal) / DEFAULT_MEALS_PER_DAY;
  const hasDiscount = deliveryCycleWeeks != null && mealsPerDay != null;

  /** 할인 적용 여부에 따른 recommended 계산 */
  function getRecommended(): SubscriptionPriceBreakdown {
    if (hasDiscount) {
      const packsPerCycle = determinePacksPerCycle(mealsPerDay!, deliveryCycleWeeks!);
      const discountRate = determineDiscountRate(mealsPerDay!);
      return computeBreakdown(
        recommendedGrams,
        pricePerGram,
        packsPerCycle,
        discountRate
      );
    }
    // 할인 정보 없으면 packGrams, packPrice만 반환
    return {
      packGrams: roundTo(recommendedGrams, 1),
      packPrice: roundTo(recommendedGrams * pricePerGram, 0),
    };
  }

  /** customPackGrams 존재 시 계산 */
  function getCustom(): SubscriptionPriceBreakdown | undefined {
    if (customPackGrams == null) return;
    if (hasDiscount) {
      const packsPerCycle = determinePacksPerCycle(mealsPerDay!, deliveryCycleWeeks!);
      const discountRate = determineDiscountRate(mealsPerDay!);
      return computeBreakdown(
        customPackGrams,
        pricePerGram,
        packsPerCycle,
        discountRate
      );
    }
    // 할인 정보 없으면 packGrams, packPrice만 반환
    return {
      packGrams: roundTo(recommendedGrams, 1),
      packPrice: roundTo(recommendedGrams * pricePerGram, 0),
    };
  }

  const recommended = getRecommended();
  const custom = getCustom();

  // 결과 객체 생성
  const output: CalculateSubscriptionPriceOutput = { recommended };
  if (custom) {
    output.custom = custom;
  }
  return output;
}
