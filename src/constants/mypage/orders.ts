import { toLabelValueList } from "@/utils/toLabelValueList";

// 클라이언트에서 사용하는 주문 타입 (대문자)
const ORDER_TYPE = {
  SUBSCRIPTION: "정기구독",
  GENERAL: "일반상품",
} as const;

// 서버 API 파라미터 매핑 (클라이언트 → 서버)
const ORDER_TYPE_TO_SERVER_PARAM = {
  SUBSCRIPTION: "subscribe",
  GENERAL: "general",
} as const;

// 서버 API 파라미터 → 클라이언트 타입 매핑 (서버 → 클라이언트)
const SERVER_PARAM_TO_ORDER_TYPE = {
  subscribe: "SUBSCRIPTION",
  general: "GENERAL",
} as const;

// UI 표시용 라벨
const ORDER_TYPE_LABEL = {
  SUBSCRIPTION: "구독상품",
  GENERAL: "일반상품",
} as const;

const ORDER_TYPE_LIST = toLabelValueList(ORDER_TYPE);

// 유틸리티 함수들
const getServerParam = (orderType: keyof typeof ORDER_TYPE) => 
  ORDER_TYPE_TO_SERVER_PARAM[orderType];

const getOrderTypeFromServerParam = (serverParam: keyof typeof SERVER_PARAM_TO_ORDER_TYPE) => 
  SERVER_PARAM_TO_ORDER_TYPE[serverParam];

// 미노출 주문 상태
const HIDDEN_ORDER_STATUS = {
  BEFORE_PAYMENT: '결제 전', 
  CANCEL_PAYMENT: '결제 취소', 
  CANCEL_RESERVED_PAYMENT: '예약결제 취소', 
  HOLD: '구독 보류', 
  RESERVED_PAYMENT: '예약됨', 
  FAILED: '실패함', 
  FAILED_RESERVED_PAYMENT: '예약결제 실패', 
} as const;

// 노출 주문 상태
const VISIBLE_ORDER_STATUS = {
  PAYMENT_DONE: '결제완료',
  DELIVERY_BEFORE_COLLECTION: '배송 예정',
  PRODUCING: '생산 중',
  DELIVERY_READY: '배송 준비 중',
  TODAY_IS_NEXT_DELIVERY: '배송 준비 중',
  DELIVERY_START: '배송 시작',
  DELIVERY_DONE: '배송 완료',
  CONFIRM: '구매 확정',
  
  CANCEL_REQUEST: '취소 요청',
  CANCEL_DONE_SELLER: '취소 완료 (판매자 귀책)',
  CANCEL_DONE_BUYER: '취소 완료 (구매자 귀책)',
  
  RETURN_REQUEST: '반품 요청',
  RETURN_DONE_SELLER: '반품 완료 (판매자 귀책)',
  RETURN_DONE_BUYER: '반품 완료 (구매자 귀책)',
  
  EXCHANGE_REQUEST: '교환 요청',
  EXCHANGE_DONE_SELLER: '교환 완료 (판매자 귀책)',
  EXCHANGE_DONE_BUYER: '교환 완료 (구매자 귀책)',
  
} as const;

// 주문 상태 단계 정의 (숫자가 높을수록 진행된 단계)
const ORDER_STATUS_STEPS = {
  PAYMENT_DONE: 1,                    // 결제완료
  PRODUCING: 2,                       // 생산 중
  DELIVERY_BEFORE_COLLECTION: 3,      // 배송 예정
  DELIVERY_READY: 3,                  // 배송 준비 중
  TODAY_IS_NEXT_DELIVERY: 3,          // 배송 준비 중
  DELIVERY_START: 4,                  // 배송 시작
  DELIVERY_DONE: 5,                   // 배송 완료
  CONFIRM: 6,                         // 구매 확정
  
  // 취소/반품/교환은 별도 처리 (단계 없음)
  CANCEL_REQUEST: 0,
  CANCEL_DONE_SELLER: 0,
  CANCEL_DONE_BUYER: 0,
  RETURN_REQUEST: 0,
  RETURN_DONE_SELLER: 0,
  RETURN_DONE_BUYER: 0,
  EXCHANGE_REQUEST: 0,
  EXCHANGE_DONE_SELLER: 0,
  EXCHANGE_DONE_BUYER: 0,
} as const;

// 모든 주문 상태
const ORDER_STATUS = {
  ...HIDDEN_ORDER_STATUS,
  ...VISIBLE_ORDER_STATUS,
} as const;


// 미노출 상태 배열
const HIDDEN_STATUS_LIST = Object.keys(HIDDEN_ORDER_STATUS);

// 노출 상태 배열
const VISIBLE_STATUS_LIST = Object.keys(VISIBLE_ORDER_STATUS);

const DELIVERY_COMPANY_CODE = {
  CJGLS: "CJ 대한통운",
  EPOST: "우체국",
} as const;

const CANCEL_REASON_LIST = [
  '구매의사 취소 (구매자 귀책)',
  '다른 상품 잘못 주문 (구매자 귀책)',
  '택배사의 귀책으로 상품이 훼손됐을 때 (판매자 귀책)',
  '고객이 주문한 제품과 다른 제품이 배송됐을 때 (판매자 귀책)',
  '상품이 파손되었을 때 (판매자 귀책)',
];

const DEFAULT_CANCEL_REASONS = {
  GENERAL: {
    reason: '[일반결제] 구매자에 의한 결제 취소',
    detailReason: '주문확인 전, 구매자에 의한 모든 일반상품 즉시 결제취소',
  },
  SUBSCRIPTION: {
    reason: '[정기결제] 구매자에 의한 결제 취소',
    detailReason: '주문확인 전, 구매자에 의한 모든 구독상품 즉시 결제취소',
  },

  UNSUBSCRIBE_NAVER_PAY_BY_ADMIN: {
    reason: '[정기결제] 관리자에 의한 네이버페이 정기결제 해지 (결제 실패)',
  },
  UNSUBSCRIBE_NAVER_PAY_BY_BUYER: {
    reason: '[정기결제] 구매자에 의한 네이버페이 정기결제 해지 (결제 실패)',
  },
} as const;

export { 
  ORDER_STATUS, 
  ORDER_TYPE, 
  ORDER_TYPE_TO_SERVER_PARAM,
  SERVER_PARAM_TO_ORDER_TYPE,
  ORDER_TYPE_LIST,
  ORDER_TYPE_LABEL,
  HIDDEN_ORDER_STATUS,
  VISIBLE_ORDER_STATUS,
  HIDDEN_STATUS_LIST,
  VISIBLE_STATUS_LIST,
  DELIVERY_COMPANY_CODE,
  getServerParam,
  getOrderTypeFromServerParam,
  CANCEL_REASON_LIST,
  DEFAULT_CANCEL_REASONS,
  ORDER_STATUS_STEPS,
};