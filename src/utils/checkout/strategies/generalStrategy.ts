import { CheckoutStrategy } from "../checkoutStrategies";
import type {
  PrepareGeneralPaymentRequest,
  GetGeneralCheckoutResponse,
  GeneralIamportResponse,
  GeneralIamportRequest, // 프로젝트 내 정의가 있다고 전제
} from "@/types";
import { buildGeneralPaymentRequest } from "@/store/checkout/paymentUtils";
import { isPortoneUserCancel } from "../isPortoneUserCancel";

/**
 * 일반 결제 전략 팩토리
 * - 성공/실패/취소 API는 DI로 주입(기존 React Query mutateAsync 사용)
 */
export function createGeneralStrategy(deps: {
  sheet: GetGeneralCheckoutResponse;
  isMobile: boolean;
  isWebView: boolean;
  successPayment: (args: {
    orderId: number;
    body: {
      impUid: string;
      merchantUid: string | null;
      basketInfo: {
        basketIdList: number[];
      } | null;
    };
  }) => Promise<any>;
  cancelPayment: (orderId: number) => Promise<any>;
  failPayment: (orderId: number) => Promise<any>;
}): CheckoutStrategy<
  PrepareGeneralPaymentRequest,
  GetGeneralCheckoutResponse,
  GeneralIamportRequest,
  GeneralIamportResponse
> {
  return {
    buildPaymentRequest: ({ requestBody, orderId, merchantUid }) =>
      buildGeneralPaymentRequest({
        requestBody,
        generalOrderSheetData: deps.sheet,
        orderId,
        merchantUid,
        isMobileDevice: deps.isMobile,
        from: deps.isWebView ? "app" : "web",
      }),

    afterGatewayCallback: async ({ response }) => {
      if (response?.success) return "success";

      // ✅ 취소 메시지이면 'cancel'로 분기
      if (isPortoneUserCancel(response?.error_msg)) return "cancel";
      // 그 외 실패
      return "fail";
    },

    onSuccess: async ({ preparePayment, response }) => {
      try {
        // TODO: 장바구니 개발 후 실제 basketIdList 전달
        const basketIdList: number[] = []; // 임시로 빈 배열

        await deps.successPayment({
          orderId: preparePayment.orderId,
          body: {
            impUid: (response as any).imp_uid!,
            merchantUid: (response as any).merchant_uid ?? null,
            basketInfo: basketIdList.length > 0 ? { basketIdList } : null,
          },
        });
      } catch {
        await deps.failPayment(preparePayment.orderId);
        throw new Error("successPayment failed → canceled");
      }
    },

    onFail: async ({ preparePayment }) => {
      if (preparePayment.orderId > 0) {
        await deps.failPayment(preparePayment.orderId).catch(() => {});
      }
    },

    onCancel: async ({ preparePayment }) => {
      await deps.cancelPayment(preparePayment.orderId).catch(() => {});
    },
  };
}
