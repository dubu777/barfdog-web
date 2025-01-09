import { CreateGeneralOrderRequest, CreateSubscriptionOrderRequest, DeliveryDto, OrderType, OrderTypeKey, PaymentMethod } from "@/types";

export {ORDER_STATUS, PAYMENT, generalOrderBody, subscriptionOrderBody, ORDER_TYPE, initialDeliveryDto}

// 결제 전, 결제완료, 생산 중, 배송준비 중, 배송 시작, 배송 중, 배송완료, 취소됨, 환불됨
const ORDER_STATUS = {
  ALL: '',
  BEFORE_PAYMENT: '결제 전',
  PAYMENT_DONE: '결제완료',
  PRODUCING: '생산 중',
  DELIVERY_READY: '배송 준비 중',
  DELIVERY_START: '배송 시작',
  DELIVERY_DONE: '배송 완료',
  CANCEL_RESERVED_PAYMENT: '취소됨',
  CANCEL_DONE_SELLER: '취소됨',
  CANCEL_DONE_BUYER: '취소됨',
  CANCEL_PAYMENT: '취소됨',
  // HOLD: '구독 보류',
  // FAILED: '실패함',
  // RETURN_REQUEST: '',
  // RETURN_DONE: '',
  // EXCHANGE_REQUEST: '',
  // EXCHANGE_DONE: '',
  CONFIRM: '배송완료',
  FAILED: '취소됨',
}

const PAYMENT: Record<PaymentMethod, string> = {
  KAKAO_PAY: "카카오페이",
  NAVER_PAY: "네이버페이",
  CREDIT_CARD: "신용카드",
};

const generalOrderBody: CreateGeneralOrderRequest = {
  orderItemDtoList: [],
  deliveryDto: {
    name: "",
    phone: "",
    zipcode: "",
    street: "",
    detailAddress: "",
    request: "",
  },
  deliveryId: null,
  orderPrice: 0,
  deliveryPrice: 0,
  discountTotal: 0,
  discountReward: 0,
  discountCoupon: 0,
  overDiscount: 0,
  paymentPrice: 0,
  paymentMethod: "NAVER_PAY",
  agreePrivacy: false,
  brochure: false,
};


const subscriptionOrderBody: CreateSubscriptionOrderRequest = {
  customerUid: "",
  memberCouponId: null,
  deliveryDto: {
    name: "",
    phone: "",
    zipcode: "",
    street: "",
    detailAddress: "",
    request: "",
  },
  deliveryPrice: 0,
  discountCoupon: 0,
  discountGrade: 0,
  discountReward: 0,
  discountSubscriptionMonth: 0,
  discountTotal: 0,
  nextDeliveryDate: "",
  orderPrice: 0,
  overDiscount: 0,
  paymentMethod: "NAVER_PAY",
  paymentPrice: 0,
  subscriptionMonth: null,
  agreePrivacy: false,
  brochure: false,
};

const ORDER_TYPE: Record<OrderTypeKey, OrderType> = {
  GENERAL: "general",
  SUBSCRIPTION: "subscription",
} as const

const initialDeliveryDto: DeliveryDto = {
  name: null,
  phone: null,
  zipcode: null,
  street: null,
  detailAddress: null,
  request: null,
};