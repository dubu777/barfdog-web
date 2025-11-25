import { PAYMENT_METHOD } from "@/constants";
import {
  GradeInfo,
  PlanInfo,
  PlanName,
  SubscribeRecipeItem,
} from "./subscription";
import { DiscountType, UrlObject } from "./common";
import { DeliveryAddress } from "./delivery";

interface SuccessGeneralPaymentRequest {
  impUid: string;
  merchantUid: string | null;
  discountReward: number;
  memberCouponId: number | null;
}

// 구독, 일반 결제 주문 정보 저장 응답
interface SaveOrderResponse {
  id: number;
  merchantUid: string;
  status: string; // 'BEFORE_PAYMENT'와 같은 상태
}

// 일반 결제 주문 정보 저장 요청
interface SaveGeneralOrderRequest {
  orderItemDtoList: OrderItemDto[];
  deliveryDto: DeliveryAddress;
  deliveryId: number | null;
  orderPrice: number;
  deliveryPrice: number;
  discountTotal: number;
  discountReward: number;
  discountCoupon: number;
  paymentPrice: number;
  overDiscount: number;
  memberCouponId: number | null;
  paymentMethod: PaymentMethod;
  agreePrivacy: boolean;
}
// 각 상품 정보 타입
interface OrderItemDto {
  itemId: number; // 상품 ID
  amount: number; // 상품 수량
  selectOptionDtoList: SelectOptionDto[]; // 상품 옵션 목록
}

// 상품 옵션 정보 타입
interface SelectOptionDto {
  itemOptionId: number; // 옵션 ID
  amount: number; // 옵션 수량
}

// 배송 정보 타입
interface DeliveryDto {
  recipientName: string; // 수령자 이름
  phoneNumber: string; // 수령자 전화번호
  zipcode: string; // 우편번호
  street: string; // 도로명 주소
  detailAddress: string; // 상세 주소
  request: string; // 배송 요청사항
}

interface GeneralOrderItemRequest {
  itemDto: {
    itemId: number;
    amount: number;
  };
  itemOptionDtoList: {
    itemOptionId: number;
    amount: number;
  }[];
}

// 일반 주문 시트 조회 요청
interface GeneralOrderSheetRequest {
  orderItemDtoList: OrderItemDto[];
}

interface OptionDto {
  amount: number;
  name: string;
  optionId: number;
  price: number;
}

interface GeneralOrderItem {
  itemId: number;
  itemSalePrice: number; // 자체 할인 후 상품 + 옵션 가격 총 가격
  itemOriginalPrice: number; // 상품 원금 + 옵션 가격 총 가격
  name: string;
  itemType: string;
  optionDtoList?: OptionDto[];
  amount: number;
  deliveryFree: boolean;
  discountedItemAndOptionPrice: number;
  itemImageFilename: UrlObject;
}

interface DefaultAddress {
  id: number;
  deliveryName: string | null;
  recipientName: string;
  phoneNumber: string;
  zipcode: string;
  city: string;
  street: string;
  default: boolean;
  detailAddress: string;
  request: string;
}

interface BundleDeliveryAddress {
  id: number;
  deliveryName: string;
  recipientName: string; // 수령자 이름
  phoneNumber: string; // 수령자 전화번호
  zipcode: string; // 우편번호
  detailAddress: string; // 상세 주소
  street: string; // 도로명 주소
}

type OrderStatus =
  | "UNSUBSCRIBE_ORDER"
  | "TODAY_IS_NEXT_DELIVERY"
  | "SUBSCRIBE_ORDER";

// 일반 주문 시트 조회 응답
interface GeneralOrderSheetResponse {
  orderItemDtoList: GeneralOrderItem[];
  defaultAddress: DefaultAddress;
  deliveryAddress: DeliveryAddress[];
  deliveryPrice: number;
  email: string;
  freeCondition: number;
  nextSubscribeDeliveryDate: string;
  orderPrice: number;
  orderStatus: OrderStatus;
  reward: number;
}

interface OrderItem {
  id: number;
  name: string;
}

interface SubscriptionOrderSheetResponse {
  autoUseReward: boolean;
  defaultAddress: DefaultAddress;
  deliveryDate: string; // 현재 결제 건 배송 예정일
  discountSubscribeAlliance: number;
  email: string;
  grade: string;
  gradeDiscountPercent: number;
  newSubscribe: boolean; // 첫 구독 여부
  nextDeliveryDate: string; // 다음 배송 예정일
  recipeNameList: string[];
  reward: number;
  subscribeDto: SubscribeDto;
}

interface CheckoutCoupon {
  memberCouponId: number;
  name: string;
  discountType: DiscountType;
  discountDegree: number;
  availableMaxDiscount: number;
  availableMinPrice: number;
  remaining: number;
  expiredDate: string;
}

