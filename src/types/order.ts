import { Coupon } from "./subscription";

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
  SaveSubscriptionOrderRequest,
  OrderTypeKey,
  SuccessGeneralPaymentRequest,
  SuccessGeneralOrderResponse,
  OrderMessage,
  PaymentMethodInfo,
};

interface SuccessGeneralPaymentRequest {
  impUid: string;
  merchantUid: string | null;
  discountReward: number;
}

interface SuccessGeneralOrderResponse {
  _links: {
    self: {
      href: string; // 현재 API 엔드포인트
    };
    profile: {
      href: string; // 관련 API 문서 링크
    };
  };
}


interface SaveSubscriptionOrderRequest {
  customerUid: string; // 고유 사용자 ID
  memberCouponId?: number | null; // 적용된 쿠폰 ID
  deliveryDto: DeliveryDto; // 배송지 정보
  deliveryPrice: number; // 배송비
  discountCoupon: number; // 쿠폰 할인 금액
  discountGrade: number; // 등급 할인 금액
  discountReward: number; // 적립금 할인 금액
  discountSubscriptionMonth: number; // 구독 기간 할인 금액
  discountTotal: number; // 총 할인 금액
  nextDeliveryDate: string; // 다음 배송 날짜
  orderPrice: number; // 주문 금액
  overDiscount: number; // 초과 할인 금액
  paymentMethod: PaymentMethod; // 결제 방식
  paymentPrice: number; // 실제 결제 금액
  subscriptionMonth: number | null; // 구독 기간 (개월)
  agreePrivacy: boolean; // 개인정보 제공 동의 여부
  brochure: boolean; // 브로슈어 수령 여부
}

// 구독, 일반 결제 주문 정보 저장 응답
interface SaveOrderResponse {
  data: {
    id: number;
    merchantUid: string;
    status: string; // 'BEFORE_PAYMENT'와 같은 상태
    _links?: Record<string, any>; // 필요한 경우 구체적으로 선언
  };
  status: number; // HTTP 상태 코드
}

// 일반 결제 주문 정보 저장 요청
interface SaveGeneralOrderRequest {
  orderItemDtoList: OrderItemDto[];
  deliveryDto: DeliveryDto;
  deliveryId: number | null;
  orderPrice: number;
  deliveryPrice: number;
  discountTotal: number;
  discountReward: number;
  discountCoupon: number;
  overDiscount: number;
  paymentPrice: number;
  paymentMethod: PaymentMethod;
  agreePrivacy: boolean;
  brochure: boolean;
}
// 각 상품 정보 타입
interface OrderItemDto {
  itemId: number; // 상품 ID
  amount: number; // 상품 수량
  selectOptionDtoList: SelectOptionDto[]; // 상품 옵션 목록
  memberCouponId?: number | null; // 쿠폰 ID (옵션)
  discountAmount: number; // 할인 금액
  finalPrice: number; // 최종 상품 가격
}

// 상품 옵션 정보 타입
interface SelectOptionDto {
  itemOptionId: number; // 옵션 ID
  amount: number; // 옵션 수량
}

// 배송 정보 타입
interface DeliveryDto {
  name: string | null; // 수령자 이름
  phone: string | null; // 수령자 전화번호
  zipcode: string | null; // 우편번호
  street: string | null; // 도로명 주소
  detailAddress: string | null; // 상세 주소
  request: string | null; // 배송 요청사항
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
  orderItemDtoList: GeneralOrderItemRequest[];
}

interface OptionDto {
  optionId: number;
  name: string;
  price: number;
  amount: number;
}

interface GeneralOrderItem {
  itemId: number;
  amount: number;
  name: string;
  itemType: string;
  optionDtoList?: OptionDto[];
  orderLinePrice: number; // 자체 할인 후 상품 + 옵션 가격 총 가격
  originalOrderLinePrice: number; // 자체 할인 전 상품 + 옵션 가격 총 가격
  discountAmount: number;
  memberCouponId: number | null;
  deliveryFree: boolean;
}


interface DefaultAddress {
  deliveryName: string | null;
  zipcode: string;
  city: string;
  street: string;
  detailAddress: string;
}

// 일반 주문 시트 조회 응답
interface GeneralOrderSheetResponse {
  brochure: boolean;
  coupons: Coupon[];
  defaultAddress: DefaultAddress;
  deliveryId: number;
  deliveryPrice: number;
  email: string;
  freeCondition: number;
  name: string;
  orderItemDtoList: GeneralOrderItem[];
  orderPrice: number;
  phoneNumber: string;
  reward: number;
  _links: {
    self: { href: string };
    order_general: { href: string };
  };
}

interface OrderItem {
  id: number;
  name: string;
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

type PaymentMethod = "KAKAO_PAY" | "NAVER_PAY" | "CREDIT_CARD";

type OrderDetailType = 'general' | 'subscribe';

type OrderType = "subscription" | "general";

type OrderTypeKey = "SUBSCRIPTION" | "GENERAL";

type OrderMessage = "REWARD_AUTO_APPLY" | "AGREE_PRIVACY" | "BROCHURE" | "CONFIRM" | "AGREE_SUBSCRIPTION" | "SUBSCRIPTION_TITLE" | "SUBSCRIPTION_SUBTITLE" | "NO_AVAILABLE_COUPONS"