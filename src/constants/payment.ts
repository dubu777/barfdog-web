

const PAYMENT_METHOD = {
  CREDIT_CARD:'card',
  KAKAO_PAY:'kakaopay',
  NAVER_PAY:'naverpay',
} as const;

const PG_TYPE ={
  GENERAL:{
    card: `kcp.${process.env.NEXT_PUBLIC_IAMPORT_GENERAL_ORDER_SITECODE}`,
    kakaopay: `kakaopay.${process.env.NEXT_PUBLIC_IAMPORT_GENERAL_EASYPAY_KAKAO_CID}`,
    naverpay: `naverpay`,
  },
  SUBSCRIBE:{
    card: `kcp_billing.${process.env.NEXT_PUBLIC_IAMPORT_SUBSCRIBE_SITECODE}`,
    kakaopay: `kakaopay.${process.env.NEXT_PUBLIC_IAMPORT_SUBSCRIBE_EASYPAY_KAKAO_CID}`,
    naverpay: `naverpay`
  }
}

const PACKAGE_INFO = {
  TWELVE: {
    value: 12, // 서버에 전송할 값 (개월수)
    label: '12개월 패키지',
    discount: 20, // 할인율 (%)
    freeKit: 2, // 무료 진단기기 횟수
    freeTopper: 2, // 무료 토퍼랜덤 횟수
    freeSkip: true, // 무제한 건너뛰기
    freeDelivery: true, // 무료 배송
    fullDeliveryCount: 26, // 풀플랜 무료배송 횟수
    halfDeliveryCount: 13, // 하프플랜 무료배송 횟수
  },
  SIX: {
    value: 6,
    label: '6개월 패키지',
    discount: 15,
    freeKit: 1,
    freeTopper: 1,
    freeSkip: true,
    freeDelivery: true,
    fullDeliveryCount: 13,
    halfDeliveryCount: 6,
  },
  THREE: {
    value: 3,
    label: '3개월 패키지',
    discount: 5,
    freeKit: false,
    freeTopper: false,
    freeSkip: true,
    freeDelivery: true,
    fullDeliveryCount: 6,
    halfDeliveryCount: 3,
  },
  ONE: {
    value: null,
    label: '정기 구독',
    discount: false,
    freeKit: false,
    freeTopper: false,
    freeSkip: true,
    freeDelivery: true,
  },
} as const;

const IAMPORT_MIN_PAYMENT_PRICE = 100;

export { PAYMENT_METHOD, PG_TYPE, PACKAGE_INFO, IAMPORT_MIN_PAYMENT_PRICE };