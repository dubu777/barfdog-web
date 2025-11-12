import {
  DELIVERY_PLAN,
  MEAL_PLAN,
  PLAN,
  SUBSCRIPTION_STATUSES,
  subscriptionPlanInfo,
} from "@/constants";
import { HealthConcernType } from "./survey";
import { UrlObject, ValueOfTuple } from "./common";

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

interface RawFoodOrderSheet {
  petName: string;
  petId: number;
  oneDayRecommendKcal: number;
  inedibleFoods: string[];
  recipeList: RawFoodOrderItem[];
}

interface RecipeListType {
  gramsPerMeal: number; // 해당 레시피 1팩당 급여량(g)
  originalPricePerMeal: number; // 할인 적용 전 한 팩당 가격
  totalOriginalPrice: number; // originalPricePerMeal * 배송 주기 당 팩수 => FULL(2주 2끼)일 경우, originalPricePerMeal * 14 * 2
  recipeId: number;
}

interface CreateSubscriptionRequest {
  plan: Plan;
  recipeList: RecipeListType[];
}

interface UpdateSubscriptionRequest extends CreateSubscriptionRequest {
  isAgreeSubscription: boolean;
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

type RecipeFormItem = {
  recipeId: number;
  gramsPerMeal: number;
  pricePerMeal: number;
};

interface SubscriptionValues {
  mealPlan: MealPlan;
  deliveryPlan: DeliveryPlan;
  recipeList: RecipeFormItem[] | [];
  isAgreeSubscription?: boolean;
}

interface CurrentPlanInfo {
  name: Plan | string;
  /** 구독 주기(주) */
  weeks: DeliveryPlan;
  /** 구독 주기(일) */
  days: number;
  /** 1일 급여 횟수 */
  mealCount: MealPlan;
}

interface CurrentRecipeItem {
  displayImageUrl: UrlObject;
  recipeId: number;
  name: string;
  gramsPerMeal: number; // 이 레시피의 1끼 급여량(g)
  pricePerGram: number;
  originalPricePerMeal: number;
}

interface GradeInfo {
  grade: string;
  discountPercent: number; // 할인율
  rewardPercent: number; // 적립율
}

interface SubscriptionInfoResponse {
  subscriptionId: number;
  subscriptionCount: number;
  planInfo: CurrentPlanInfo;
  gradeInfo: GradeInfo;
  recipeList: CurrentRecipeItem[];
  paymentPrice: number; // 최종 결제 금액
}

/** 생식 레시피 아이템 */
interface RawFoodOrderItem {
  recipeId: number;
  rank: number;
  recipeNameKorea: string;
  recipeNameEnglish: string;
  gramPerKal: number;
  pricePerGram: number;
  displayImageUrl: UrlObject;
  healthConcernsChips: HealthConcernType[];
  oneMealRecommendGram: number;
  meet: MeetType;
  isRecommend: boolean;
  subIngredients: string[];
  ingredients: string[];
}

/** 추천 설문 정보를 포함한 레시피 정보 */
interface SubscriptionOrderSheet {
  petName: string;
  petId: number;
  oneDayRecommendKcal: number;
  inedibleFoods: string[];
  recipeList: RawFoodOrderItem[];
}

type PlanKey = "FULL" | "HALF" | "TOPPING_FULL" | "TOPPING_HALF" | "TOPPING";

type PlanName = keyof typeof subscriptionPlanInfo;

type Plan = ValueOfTuple<typeof PLAN>;

type SubscriptionStep = "rawFood" | "deliveryCycle";

type SubscriptionEditStep = "summary" | "edit" | "confirm";

type DeliveryPlan = ValueOfTuple<typeof DELIVERY_PLAN>;

type MealPlan = ValueOfTuple<typeof MEAL_PLAN>;

type SubscriptionStatus = ValueOfTuple<typeof SUBSCRIPTION_STATUSES>;
export type {
  PlanDiscountResponse,
  AddressDto,
  PaymentBody,
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
  RecipeFormItem,
  SubscriptionInfoResponse,
  CurrentPlanInfo,
  CurrentRecipeItem,
  SubscriptionOrderSheet,
  Plan,
  RecipeListType,
};
