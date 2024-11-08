export const SUBSCRIBE_STATUS = {
  BEFORE_PAYMENT: '구독 비활성',
  SURVEY_COMPLETED: '구독 비활성',
  SUBSCRIBING: '구독 활성',
  SUBSCRIBE_PENDING: '구독 비활성',
  SUBSCRIBE_CANCEL: '구독 비활성',
  SUBSCRIBE_WILL_CANCEL: '구독 취소예정',
  ADMIN: '관리자구독',
}

export const SUBSCRIBE_PLAN_TYPE = {
  FULL: {
    NAME: 'FULL',
    KOR: '풀 플랜',
    numberOfPacksPerDay: 2,
    weeklyPaymentCycle: 2,
    totalNumberOfPacks: 28,
    maxRecipeCount: 2,
  },
  HALF: {
    NAME: 'HALF',
    KOR: '하프 플랜',
    numberOfPacksPerDay: 1,
    weeklyPaymentCycle: 4,
    totalNumberOfPacks: 28,
    maxRecipeCount: 1,
  },

  TOPPING_FULL: {
    NAME: 'TOPPING_FULL',
    KOR: '토핑 풀플랜',
    numberOfPacksPerDay: 1,
    weeklyPaymentCycle: 2,
    totalNumberOfPacks: 28,
    maxRecipeCount: 1,
  },
  TOPPING_HALF: {
    NAME: 'TOPPING_HALF',
    KOR: '토핑 하프플랜',
    numberOfPacksPerDay: 1,
    weeklyPaymentCycle: 4,
    totalNumberOfPacks: 28,
    maxRecipeCount: 1,
  },
  // 삭제 예정
  TOPPING: {
    NAME: 'TOPPING',
    KOR: '토핑 플랜',
    numberOfPacksPerDay: 1,
    weeklyPaymentCycle: 4,
    totalNumberOfPacks: 20,
    maxRecipeCount: 1,
  },
};

// 결제 전, 결제완료, 생산 중, 배송준비 중, 배송 시작, 배송 중, 배송완료, 취소됨, 환불됨
export const ORDER_STATUS = {
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
export const PAYMENT = {
  KAKAO_PAY: '카카오 페이',
  NAVER_PAY: '네이버 페이',
  CREDIT_CARD: '카드 결제',
}
