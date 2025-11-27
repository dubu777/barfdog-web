import { SaveOrderResponse } from "@/types";
import { PaymentAdapter } from "@/utils/checkout/adapters/paymentAdapter";
import { CheckoutStrategy } from "@/utils/checkout/checkoutStrategies";
import { useCallback, useState } from "react";

/**
 * 결제 전체 플로우: 저장 → PG요청 → 콜백해석 → 성공/취소/실패 처리 → 라우팅
 * - deps로 모든 의존을 주입(DI) → 테스트/교체 용이
 */

interface CheckoutFlowDeps<Request, Sheet, PayReq, PayRes> {
  // 결제 시트 데이터(서버에서 조회해 화면/전략에 공유할 원천 데이터)
  sheet: Sheet;
  // 모바일 환경 여부(모바일 리다이렉트/again API 등 분기에 사용)
  isMobile: boolean;
  /**
   * 주문 저장 함수
   * - 서버에 주문을 저장하고 결제에 필요한 id/merchantUid/status 를 반환
   * - status !== 200 이면 실패로 간주
   */
  preparePayment: (req: Request) => Promise<SaveOrderResponse>;
  /**
   * PG 어댑터
   * - PG SDK 초기화(init) 및 결제 요청(requestPay)을 캡슐화
   * - 다른 PG로 교체 가능
   */
  paymentAdapter: PaymentAdapter<PayRes, PayReq>;
  /**
   * 결제 전략
   * - 게이트웨이 콜백 해석(afterGatewayCallback: success/cancel/fail)
   * - 성공/취소/실패 후처리(onSuccess/onCancel/onFail)
   */
  strategy: CheckoutStrategy<Request, Sheet, PayReq, PayRes>;
  /**
   * 결제 성공 시 호출될 콜백 (선택)
   * - orderId를 인자로 받음
   */
  onPaymentSuccess?: (orderId: number) => void;
  /**
   * 결제 실패 시 호출될 콜백 (선택)
   */
  onPaymentFailed?: () => void;
}

/**
 * 결제 전체 플로우: 저장 → PG요청 → 콜백해석 → 성공/취소/실패 처리 → 라우팅
 * - deps로 모든 의존을 주입
 */
export function useCheckoutFlow<Request, Sheet, PayReq, PayRes>(
  deps: CheckoutFlowDeps<Request, Sheet, PayReq, PayRes>
) {
  const [isProcessing, setIsProcessing] = useState(false);

  const start = useCallback(
    async (requestBody: Request) => {
      if (isProcessing) return;
      setIsProcessing(true);
      try {
        // 1) 주문 준비 (order 생성 및 정합성 검사)
        const preparePayment = await deps.preparePayment(requestBody);

        // 2) PG 초기화
        await deps.paymentAdapter.init();

        // 3) PG 요청 페이로드 빌드(전략에 위임)
        const payReq = deps.strategy.buildPaymentRequest({
          requestBody,
          sheet: deps.sheet,
          orderId: preparePayment.id,
          merchantUid: preparePayment.merchantUid,
          isMobile: deps.isMobile,
        });

        // 4) 결제 요청
        const payRes = await deps.paymentAdapter.requestPay<PayRes>(payReq);

        // 5) 콜백 해석
        const outcome = await deps.strategy.afterGatewayCallback({
          response: payRes,
          requestBody,
          preparePayment,
        });

        // 6) 분기 처리
        if (outcome === "success") {
          await deps.strategy.onSuccess({
            preparePayment,
            response: payRes,
            requestBody,
          });
          deps.onPaymentSuccess?.(preparePayment.id);
        } else if (outcome === "cancel") {
          await deps.strategy.onCancel?.({ preparePayment });
        } else {
          await deps.strategy.onFail({
            preparePayment,
            reason: "gateway fail",
          });
          deps.onPaymentFailed?.();
        }
      } catch (e) {
        // 공통 예외 처리
        await deps.strategy.onFail({
          preparePayment: { id: -1, merchantUid: "", status: "" },
          reason: (e as Error)?.message,
        });
        deps.onPaymentFailed?.();
      } finally {
        setIsProcessing(false);
      }
    },
    [deps, isProcessing]
  );

  return { start, isProcessing };
}
