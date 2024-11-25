import { PlanName, subscribePlanInfo } from "@/constants";
import { CalculateSubscribePriceInput, CalculateSubscribePriceOutput } from "@/types";

// 기존 구독자 가격 조정을 위한 함수
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
  discountPercent: number // 플랜별 할인율
): number => {
  const perPackPrice = pricePerGram * oneMealGram; // 할인 적용 안된 한 팩 가격
  return Math.floor(perPackPrice * (1 - discountPercent / 100)); // 할인 적용된 한팩 가격, 소숫점 버림
};

// 구독 가격 계산 함수
export const calculateSubscribePrice = ({
  selectedRecipeMeals, // 선택한 레시피의 정보 => 한 팩 그램 수(oneMealGram), 그램 당 가격(pricePerGram), recipeId, recipeName
  selectedPlan, // 선택한 플랜(ex - FULL, HALF)
  isOriginSubscriber, // 기존 구독자 판별, 가격 인상 전 고객 확인
  discountPercent = 0,
}: CalculateSubscribePriceInput): CalculateSubscribePriceOutput => {
  // 선택된 플랜의 총 팩 수 가져옴
  const totalNumberOfPacks =
    selectedPlan && subscribePlanInfo[selectedPlan]
      ? subscribePlanInfo[selectedPlan].totalNumberOfPacks
      : 0;

  // 각 레시피별 가격 계산해서 배열로 만듬
  const recipePriceDetails = selectedRecipeMeals.map(
    ({ recipeId, recipeName, oneMealGram, pricePerGram }) => {
      const adjustedPricePerGram = adjustPriceForSubscriber(
        pricePerGram,
        recipeName,
        isOriginSubscriber
      );

      // 할인 적용된 한 팩 가격
      const discountedPackPrice =
        adjustedPricePerGram * oneMealGram * (1 - discountPercent / 100);

      return {
        recipeId,
        recipeName,
        discountedPackPrice: Math.round(discountedPackPrice), // 해당 레시피의 할인 적용된 한팩 가격
        originPrice: totalNumberOfPacks * adjustedPricePerGram * oneMealGram, // 해당 레시피의 총 원가
        salePrice: totalNumberOfPacks * discountedPackPrice, // 해당 레시피의 총 할인 적용된 가격
      };
    }
  );

  // 총 원가
  const totalOriginalPriceAllRecipes =
    recipePriceDetails.reduce((acc, { originPrice }) => acc + originPrice, 0) /
    recipePriceDetails.length;

  // 총 할인 적용된 가격
  const totalDiscountedPriceAllRecipes =
    recipePriceDetails.reduce((acc, { salePrice }) => acc + salePrice, 0) /
    recipePriceDetails.length;

  // 전체 평균 팩당 가격 계산
  const averagePackPrice =
    recipePriceDetails.reduce(
      (acc, { discountedPackPrice }) => acc + discountedPackPrice,
      0
    ) / recipePriceDetails.length;

  return {
    averagePackPrice: Math.floor(averagePackPrice), // 전체 평균 팩당 가격 계산
    recipePriceDetails, // 레시피별 가격 상세 정보
    totalOriginalPriceAllRecipes: Math.floor(totalOriginalPriceAllRecipes),
    totalDiscountedPriceAllRecipes: Math.floor(totalDiscountedPriceAllRecipes),
  };
};
