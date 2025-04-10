import {
  OrderMessage,
  OrderType,
  OrderTypeKey,
  PaymentMethod,
  PaymentMethodInfo,
} from "@/types";
import { TempRecipeDto } from "./survey";

// 결제 전, 결제완료, 생산 중, 배송준비 중, 배송 시작, 배송 중, 배송완료, 취소됨, 환불됨
const ORDER_STATUS = {
  ALL: "",
  RESERVED_PAYMENT: "결제 전",
  BEFORE_PAYMENT: "결제 전",
  PAYMENT_DONE: "결제완료",
  PRODUCING: "생산 중",
  DELIVERY_READY: "배송 준비 중",
  DELIVERY_START: "배송 시작",
  DELIVERY_DONE: "배송 완료",
  CANCEL_RESERVED_PAYMENT: "취소됨",
  CANCEL_DONE_SELLER: "취소됨",
  CANCEL_DONE_BUYER: "취소됨",
  CANCEL_PAYMENT: "취소됨",
  // HOLD: '구독 보류',
  // FAILED: '실패함',
  // RETURN_REQUEST: '',
  // RETURN_DONE: '',
  // EXCHANGE_REQUEST: '',
  // EXCHANGE_DONE: '',
  CONFIRM: "배송완료",
  FAILED: "취소됨",
  REVIEW_SUBMIT: "리뷰완료",
};

const PAYMENT: Record<PaymentMethod, string> = {
  CREDIT_CARD: "체크/신용카드",
  NAVER_PAY: "네이버페이",
  KAKAO_PAY: "카카오페이",
};

const ORDER_TYPE: Record<OrderTypeKey, OrderType> = {
  GENERAL: "GENERAL",
  SUBSCRIPTION: "SUBSCRIBE",
} as const;

const ORDER_MESSAGE: Record<OrderMessage, string> = {
  REWARD_AUTO_APPLY: "정기 결제일에 적립금 자동 사용",
  AGREE_PRIVACY: "개인 정보 수집 이용 동의",
  AGREE_SUBSCRIPTION: "구독 상품 정기결제 동의",
  BROCHURE: "바프독 설명이 포함된 브로슈어 받기",
  CONFIRM: "위 주문 내용을 확인했으며, 결제에 동의합니다.",
  BUNDLE_DELIVERY_TITLE: "정기구독 배송 시 묶음 배송 신청",
  BUNDLE_DELIVERY_SUBTITLE: "구독 상품과 같이 배송되어 배송비가 무료에요",
  BUNDLE_DELIVERY_UNAVAILABLE_TITLE: "묶음 배송 신청 불가능",
  BUNDLE_DELIVERY_UNAVAILABLE_SUBTITLE: "배송 예정일 당일에는 묶음 배송 신청이 불가능해요.",
  NO_AVAILABLE_COUPONS: "사용가능한 쿠폰이 없어요",
  COUPON_PLACEHOLDER: "쿠폰 번호를 입력하세요",
} as const;

const SUBSCRIPTION_NOTICE = {
  TITLE: "2주마다 자동으로 결제가 진행돼요",
  CONTENT: [
    "・ 구독을 해지하기 전까지 배송 주기마다 자동으로 결제가 진행됩니다.",
    "・ 마이페이지 > 구독 상품 관리에서 상품 배송정보, 결제수단 변경이 가능합니다.",
    "・ 결제 후, 레시피 혹은 급여량을 변경하실 경우 회차별 결제 금액이 변동될 수 있습니다.",
    "・ 결제 시점에서 보유 적립금 및 할인 정책에 따라 결제 금액이 달라질 수 있습니다.",
    "・ 결제 실패 등으로 인해 결제가 진행되지 않을 경우 정기구독이 해지될 수 있습니다.",
  ],
};

const TEMP_RECIPE_DTO_DATA: Record<string, TempRecipeDto> = {
  "STARTER PREMIUM +": {
    id: 5,
    name: "스타터 프리미엄",
    imageURL: "/images/recipe/starter_premium.png",
  },
  "TURKEY&BEEF +": {
    id: 6,
    name: "터키앤비프",
    imageURL: "/images/recipe/turkey_and_beef.png",
  },
  "DUCK&LAMB +": {
    id: 7,
    name: "덕앤램",
    imageURL: "/images/recipe/duck_and_lamb.png",
  },
  "LAMB&BEEF +": {
    id: 8,
    name: "램앤비프",
    imageURL: "/images/recipe/lamb_and_beef.png",
  },
  "Premium CHICKEN": {
    id: 9,
    name: "프리미엄 치킨",
    imageURL: "/images/recipe/premium_chicken.png",
  },
  "Premium TURKEY": {
    id: 10,
    name: "프리미엄 터키",
    imageURL: "/images/recipe/premium_turkey.png",
  },
  "Premium LAMB": {
    id: 11,
    name: "프리미엄 램",
    imageURL: "/images/recipe/premium_lamb.png",
  },
  "Premium BEEF": {
    id: 12,
    name: "프리미엄 비프",
    imageURL: "/images/recipe/premium_beef.png",
  },
};

const PAYMENT_METHOD_INFO: Record<PaymentMethod, PaymentMethodInfo> = {
  NAVER_PAY: {
    value: "NAVER_PAY",
    label: "네이버페이",
    imageUrl: "/images/social/naver_pay.svg",
  },
  KAKAO_PAY: {
    value: "KAKAO_PAY",
    label: "카카오페이",
    imageUrl: "/images/social/kakao_pay.svg",
  },
  CREDIT_CARD: {
    value: "CREDIT_CARD",
    label: "신용카드",
  },
};

export {
  ORDER_STATUS,
  PAYMENT,
  ORDER_TYPE,
  TEMP_RECIPE_DTO_DATA,
  ORDER_MESSAGE,
  PAYMENT_METHOD_INFO,
  SUBSCRIPTION_NOTICE,
};
