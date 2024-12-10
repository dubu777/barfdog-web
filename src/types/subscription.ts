import { subscribePlanInfo, subscribeStatus } from "@/constants";
import { RecipeDto } from "./recipe";

export type {
  PlanDiscountResponseDto,
  Links,
  Embedded,
  PlanDiscountResponse,
  RecipeMeal,
  CalculateSubscribePriceInput,
  RecipePriceDetails,
  CalculateSubscribePriceOutput,
  calculateOneMealGramsInput,
  calculateOneMealGramsOutput,
  calculateOneMealGramsWithVolumeInput,
  SubscriptionByIdDto,
  SubscribesDto,
  SubscribeAddressData,
  AddressDto,
  SubscribeListData,
  BenefitDto,
  PaymentBody,
  SubscriptionResponse,
  SubscriptionData,
  OrderSheetResponse,
  BenefitStatus,
  SubscribeSkipType,
  SubscribeStatusKey,
  PlanKey,
};


interface OrderSheetResponse {
  brochure: boolean;
  coupons: Coupon[];
  defaultAddress: DefaultAddress;
  email: string;
  grade: string;
  gradeDiscountPercent: number;
  name: string;
  nextDeliveryDate: string; // ISO 8601 형식
  phoneNumber: string;
  recipeNameList: string[];
  reward: number;
  subscribeDto: SubscribeDto;
  _links: Links;
}

interface Coupon {
  availableMaxDiscount: number;
  availableMinPrice: number;
  discountDegree: number; // 할인율 또는 금액
  discountType: "FIXED_RATE" | "FIXED_AMOUNT"; // 할인 유형
  expiredDate: string;
  memberCouponId: number;
  name: string; // 쿠폰 이름
  remaining: number; // 남은 쿠폰 수
}

interface DefaultAddress {
  deliveryName: string | null;
  zipcode: string;
  city: string;
  street: string;
  detailAddress: string;
}

interface SubscribeDto {
  id: number;
  plan: string; 
  nextPaymentPrice: number;
  discountGrade: number;
  oneMealGramsPerRecipe: string;
}

interface Links {
  self: Link;
  order_subscribe: Link;
}

interface Link {
  href: string; 
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

interface DefaultSubscribeDto {
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

interface SubscriptionByIdDto extends DefaultSubscribeDto {
  id: number;
  subscribeStatus: SubscribeStatusKey;
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

interface SubscribesDto extends DefaultSubscribeDto {
  subscribeId: number;
  pictureUrl?: null | string,
  status: SubscribeStatusKey;
  startDate: string;
  packagePrice: number;
  packageOriginalPrice: number;
  shippingLeft: number;
}

interface SubscribeAddressData {
  currentAddress: AddressDto;
  nextAddress: AddressDto;
  nextDeliveryDate: string;
}

interface AddressDto {
  deliveryName?: null | string;
  recipientName: string;
  phoneNumber: string;
  zipcode: string;
  street: string;
  detailAddress: string;
  request?: null | string;
}

interface SubscribeListData {
  itemNames: string;
  recipeNames: string;
  subscribeDto: SubscribesDto;
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

type BenefitStatus = 'AVAILABLE' | 'REQUESTED' | 'USED';

type SubscribeSkipType = 'ONCE' | 'WEEK';

type SubscribeStatusKey = keyof typeof subscribeStatus;

type PlanKey = 'FULL' | 'HALF' | 'TOPPING_FULL' | 'TOPPING_HALF' | 'TOPPING';

type PlanName = keyof typeof subscribePlanInfo;
