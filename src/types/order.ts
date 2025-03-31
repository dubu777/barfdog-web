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
  BundleDeliveryAddress,
  DefaultAddress,
  ClientDeliveryDto,
  OrderStatus,
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
  paymentPrice: number;
  overDiscount: number;
  memberCouponId: number | null;
  finalPrice: number;
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

interface ClientDeliveryDto extends DeliveryDto {
  deliveryId: number;
  deliveryName: string;
  default: boolean;
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
  amount: number;
  name: string;
  optionId: number;
  price: number;
}

interface GeneralOrderItem {
  amount: number;
  deliveryFree: boolean;
  discountedItemAndOptionPrice: number;
  itemId: number;
  itemImageFilename: string;
  itemOriginalPrice: number; // 상품 원금 + 옵션 가격 총 가격
  itemSalePrice: number; // 자체 할인 후 상품 + 옵션 가격 총 가격
  itemType: string;
  name: string;
  optionDtoList?: OptionDto[];
}


interface DefaultAddress {
  city: string;
  default: boolean;
  deliveryName: string | null;
  detailAddress: string;
  id: number;
  phoneNumber: string;
  recipientName: string;
  request: string;
  street: string;
  zipcode: string;
}

interface BundleDeliveryAddress {
  deliveryName: string;
  detailAddress: string; // 상세 주소
  id: number;
  recipientName: string; // 수령자 이름
  phoneNumber: string; // 수령자 전화번호
  zipcode: string; // 우편번호
  street: string; // 도로명 주소
}

type OrderStatus = "UNSUBSCRIBE_ORDER" | "TODAY_IS_NEXT_DELIVERY" | "SUBSCRIBE_ORDER"

// 일반 주문 시트 조회 응답
interface GeneralOrderSheetResponse {
  defaultAddress: DefaultAddress;
  deliveryAddress: BundleDeliveryAddress[];
  deliveryPrice: number;
  email: string;
  freeCondition: number;
  name: string;
  nextSubscribeDeliveryDate: string;
  orderItemDtoList: GeneralOrderItem[];
  orderPrice: number;
  orderStatus: OrderStatus;
  phoneNumber: string;
  reward: number;
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

type OrderType = "SUBSCRIBE" | "GENERAL";

type OrderTypeKey = "SUBSCRIPTION" | "GENERAL";

type OrderMessage = "REWARD_AUTO_APPLY" | "AGREE_PRIVACY" | "BROCHURE" | "CONFIRM" | "AGREE_SUBSCRIPTION" | "BUNDLE_DELIVERY_TITLE" | "BUNDLE_DELIVERY_SUBTITLE" | "BUNDLE_DELIVERY_UNAVAILABLE_TITLE" | "BUNDLE_DELIVERY_UNAVAILABLE_SUBTITLE" | "NO_AVAILABLE_COUPONS" | "COUPON_PLACEHOLDER"