interface SubscriptionCheckoutSheetResponse {
  subscribeVo: {
    subscriptionId: number;
    plan: string; // Todo: API 수정 후 MealPlan 으로 변경
    nextPaymentPrice: number;
    discountGrade: number;
  };
  /** 회원 등급명 (예: "더바프") */
  grade: string;
  /** 등급 할인율(%) */
  gradeDiscountPercent: number;
  email: string;
  /** 기본 배송지 */
  defaultAddress: DefaultAddress;
  mealPlan: string; // Todo: API 수정 후 MealPlan 으로 변경
  deliveryPlan: string; // Todo: API 수정 후 DeliveryPlan 으로 변경
  /** 이번 배송일 (YYYY-MM-DD) */
  deliveryDate: string;
  /** 다음 배송일 (YYYY-MM-DD) */
  nextDeliveryDate: string;
  reward: number;
  /** 신규 구독 여부 */
  newSubscribe: boolean;
  /** 리워드 자동 사용 여부 */
  autoUseReward: boolean;
  coupons: CheckoutCoupon[];
  allianceCoupons: CheckoutCoupon[];
  rawFoodList: RawFoodItemSummary[];
  totalOriginPrice: number; // 구독 할인 전 총 원금
  orderId: number; // 이번 결제 건 주문 ID
}

interface RawFoodItemSummary {
  displayImageUrl: {
    url: string;
  };
  recipeId: number;
  name: string;
  /** 레시피별 1끼 권장 급여량(g) */
  oneMealGramsPerRecipe: number;
  originalPrice: number; // 구독 할인 전 원금
  /** g당 가격 */
  pricePerGram: number;
}

interface SubscribeDto {
  id: number;
  plan: PlanName;
  nextPaymentPrice: number;
  discountGrade: number;
  oneMealGramsPerRecipe: string;
}

interface OrderRecipeDto {
  thumbnailUrl: string;
  recipeName: string;
}

interface OrderDto {
  id: number;
  orderId: number;
  merchantUid: string;
  orderDate: string;
  orderStatus: string;
  paymentPrice: number;
  paymentMethod?: string;
}

interface SubscriptionOrderDto extends OrderDto {
  orderId: number;
  subscribeId: number;
  dogName: string;
  subscribeCount: number;
  customerUid: string | null;
  paid: boolean;
}

interface OrderCancel {
  cancelReason: string;
  cancelDetailReason: string;
  cancelRequestDate: string;
  cancelConfirmDate: string;
}

interface SelectOptionDtoList {
  itemOptionId: number;
  amount: number;
}

interface OrderItemDtoList {
  orderItemId: number;
  thumbnailUrl: string;
  selectOptionDtoList: SelectOptionDtoList[];
  itemId: number;
  itemName: string;
  amount: number;
  finalPrice: number;
  discountAmount: number;
  status: string;
  saveReward: number;
  category: string;
  orderCancel: OrderCancel;
  orderReturn?: null;
  orderExchange?: null;
}

interface SubscriptionOrderData {
  recipeDto: OrderRecipeDto;
  orderDto: SubscriptionOrderDto;
}

interface GeneralOrderData {
  itemNameList: OrderItem[];
  orderDto: OrderDto;
  thumbnailUrl: string;
}

type MergeOrderData = (GeneralOrderData | SubscriptionOrderData)[];

interface OrderDetailDto extends OrderCancel {
  orderId?: number;
  merchantUid?: string;
  itemId?: number;
  itemName?: string;
  recipientName?: string;
  recipientPhone?: string;
  paymentDate?: string;
  orderDate?: string;
  deliveryNumber?: null | number | string;
  deliveryCode?: null | number | string;
  transUniqueCd?: null | number | string;
  arrivalDate?: null | number | string;
  orderPrice: number;
  deliveryPrice: number;
  discountGrade: number;
  discountTotal: number;
  discountReward: number;
  discountCoupon: number;
  overDiscount: number;
  paymentPrice: number;
  paymentMethod: PaymentMethod;
  name?: string;
  phone?: string;
  zipcode?: string;
  street?: string;
  detailAddress?: string;
  request?: null | number | string;
  orderStatus?: string;
  package?: boolean;
  thumbnailUrl?: string;
  oneMealGramsPerRecipe?: string;
  saveReward?: string | number;
  saveRewardTotal?: string | number;
}

interface OrderCancel {
  cancelReason: string;
  cancelDetailReason: string;
  cancelRequestDate: string;
  cancelConfirmDate: string;
}

interface SelectOptionDtoList {
  itemOptionId: number;
  amount: number;
}

interface OrderDetailData {
  orderDto: OrderDetailDto;
  orderItemDtoList: OrderItemDtoList[];
  savedRewardTotal: number;
  recipeNames?: string;
}

