import { PaymentMethod } from "@/types";


interface getPaymentDisplayAmountProps {
  paymentMethod: PaymentMethod;
  originAmount: number;
}

/**
 * <h1>결제 등록 시 표시할 금액</h1>
 * 
 * @param paymentMethod 결제수단
 * @param originAmount 실결제금액
 * 
 * <pre>
 * - KCP: 결제창에 표시될 금액으로 실제 승인은 이루어지지 않습니다.
 * - KakaoPay: 금액이 `0`일 경우 빌링키 발급만 진행됩니다.
 * - NaverPay: 금액은 고객에게 고지되며 실제 결제는 이루어지지 않습니다.
 * </pre>
 * 
 * @returns 결제 등록 시 표시할 금액
 * @throws {Error} 잘못된 결제 수단이 입력된 경우
 */
export const getPaymentDisplayAmount = ({
  paymentMethod,
  originAmount,
}: getPaymentDisplayAmountProps): number => {
  const amountByMethod: Record<PaymentMethod, number> = {
    CREDIT_CARD: originAmount,
    KAKAO_PAY: 0,
    NAVER_PAY: originAmount,
  };

  if (!(paymentMethod in amountByMethod)) {
    throw new Error(`Invalid Payment Method: ${paymentMethod}`);
  }

  return amountByMethod[paymentMethod];
};
