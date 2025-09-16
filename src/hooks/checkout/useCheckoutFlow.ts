import { PaymentAdapter } from "@/utils/checkout/adapters/paymentAdapter";
import {
  CheckoutStrategy,
  SaveOrderResult,
} from "@/utils/checkout/checkoutStrategies";
import { useCallback, useState } from "react";

/**
 * 결제 전체 플로우: 저장 → PG요청 → 콜백해석 → 성공/취소/실패 처리 → 라우팅
 * - deps로 모든 의존을 주입(DI) → 테스트/교체 용이
 */

type Routes = {
  success: string;
  fail: string;
};

export function useCheckoutFlow<Request, Sheet, PayReq, PayRes>(deps: {
  sheet: Sheet;
  isMobile: boolean;
  saveOrder: (req: Request) => Promise<SaveOrderResult>;
  paymentAdapter: PaymentAdapter<PayRes, PayReq>;
  strategy: CheckoutStrategy<Request, Sheet, PayReq, PayRes>;
  navigate: (path: string) => void;
  routes: Routes;
}) {
  const [isProcessing, setIsProcessing] = useState(false);

  const start = useCallback(
    async (requestBody: Request) => {
      if (isProcessing) return;
      setIsProcessing(true);
      try {
        // 1) 주문 저장
        const saveOrder = await deps.saveOrder(requestBody);
        if (saveOrder.status !== 200) {
          throw new Error("save order failed");
        }

        // 2) PG 초기화
        await deps.paymentAdapter.init();

        // 3) PG 요청 페이로드 빌드(전략에 위임)
        const payReq = deps.strategy.buildPaymentRequest({
          requestBody,
          sheet: deps.sheet,
          orderId: saveOrder.id,
          merchantUid: saveOrder.merchantUid,
          isMobile: deps.isMobile,
        });

        // 4) 결제 요청
        const payRes = await deps.paymentAdapter.requestPay<PayRes>(payReq);

        // 5) 콜백 해석
        const outcome = await deps.strategy.afterGatewayCallback({
          response: payRes,
          requestBody,
          saveOrder,
        });

        // 6) 분기 처리
        if (outcome === "success") {
          await deps.strategy.onSuccess({
            saveOrder,
            response: payRes,
            requestBody,
          });
          deps.navigate(deps.routes?.success);
        } else if (outcome === "cancel") {
          await deps.strategy.onCancel?.({ saveOrder });
          // 필요 시 상위에서 토스트
        } else {
          await deps.strategy.onFail({ saveOrder, reason: "gateway fail" });
          deps.navigate(deps.routes?.fail);
        }
      } catch (e) {
        // 공통 예외 처리
        await deps.strategy.onFail({
          saveOrder: { id: -1, merchantUid: "", status: 500 },
          reason: (e as Error)?.message,
        });
        deps.navigate(deps.routes?.fail);
      } finally {
        setIsProcessing(false);
      }
    },
    [deps, isProcessing]
  );

  return { start, isProcessing };
}