interface MergeOrderAndRecipe extends OrderDetailData {
  recipeDto?: OrderRecipeDto;
}

interface PaymentMethodInfo {
  value: PaymentMethod;
  label: string;
  imageUrl?: string;
}

interface PaymentResponse {
  success: boolean;
  customer_uid: string;
  error_msg?: string;
  imp_uid?: string;
  merchant_uid?: string;
}

interface PaymentData {
  customerUid: string;
  merchantUid: string;
  amount: number;
  name: string;
  buyerName: string;
  buyerTel: string;
  buyerEmail: string;
  buyerAddr: string;
  buyerPostcode: string;
}

interface PaymentValidationData {
  orderId: number;
  impUid: string;
  customerUid: string;
  discountReward: number;
  merchantUid: string;
}

// 구독 결제 페이지 조회
interface SubscriptionCheckoutResponse {
  memberInfo: MemberInfo;
  subscribeInfo: SubscribeInfo;
  deliveryInfo: DeliveryInfo;
  paymentInfo: PaymentInfo;
}

/**
 * 회원 정보
 */
interface MemberInfo {
  id: number;
  /** 사용 가능한 적립금 */
  availableReward: number;
  gradeInfo: GradeInfo;
}

interface SubscribeInfo {
  id: number;
  planInfo: PlanInfo;
  recipeList: SubscribeRecipeItem[];
}

/**
 * 배송 정보 전체
 */
interface DeliveryInfo {
  /** 기본 배송지, 없으면 null */
  defaultAddress: DeliveryAddress | null;
  /** 이번 배송일 (YYYY-MM-DD) */
  currentDeliveryDate: string;
  /** 다음 배송 예정일 (YYYY-MM-DD) */
  nextDeliveryDate: string;
}

/**
 * 결제 금액 정보
 */
interface PaymentInfo {
  /** 총 상품금액(원금) */
  originalPrice: number;
  /** 플랜 할인 금액 */
  discountPlan: number;
  /** 등급 할인 금액 */
  discountGrade: number;
}

interface PrepareSubscriptionPaymentResponse {
  orderId: number;
  orderStatus: string;
  merchantUid: string;
}

interface PrepareSubscriptionPaymentRequest {
  subscribeId: number;
  memberCouponId?: number | null;
  deliveryInfo: DeliveryInfoRequest;
  paymentInfo: PaymentInfoRequest;
}

interface DeliveryInfoRequest {
  address: DeliveryAddress;
  currentDeliveryDate: string;
}

interface PaymentInfoRequest {
  customerUid: string;
  /** 상품 원금  */
  originalPrice: number;
  /** 플랜 할인 금액 */
  discountPlan: number;
  /** 등급 할인 금액 */
  discountGrade: number;
  /** 쿠폰 할인 금액 */
  discountCoupon: number;
  /** 적립금 사용 금액 */
  discountReward: number;
  /** 총 할인 금액 */
  discountTotal: number;
  /** 초과 할인 금액 (0 이상일 때, 할인 한도를 넘은 부분 등) */
  overDiscount: number;
  /** 배송비 */
  deliveryPrice: number;
  /** 최종 결제금액 */
  paymentPrice: number;
  /** 결제 수단 */
  paymentMethod: PaymentMethod;
  /** 적립 예정 금액 */
  saveReward: number;
}

type PaymentMethod = keyof typeof PAYMENT_METHOD;

type OrderDetailType = "general" | "subscribe";

type OrderType = "SUBSCRIBE" | "GENERAL";

type OrderTypeKey = "SUBSCRIPTION" | "GENERAL";

export type {
  SubscriptionOrderData,
  GeneralOrderData,
  OrderDetailDto,
  SubscriptionOrderDto,
  OrderItemDtoList,
  MergeOrderData,
  OrderDetailData,
  MergeOrderAndRecipe,
  PaymentMethod,
  OrderDetailType,
  GeneralOrderSheetResponse,
  GeneralOrderSheetRequest,
  GeneralOrderItem,
  OrderItemDto,
  OrderItem,
  GeneralOrderItemRequest,
  SaveOrderResponse,
  SaveGeneralOrderRequest,
  OrderType,
  DeliveryDto,
  OrderTypeKey,
  SuccessGeneralPaymentRequest,
  PaymentMethodInfo,
  BundleDeliveryAddress,
  DefaultAddress,
  OrderStatus,
  SubscriptionOrderSheetResponse,
  PaymentResponse,
  PaymentData,
  PaymentValidationData,
  SubscribeDto,
  SubscriptionCheckoutSheetResponse,
  RawFoodItemSummary,
  SubscriptionCheckoutResponse,
  DeliveryInfo,
  PrepareSubscriptionPaymentRequest,
  DeliveryInfoRequest,
  PaymentInfoRequest,
  PrepareSubscriptionPaymentResponse,
};
