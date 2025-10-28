import {
  DELIVERY_PLAN,
  MEAL_PLAN,
  SUBSCRIPTION_STATUSES,
  subscriptionPlanInfo,
} from "@/constants";
import { HealthConcernType } from "./survey";
import { UrlObject, ValueOfTuple } from "./common";
import { RecipeDto } from "./recipes";

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
  displayImageUrl: UrlObject;
  healthConcernsChips: HealthConcernType[];
  /** 1회 급여 권장 g */
  oneMealRecommendGram: number;
  /** 단일/복수 단백질 구성 */
  meet: MeetType;
  /** 추천 여부 */
  isRecommend: boolean;
  subIngredients: string[];
  ingredients: string[];
}

/** 생식 주문서 응답 루트 */
interface RawFoodOrderSheet {
  petName: string;
  petId: number;
  oneDayRecommendKcal: number;
  inedibleFoods: string[];
  recipeList: RawFoodOrderItem[];
}

interface RawFoodPayload {
  oneMealGramsPerRecipe: number; // 해당 레시피 1팩당 급여량(g)
  originalPrice: number; // 할인 적용 전 가격
  recipeId: number;
}

interface CreateSubscriptionRequest {
  deliveryPlan: DeliveryPlan;
  mealPlan: MealPlan;
  paymentExpectedPrice: number; // 할인 적용된 최종 결제 예정 금액
  originPrice: number; // 할인 적용 전 전체 금액
  rawFoods: RawFoodPayload[];
}

interface CreateSubscriptionResponse {
  subscriptionId: number;
}

interface RawFoodDetailResponse {
  recipeId: number;
  recipeNameKorea: string;
  recipeNameEnglish: string;
  gramPerKal: number;
  pricePerGram: number;
  ingredients: string[];
  primaryIngredients: string[];
  itemImageUrl: string;
}

interface RawFood {
  recipeId: number;
  name: string;
  oneMealGramsPerRecipe: number;
  pricePerGram: number;
  originalPrice: number;
  displayImageUrl: UrlObject;
}

interface SubscriptionDetail {
  deliveryPlan: DeliveryPlan;
  mealPlan: MealPlan;
  next: boolean; // false면 이번 배송부터 변경가능
  orderId: number;
  paymentPrice: number; // 결제한 금액
  rawFoods: RawFood[];
  subscriptionCount: number; // 현재 구독 회차
  subscriptionId: number;
}

interface UpdateSubscriptionRequest {
  isNext: boolean; // 다음 배송부터 변경할지 여부 - false면 이번 배송부터 변경
  deliveryPlan: DeliveryPlan;
  isAgreeSubscription: boolean; // 구독 약관 동의 여부
  mealPlan: MealPlan;
  discountPrice: number; // 할인 금액
  paymentExpectedPrice: number; // 할인 적용된 최종 결제 예정 금액
  updatePrice: number; // 할인 적용 전 전체 금액
  rawFoods: RawFoodPayload[];
}

type RawFoodFormItem = {
  recipeId: number;
  packGrams: number;
  packPrice: number;
};

interface SubscriptionValues {
  mealPlan: MealPlan;
  deliveryPlan: DeliveryPlan;
  rawFoods: RawFoodFormItem[] | [];
}

type PlanKey = "FULL" | "HALF" | "TOPPING_FULL" | "TOPPING_HALF" | "TOPPING";

type PlanName = keyof typeof subscriptionPlanInfo;

type SubscriptionStep = "rawFood" | "deliveryCycle";

type SubscriptionEditStep = "summary" | "edit" | "confirm";

type DeliveryPlan = ValueOfTuple<typeof DELIVERY_PLAN>;

type MealPlan = ValueOfTuple<typeof MEAL_PLAN>;

type SubscriptionStatus = ValueOfTuple<typeof SUBSCRIPTION_STATUSES>;
export type {
  PlanDiscountResponse,
  RecipeMeal,
  CalculateSubscribePriceInput,
  RecipePriceDetails,
  CalculateSubscribePriceOutput,
  calculateOneMealGramsInput,
  calculateOneMealGramsOutput,
  calculateOneMealGramsWithVolumeInput,
  AddressDto,
  PaymentBody,
  SubscriptionResponse,
  SubscriptionData,
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
  RawFoodDetailResponse,
  CreateSubscriptionResponse,
  SubscriptionStatus,
  UpdateSubscriptionRequest,
  SubscriptionDetail,
  RawFood,
  SubscriptionEditStep,
  SubscriptionValues,
  RawFoodFormItem,
};
