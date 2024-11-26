import { PlanName } from "@/constants";
import { RecipeDto } from "./survey";

interface PlanDiscountResponseDto {
  createdDate: string;
  modifiedDate: string;
  full: number;
  half: number;
  topping: number;
  toppingFull: number;
  toppingHalf: number;
}


interface Link {
  href: string;
}

interface Links {
  self: Link; // 현재 리소스에 대한 링크
}

interface Embedded {
  planDiscountResponseDtoList: PlanDiscountResponseDto[]; // 할인 정보 리스트
}


interface PlanDiscountResponse {
  _embedded: Embedded; // 중첩된 데이터
  _links: Links; // 하이퍼미디어 링크
}

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
  selectedVolume?: string | null;
}

export type {
  calculateOneMealGramsInput,
  calculateOneMealGramsOutput,
  calculateOneMealGramsWithVolumeInput,
  PlanDiscountResponse,
  CalculateSubscribePriceInput,
  CalculateSubscribePriceOutput,
};







export interface SubscribeDto {
  id: number;
  subscribeStatus: string;
  dogId: number;
  dogName: string;
  cancelReason?: null | string;
  subscribeCount: number;
  plan: string;
  oneMealGramsPerRecipe: string;
  oneDayRecommendKcal: number;
  nextPaymentDate: string;
  countSkipOneTime: number;
  countSkipOneWeek: number;
  nextPaymentPrice: number;
  discountCoupon: number;
  discountGrade: number;
  overDiscount: number;
  nextDeliveryDate: string;
  usingMemberCouponId?: null;
  couponName?: null;
  previousOrderConfirmDate?: null;
  subscriptionMonth?: null | number | string;
}

export interface SubscribeAddressData {
  currentAddress: AddressDto;
  nextAddress: AddressDto
  nextDeliveryDate: string;
}

export interface AddressDto {
  deliveryName?: null | string;
  recipientName: string;
  phoneNumber: string;
  zipcode: string;
  street: string;
  detailAddress: string;
  request?: null | string;
}

export interface ManageSubscribeData {
  itemNames: string;
  recipeNames: string;
  subscribeDto: SubscribeDto;
}

export interface BenefitDto {
  benefitExpiredDate: string;
  benefitId: number;
  benefitName: string;
  benefitRequestDate?: null | string | Date;
  benefitStatus: string;
  benefitUsedDate?: null | string | Date;
  benefitValue: number;
  subscribeId: number;
}
