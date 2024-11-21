import { originSubscribeIdList } from "@/constants";
import { subscribePlanInfo } from "@/constants";

export function isOriginSubscriber(id: number): boolean {
  return originSubscribeIdList.includes(id);
}

export const adjustedPricePerGram = (
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

  // 기존 구독자이고, 해당 레시피가 priceMap에 있다면 고정 가격 반환
  return isOriginSubscriber && priceMap[recipeName]
    ? priceMap[recipeName]
    : pricePerGram; // 아니라면 기본 pricePerGram 반환
};


export type RecipeInfo = {
  name: string;
  pricePerGram: number;
  oneMealGram: number;
};

// 구독 가격 계산 입력 타입
export interface CalcSubscribePriceInput {
  oneMealGrams: number[];
  pricePerGrams: number[];
  recipeNameList: string[];
  planName: string;
  discountPercent?: number;
  isOriginSubscriber?: boolean;
}

// 구독 아이템 가격 계산 입력 타입
export interface CalcSubscribeItemPriceInput {
  pricePerGram: number;
  oneMealGram: number;
  discountPercent: number;
  totalNumberOfPacks: number;
}

// 구독 아이템 가격 계산 출력 타입
export interface CalcSubscribeItemPriceOutput {
  perPack: number;
  originPrice: number;
  salePrice: number;
}

// 구독 가격 계산 출력 타입
export interface CalcSubscribePriceOutput {
  avgPrice: number;
  recipePrices: {
    recipeName: string;
    perPack: number;
  }[];
}

export const SUBSCRIBE_PRICE_CUTOFF_UNIT = 10;

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

// 가격 절사 유틸 함수
export const truncatePrice = (price: number): number =>
  Math.floor(price / SUBSCRIBE_PRICE_CUTOFF_UNIT) * SUBSCRIBE_PRICE_CUTOFF_UNIT;

// 레시피별 가격 계산 함수
export const calcSubscribeItemPrice = ({
  pricePerGram,
  oneMealGram,
  discountPercent,
  totalNumberOfPacks,
}: CalcSubscribeItemPriceInput): CalcSubscribeItemPriceOutput => {
  const perPackPrice = pricePerGram * oneMealGram;

  return {
    perPack: truncatePrice(perPackPrice * (1 - discountPercent / 100)),
    originPrice: truncatePrice(totalNumberOfPacks * perPackPrice),
    salePrice: truncatePrice(
      totalNumberOfPacks * perPackPrice * (1 - discountPercent / 100)
    ),
  };
};

// 전체 구독 가격 계산 함수
export const calcSubscribePrice = ({
  oneMealGrams,
  pricePerGrams,
  recipeNameList,
  planName,
  discountPercent = 0,
  isOriginSubscriber = false,
}: CalcSubscribePriceInput): CalcSubscribePriceOutput => {
  const totalNumberOfPacks = subscribePlanInfo[planName]?.totalNumberOfPacks || 0;

  const calcPriceList = oneMealGrams.map((oneMealGram, index) => {
    const pricePerGram = adjustPriceForSubscriber(
      pricePerGrams[index],
      recipeNameList[index],
      isOriginSubscriber
    );

    return calcSubscribeItemPrice({
      pricePerGram,
      oneMealGram,
      discountPercent,
      totalNumberOfPacks,
    });
  });

  const avgPrice = calcPriceList.reduce(
    (acc, item) => acc + item.perPack,
    0
  ) / calcPriceList.length;

  return {
    avgPrice: truncatePrice(avgPrice),
    recipePrices: recipeNameList.map((recipeName, index) => ({
      recipeName,
      perPack: calcPriceList[index].perPack,
    })),
  };
};