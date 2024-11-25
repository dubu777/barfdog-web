import { PlanName } from "@/constants";
import { RecipeDto } from "./survey";

interface PlanDiscountResponseDto {
  createdDate: string; // 생성 날짜 (ISO 형식)
  modifiedDate: string; // 수정 날짜 (ISO 형식)
  full: number; // 전체 플랜 할인율
  half: number; // 반 플랜 할인율
  topping: number; // 토핑 플랜 할인율
  toppingFull: number; // 전체 토핑 플랜 할인율
  toppingHalf: number; // 반 토핑 플랜 할인율
}

// _links에서 self 타입
interface Link {
  href: string; // 링크 URL
}

interface Links {
  self: Link; // 현재 리소스에 대한 링크
}

interface Embedded {
  planDiscountResponseDtoList: PlanDiscountResponseDto[]; // 할인 정보 리스트
}

// 최상위 응답 타입
interface PlanDiscountResponse {
  _embedded: Embedded; // 중첩된 데이터
  _links: Links; // 하이퍼미디어 링크
}

// RecipeMeal 정보를 담는 타입
interface RecipeMeal {
  recipeId: number;
  recipeName: string;
  oneMealGram: number;
  pricePerGram: number;
}

// SubscribePrice 계산 함수 입력 타입
interface CalculateSubscribePriceInput {
  selectedRecipeMeals: RecipeMeal[];
  selectedPlan: PlanName | null;
  isOriginSubscriber: boolean;
  discountPercent?: number;
}

// RecipePriceDetails 타입 (개별 레시피 계산 결과)
interface RecipePriceDetails {
  recipeId: number;
  recipeName: string;
  discountedPackPrice: number;
  originPrice: number;
  salePrice: number;
}

// SubscribePrice 계산 함수 출력 타입
interface CalculateSubscribePriceOutput {
  averagePackPrice: number;
  recipePriceDetails: RecipePriceDetails[];
  totalOriginalPriceAllRecipes: number;
  totalDiscountedPriceAllRecipes: number;
}

interface calculateOneMealGramsInput {
  selectedRecipeIds: number[];
  recipeDtoList: RecipeDto[];
  oneDayRecommendKcal: number;
  isOriginSubscriber?: boolean;
}

interface calculateOneMealGramsOutput {
  recipeId: number;
  recipeName: string;
  oneMealGram: number;
  pricePerGram: number;
}

interface calculateOneMealGramsWithVolumeInput {
  selectedRecipeIds: number[];
  recipeDtoList: RecipeDto[];
  oneDayRecommendKcal: number;
  isOriginSubscriber?: boolean;
  selectedVolume?: string | null; // 토핑 용량 선택
}

export type {
  calculateOneMealGramsInput,
  calculateOneMealGramsOutput,
  calculateOneMealGramsWithVolumeInput,
  PlanDiscountResponse,
  CalculateSubscribePriceInput,
  CalculateSubscribePriceOutput,
};
