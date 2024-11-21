import { PlanName, subscribePlanInfo } from "@/constants";

export const SUBSCRIBE_PRICE_CUTOFF_UNIT = 10;

// 기존 구독자 가격 조정 함수
export const adjustPriceForSubscriber = (
  pricePerGram: number,
  recipeName: string,
  isOriginSubscriber: boolean
): number => {
  const priceMap: Record<string, number> = {
    "STARTER PREMIUM +": 35.649,
    "TURKEY&BEEF +": 39.9,
    "DUCK&LAMB +": 40.452,
    "LAMB&BEEF +": 45.414,
  };
  return isOriginSubscriber && priceMap[recipeName]
    ? priceMap[recipeName]
    : pricePerGram;
};

// 한 팩 가격 계산
export const calculatePerPackPrice = (
  pricePerGram: number,
  oneMealGram: number,
  discountPercent: number
): number => {
  const perPackPrice = pricePerGram * oneMealGram;
  return Math.floor(
    (perPackPrice * (1 - discountPercent / 100)) / SUBSCRIBE_PRICE_CUTOFF_UNIT
  ) * SUBSCRIBE_PRICE_CUTOFF_UNIT;
};


// 구독 가격 계산 함수
export const calculateSubscribePrice = ({
  selectedRecipeMeals,
  selectedPlan,
  isOriginSubscriber,
  discountPercent = 0,
}: {
  selectedRecipeMeals: { recipeId: number; recipeName: string; oneMealGram: number; pricePerGram: number }[];
  selectedPlan: PlanName | null;
  isOriginSubscriber: boolean;
  discountPercent?: number;
}) => {
  // 플랜 정보 가져오기
  const totalNumberOfPacks =
  selectedPlan && subscribePlanInfo[selectedPlan]
    ? subscribePlanInfo[selectedPlan].totalNumberOfPacks
    : 0;

  // 각 레시피별 가격 계산
  const recipePrices = selectedRecipeMeals.map(({ recipeId, recipeName, oneMealGram, pricePerGram }) => {
    const adjustedPricePerGram = adjustPriceForSubscriber(
      pricePerGram,
      recipeName,
      isOriginSubscriber
    );

    const perPackPrice = Math.floor(
      (adjustedPricePerGram * oneMealGram * (1 - discountPercent / 100)) /
        SUBSCRIBE_PRICE_CUTOFF_UNIT
    ) * SUBSCRIBE_PRICE_CUTOFF_UNIT;

    return {
      recipeId,
      recipeName,
      perPackPrice,
      originPrice: totalNumberOfPacks * adjustedPricePerGram * oneMealGram,
      salePrice: totalNumberOfPacks * perPackPrice,
    };
  });

  // 총 원가 및 총 할인 적용된 가격 계산
  const totalOriginalPrice = recipePrices.reduce(
    (acc, { originPrice }) => acc + originPrice,
    0
  );

  const totalDiscountedPrice = recipePrices.reduce(
    (acc, { salePrice }) => acc + salePrice,
    0
  );

  // 전체 평균 가격 계산
  const avgPrice =
    recipePrices.reduce((acc, { perPackPrice }) => acc + perPackPrice, 0) /
    recipePrices.length;

  return {
    avgPrice: Math.floor(avgPrice), // 평균 가격
    recipePrices, // 레시피별 가격
    totalOriginalPrice: Math.floor(totalOriginalPrice),
    totalDiscountedPrice: Math.floor(totalDiscountedPrice),
  };
};
