export { PaymentMethod, pgType };

const PaymentMethod = {
  CREDIT_CARD:'card',
  KAKAO_PAY:'kakaopay',
  NAVER_PAY:'naverpay',
} as const;

const pgType ={
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
