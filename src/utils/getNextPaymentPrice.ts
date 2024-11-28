type Price ={
  originPrice: number,
  discountCoupon: number,
  discountGrade: number,
  overDiscount: number
}

export const getNextPaymentPrice = ({
  originPrice = 0,
  discountCoupon = 0,
  discountGrade = 0,
  overDiscount = 0,
}: Price): number | string => {
  // nextPaymentPrice 구독 상품의 할인율 포함 계산의 필요성이 예상되어 아래 내용 참고 후 리펙터링된 함수.
  // (! 서버에서 subscribe > nextPaymentPrice 는 실제 다음구독의 결제금액이 아니라, 구독 상품의 원가이다.)

  // 원가, 할인 값들의 합 계산
  const discounts = discountCoupon + discountGrade;
  const adjustedPrice = originPrice - discounts + overDiscount;

  // 결제 금액 결정 (최소 결제 금액 보장)
  return originPrice <= 0 ? 0 : Math.max(100, adjustedPrice).toLocaleString();
}