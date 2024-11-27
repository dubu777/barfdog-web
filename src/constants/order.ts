export {ORDER_STATUS, PAYMENT}

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
const PAYMENT = {
  KAKAO_PAY: '카카오 페이',
  NAVER_PAY: '네이버 페이',
  CREDIT_CARD: '카드 결제',
}

