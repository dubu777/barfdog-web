import { DEFAULT_MEALS_PER_DAY, LEGACY_RECIPE_CONSTANTS, ORIGIN_SUBSCRIBE_ID_SET } from "@/constants";
import { RecipeDto } from "@/types";
import { roundTo } from "../numberUtils";

export interface SubscriptionPriceBreakdown {
  packGrams: number;       // 팩당 그램 수
  packPrice: number;       // 팩당 가격
  pricePer10g: number;     // 10g당 가격
  totalPrice?: number;     // 할인 전 총액
  discountAmount?: number; // 할인 금액
  finalPrice?: number;     // 할인 후 결제액
}

export interface CalculateSubscriptionPriceInput {
  dailyRecommendKcal: number;        // 하루 권장 칼로리
  recipeDto: RecipeDto;              // 선택된 레시피
  subscribeId: number;               // 구독 ID
  deliveryCycleWeeks?: 2 | 4;        // 배송 주기
  mealsPerDay?: 1 | 2;               // 하루 끼니 수
  customPackGrams?: number;          // 사용자가 설정한 한 팩당 그램
}

export interface CalculateSubscriptionPriceOutput {
  recommended: SubscriptionPriceBreakdown;
  custom?: SubscriptionPriceBreakdown;
}

/** 배송 팩 수 결정 */
function determinePacksPerCycle(
  mealsPerDay: 1 | 2,
  deliveryCycleWeeks: 2 | 4
): number {
  if (mealsPerDay === 1 && deliveryCycleWeeks === 4) return 28;
  if (mealsPerDay === 2 && deliveryCycleWeeks === 2) return 28;
  if (mealsPerDay === 2 && deliveryCycleWeeks === 4) return 56;
  throw new Error("유효하지 않은 값입니다.");
}

/** 할인율 결정 */
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
  // 중간 계산 (반올림 전 원시 값)
  const rawPackPrice = roundTo(packGrams * pricePerGram, 0);
  const rawTotalPrice = rawPackPrice * packsPerCycle;
  const rawDiscountAmount = rawTotalPrice * discountRate;
  const rawFinalPrice = rawTotalPrice - rawDiscountAmount;
  const rawPricePer10g = roundTo(pricePerGram * 10, 0);

  // 최종 반환 시 소수점 자리수별 반올림
  return {
    packGrams: roundTo(packGrams, 1),           // 2째 자리에서 반올림
    packPrice: roundTo(rawPackPrice, 0),            // 1째 자리에서 반올림
    totalPrice: roundTo(rawTotalPrice, 0),          // 1째 자리에서 반올림
    discountAmount: roundTo(rawDiscountAmount, 0),  // 1째 자리에서 반올림
    finalPrice: roundTo(rawFinalPrice, 0),         // 1째 자리에서 반올림
    pricePer10g: roundTo(rawPricePer10g, 0), 
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
  const recommendedPackGrams = roundTo((dailyRecommendKcal * gramPerKcal) / DEFAULT_MEALS_PER_DAY, 1);
  const hasDiscount = deliveryCycleWeeks != null && mealsPerDay != null;

  /** 할인 적용 여부에 따른 recommended 계산 */
  function getRecommended(): SubscriptionPriceBreakdown {
    if (hasDiscount) {
      const packsPerCycle = determinePacksPerCycle(mealsPerDay!, deliveryCycleWeeks!);
      const discountRate = determineDiscountRate(mealsPerDay!);
      return computeBreakdown(
        roundTo(recommendedPackGrams, 1),
        pricePerGram,
        packsPerCycle,
        discountRate
      );
    }
    // 할인 정보 없으면 packGrams, packPrice만 반환
    return {
      packGrams: roundTo(recommendedPackGrams, 1),
      packPrice: roundTo(recommendedPackGrams * pricePerGram, 0),
      pricePer10g: roundTo(pricePerGram * 10, 0),
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
      packGrams: roundTo(recommendedPackGrams, 1),
      packPrice: roundTo(customPackGrams * pricePerGram, 0),
      pricePer10g: roundTo(pricePerGram * 10, 0),
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
