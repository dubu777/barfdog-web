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
  AddressResponse,
  OrderDetailType,
  GeneralOrderSheetResponse,
  GeneralOrderSheetRequest,
  GeneralOrderItem,
  GeneralOrderRequest,
  OrderItemDto,
  OrderItem,
  GeneralOrderItemDto,
};

interface GeneralOrderRequest {
  orderItemDtoList: OrderItemDto[];
  deliveryDto: DeliveryDto;
  deliveryId: number; // 묶음 배송 ID
  orderPrice: number; // 총 상품 가격
  deliveryPrice: number; // 배송비
  discountTotal: number; // 총 할인 금액
  discountReward: number; // 적립금 할인 금액
  discountCoupon: number; // 쿠폰 할인 금액
  paymentPrice: number; // 최종 결제 금액
  overDiscount: number; // 초과 할인 금액
  paymentMethod: "CREDIT_CARD" | "NAVER_PAY" | "KAKAO_PAY"; // 결제 수단
  agreePrivacy: boolean; // 개인정보 제공 동의 여부
  brochure: boolean; // 브로슈어 수령 여부
}

// 각 상품 정보 타입
interface OrderItemDto {
  itemId: number; // 상품 ID
  amount: number; // 상품 수량
  selectOptionDtoList: SelectOptionDto[]; // 상품 옵션 목록
  memberCouponId?: number; // 쿠폰 ID (옵션)
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
  name: string; // 수령자 이름
  phone: string; // 수령자 전화번호
  zipcode: string; // 우편번호
  street: string; // 도로명 주소
  detailAddress: string; // 상세 주소
  request: string; // 배송 요청사항
}

interface GeneralOrderItemDto {
  itemDto: {
    itemId: number;
    amount: number;
  };
  itemOptionDtoList: {
    itemOptionId: number;
    amount: number;
  }[];
}

interface GeneralOrderSheetRequest {
  orderItemDtoList: GeneralOrderItemDto[];
}

interface GeneralOrderItem {
  itemId: number;
  amount: number;
  name: string;
  itemType: string;
  selectOptionDtoList?: {
    itemOptionId: number;
    amount: number;
    name: string;
    price: number;
  }[];
  memberCouponId: number | null;
  discountAmount: number;
  originalOrderLinePrice: number;
  orderLinePrice: number;
  deliveryFree: boolean;
}

interface DefaultAddress {
  deliveryName: string | null;
  zipcode: string;
  city: string;
  street: string;
  detailAddress: string;
}

interface GeneralOrderSheetResponse {
  brochure: boolean;
  coupons: Coupon[];
  defaultAddress: DefaultAddress;
  deliveryId: number;
  deliveryPrice: number;
  email: string;
  freeCondition: number;
  name: string;
  orderItemDtoList: OrderItem[];
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

interface AddressResponse {
  id: number;
  city: string;
  street: string;
  zipcode: string;
  detailAddress: string;
  phoneNumber: string;
  recipientName: string;
  deliveryName: string | null;
  default: boolean;
  request: string | null;
}

type PaymentMethod = "KAKAO_PAY" | "NAVER_PAY" | "CREDIT_CARD";

type OrderDetailType = 'general' | 'subscribe';
