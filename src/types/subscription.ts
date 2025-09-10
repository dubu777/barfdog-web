import {
  DELIVERY_PLAN,
  MEAL_PLAN,
  subscriptionPlanInfo,
  subscriptionStatus,
} from "@/constants";
import { RecipeDto } from "./recipe";
import { HealthConcernType } from "./survey";
import { ValueOfTuple } from "./common";

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
  subscribeStatus: SubscribeStatus;
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
  pictureUrl?: null | string;
  status: SubscribeStatus;
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

interface SubscribeGeneralItem {
  id: number;
  imageUrl: string;
  name: string;
  originalPrice: number;
  inStock: boolean;
  benefit: string[];
  type: "topping" | "snack";
}

type MeetType = "SINGLE" | "DOUBLE";

/** 생식 레시피 아이템 */
interface RawFoodOrderItem {
  recipeId: number;
  rank: number;
  recipeNameKorea: string;
  recipeNameEnglish: string;
  /** g/kcal (서버 키 그대로: gramPerKal) */
  gramPerKal: number;
  /** g당 가격 */
  pricePerGram: number;
  displayImageUrl: string;
  healthConcernsChips: HealthConcernType[];
  /** 1회 급여 권장 g */
  oneMealRecommendGram: number;
  /** 단일/복수 단백질 구성 */
  meet: MeetType;
  /** 추천 여부 */
  isRecommend: boolean;
  ingredients: string[];
}

/** 생식 주문서 응답 루트 */
interface RawFoodOrderSheet {
  petName: string;
  oneDayRecommendKcal: number;
  inedibleFoods: string[];
  recipeList: RawFoodOrderItem[];
}

interface RawFoodPayload {
  oneMealGramsPerRecipe: number;
  discountedPrice: number;
  originalPrice: number;
  recipeId: number;
}

interface CreateSubscriptionRequest {
  deliveryPlan: DeliveryPlan;
  mealPlan: MealPlan;
  discountPrice: number;
  paymentExpectedPrice: number;
  totalOriginalPrice: number;
  rawFoods: RawFoodPayload[];
}

type BenefitStatus = "AVAILABLE" | "REQUESTED" | "USED";

type SubscriptionSkipType = "ONCE" | "WEEK";

type SubscribeStatus = keyof typeof subscriptionStatus;

type PlanKey = "FULL" | "HALF" | "TOPPING_FULL" | "TOPPING_HALF" | "TOPPING";

type PlanName = keyof typeof subscriptionPlanInfo;

type SubscriptionStep = "rawFood" | "deliveryCycle";

type DeliveryPlan = ValueOfTuple<typeof DELIVERY_PLAN>;

type MealPlan = ValueOfTuple<typeof MEAL_PLAN>;

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
  SubscribeStatus,
  PlanKey,
  PlanName,
  PlanInfo,
  SubscribeGeneralItem,
  SubscriptionStep,
  RawFoodOrderSheet,
  DeliveryPlan,
  RawFoodOrderItem,
  MealPlan,
  CreateSubscriptionRequest,
};
