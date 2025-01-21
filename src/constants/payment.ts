import { PackageInfo } from "@/types";


const PAYMENT_METHOD = {
  CREDIT_CARD:'card',
  KAKAO_PAY:'kakaopay',
  NAVER_PAY:'naverpay',
} as const;

const PG_TYPE ={
  GENERAL:{
    CREDIT_CARD: `kcp.${process.env.NEXT_PUBLIC_IAMPORT_GENERAL_ORDER_SITECODE}`,
    KAKAO_PAY: `kakaopay.${process.env.NEXT_PUBLIC_IAMPORT_GENERAL_EASYPAY_KAKAO_CID}`,
    NAVER_PAY: `naverpay`,
  },
  SUBSCRIBE:{
    CREDIT_CARD: `kcp_billing.${process.env.NEXT_PUBLIC_IAMPORT_SUBSCRIBE_SITECODE}`,
    KAKAO_PAY: `kakaopay.${process.env.NEXT_PUBLIC_IAMPORT_SUBSCRIBE_EASYPAY_KAKAO_CID}`,
    NAVER_PAY: `naverpay`
  }
}
const PACKAGE_INFO: Record<string, PackageInfo>= {
  TWELVE: {
    value: 12,
    label: '12개월 패키지',
    discount: 20,
    freeKit: 2,
    freeTopper: 2,
    freeSkip: true,
    freeDelivery: true,
    fullDeliveryCount: 26,
    halfDeliveryCount: 13,
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
    discount: 0,
    freeKit: false,
    freeTopper: false,
    freeSkip: true,
    freeDelivery: true,
    fullDeliveryCount: 0,
    halfDeliveryCount: 0,
  },
} as const;

const IAMPORT_MIN_PAYMENT_PRICE = 100;

export { PAYMENT_METHOD, PG_TYPE, PACKAGE_INFO, IAMPORT_MIN_PAYMENT_PRICE };