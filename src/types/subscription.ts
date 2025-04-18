import { subscriptionPlanInfo, subscriptionStatus } from "@/constants";
import { RecipeDto } from "./recipe";
import { DiscountType } from "./coupon";

export type {
  PlanDiscountResponse,
  RecipeMeal,
  CalculateSubscribePriceInput,
  RecipePriceDetails,
  CalculateSubscribePriceOutput,
  calculateOneMealGramsInput,
  calculateOneMealGramsOutput,
  calculateOneMealGramsWithVolumeInput,
  SubscriptionDetailDto,
  SubscriptionDto,
  SubscriptionAddressData,
  AddressDto,
  SubscriptionListData,
  BenefitDto,
  PaymentBody,
  SubscriptionResponse,
  SubscriptionData,
  BenefitStatus,
  SubscriptionSkipType,
  SubscriptionStatusKey,
  PlanKey,
  PlanName,
  Coupon,
  PlanInfo,
};



interface Coupon {
  availableMaxDiscount: number;
  availableMinPrice: number; // 최소 사용 금액
  couponTarget: "ALL" | "GENERAL" | "SUBSCRIBE";
  description: string;
  discountDegree: number; // 할인율 또는 금액
  discountType: DiscountType; // 할인 유형
  expiredDate: string;
  memberCouponId: number;
  name: string; // 쿠폰 이름
  remaining: number; // 남은 쿠폰 수
}



interface SubscriptionResponse<T> {
  isDone: boolean;
  status: number;
  error: string;
  data: T;
}

interface SubscriptionData {
  [key: string]: any; // 실제 데이터 구조에 따라 수정 필요
}


interface PaymentBody {
  plan: PlanName | null;
  recipeIdList: number[];
  nextPaymentPrice: number;
  oneDayRecommendKcal: number;
  subscribeItemList: string[] | null;
}

interface PlanDiscountResponse {
  createdDate: string;
  modifiedDate: string;
  full: number;
  half: number;
  topping: number;
  toppingFull: number;
  toppingHalf: number;
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

interface DefaultSubscriptionDto {
  plan: string;
  dogName: string;
  countSkipOneTime: number;
  countSkipOneWeek: number;
  nextPaymentDate: string;
  nextPaymentPrice: number;
  discountCoupon: number;
  discountGrade: number;
  overDiscount: number;
  subscriptionMonth: number;
  nextDeliveryDate: string | null;
}

interface SubscriptionDetailDto extends DefaultSubscriptionDto {
  id: number;
  subscribeStatus: SubscriptionStatusKey;
  dogId: number;
  dogName: string;
  cancelReason?: null | string;
  subscribeCount: number;
  plan: PlanKey;
  oneMealGramsPerRecipe: string;
  oneDayRecommendKcal: number;
  usingMemberCouponId?: null | number;
  couponName?: null | string;
  previousOrderConfirmDate?: null | string;
}

interface SubscriptionDto extends DefaultSubscriptionDto {
  subscribeId: number;
  pictureUrl?: null | string,
  status: SubscriptionStatusKey;
  startDate: string;
  packagePrice: number;
  packageOriginalPrice: number;
  shippingLeft: number;
}

interface SubscriptionAddressData {
  currentAddress: AddressDto;
  nextAddress: AddressDto;
  nextDeliveryDate: string;
}

interface AddressDto {
  deliveryName?: string;
  recipientName?: string;
  phoneNumber?: string;
  zipcode: string;
  street: string;
  city: string;
  detailAddress: string;
  request?: string;
}

interface SubscriptionListData {
  itemNames: string;
  recipeNames: string;
  subscribeDto: SubscriptionDto;
}

interface BenefitDto {
  benefitExpiredDate: string;
  benefitId: number;
  benefitName: string;
  benefitRequestDate?: null | string | Date;
  benefitStatus: string;
  benefitUsedDate?: null | string | Date;
  benefitValue: number;
  subscribeId: number;
}

interface PlanInfo {
  id: string;
  label: string;
  numberOfPacksPerDay: number;
  weeklyPaymentCycle: number;
  totalNumberOfPacks: number;
  maxRecipeCount?: number;
}

type BenefitStatus = 'AVAILABLE' | 'REQUESTED' | 'USED';

type SubscriptionSkipType = 'ONCE' | 'WEEK';

type SubscriptionStatusKey = keyof typeof subscriptionStatus;

type PlanKey = 'FULL' | 'HALF' | 'TOPPING_FULL' | 'TOPPING_HALF' | 'TOPPING';

type PlanName = keyof typeof subscriptionPlanInfo;
