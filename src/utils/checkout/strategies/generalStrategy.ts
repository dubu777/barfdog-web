import { CheckoutStrategy } from "../checkoutStrategies";
import type {
  SaveGeneralOrderRequest,
  GeneralOrderSheetResponse,
  GeneralIamportResponse,
  GeneralIamportRequest, // 프로젝트 내 정의가 있다고 전제
} from "@/types";
import { buildGeneralPaymentRequest } from "@/store/checkout/paymentUtils";

/**
 * 일반 결제 전략 팩토리
 * - 성공/실패/취소 API는 DI로 주입(기존 React Query mutateAsync 사용)
 */
export function createGeneralStrategy(deps: {
  successGeneralPayment: (args: {
    id: number;
    body: {
      impUid: string;
      merchantUid: string | null;
      discountReward: number;
      memberCouponId: number | null;
    };
  }) => Promise<any>;
  cancelGeneralPayment: (id: number) => Promise<any>;
  failGeneralPayment: (id: number) => Promise<any>;
}): CheckoutStrategy<
  SaveGeneralOrderRequest,
  GeneralOrderSheetResponse,
  GeneralIamportRequest,
  GeneralIamportResponse
> {
  return {
    buildPaymentRequest: ({
      requestBody,
      sheet,
      orderId,
      merchantUid,
      isMobile,
    }) =>
      buildGeneralPaymentRequest({
        requestBody,
        generalOrderSheetData: sheet,
        orderId,
        merchantUid,
        isMobileDevice: isMobile,
      }),

    afterGatewayCallback: async ({ response }) => {
      if ((response as any).success) return "success";
      if ((response as any).error_msg === "사용자가 결제를 취소하였습니다.")
        return "cancel";
      return "fail";
    },

    onSuccess: async ({ saveOrder, response, requestBody }) => {
      try {
        await deps.successGeneralPayment({
          id: saveOrder.id,
          body: {
            impUid: (response as any).imp_uid!,
            merchantUid: (response as any).merchant_uid ?? null,
            discountReward: requestBody.discountReward,
            memberCouponId: requestBody.memberCouponId ?? null,
          },
        });
      } catch {
        await deps.cancelGeneralPayment(saveOrder.id);
        throw new Error("successGeneralPayment failed → canceled");
      }
    },

    onFail: async ({ saveOrder }) => {
      if (saveOrder.id > 0) {
        await deps.failGeneralPayment(saveOrder.id).catch(() => {});
      }
    },

    onCancel: async ({ saveOrder }) => {
      await deps.cancelGeneralPayment(saveOrder.id).catch(() => {});
    },
  };
}
