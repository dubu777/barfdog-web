// 구독 결제 전략: "결제요청 빌드 → 콜백해석 → (데스크탑) again API → 검증 → 성공/실패 처리"
import { CheckoutStrategy } from "../checkoutStrategies";
import type {
  SubscriptionIamportRequest,
  IamportCallback,
  CreateIamportSubscriptionPaymentRequest,
  SubscriptionCheckoutResponse,
  PrepareSubscriptionPaymentRequest,
} from "@/types";
import { buildSubscriptionPaymentRequest } from "@/store/checkout/paymentUtils";
import { isPortoneUserCancel } from "../isPortoneUserCancel";

export function createSubscriptionStrategy(deps: {
  /** 콜백 이후 추가 처리에 필요한 의존성들은 DI로 주입 */
  sheet: SubscriptionCheckoutResponse; // 이메일/상품명 등 참조
  isMobile: boolean;
  // API DI
  billingAgainPayment: (
    body: CreateIamportSubscriptionPaymentRequest
  ) => Promise<{
    code: number;
    message?: string;
    response?: { status: string; imp_uid: string; fail_reason?: string };
  }>;
  validatePayment: (args: {
    orderId: number;
    impUid: string;
    customerUid: string;
  }) => Promise<boolean>;
  successPayment: (args: { orderId: number; body: any }) => Promise<any>;
  failPayment: (orderId: number) => Promise<any>;
  cancelPayment: (orderId: number) => Promise<any>;
}): CheckoutStrategy<
  PrepareSubscriptionPaymentRequest,
  SubscriptionCheckoutResponse,
  SubscriptionIamportRequest,
  IamportCallback
> {
  return {
    // 1) PG 결제요청 페이로드 구성
    buildPaymentRequest: ({
      requestBody,
      sheet,
      orderId,
      merchantUid,
      isMobile,
    }) =>
      buildSubscriptionPaymentRequest({
        requestBody,
        subscriptionOrderSheetData: sheet,
        subscribeId: sheet.subscribeInfo.id,
        isMobileDevice: isMobile,
        orderId,
        merchantUid,
      }),

    // 2) 게이트웨이 콜백 해석
    //    - 일반적으로 success/fail만 구분 (모바일은 redirect-flow로 콜백이 안 오거나, 와도 즉시 이동)
    afterGatewayCallback: async ({ response }) => {
      if (response?.success) return "success";

      // ✅ 취소 메시지이면 'cancel'로 분기
      if (isPortoneUserCancel(response?.error_msg)) return "cancel";
      // 그 외 실패
      return "fail";
    },

    // 3) 성공 후 처리 - IMP.request_pay로 빌링키 발급 성공시
    //    - 데스크탑만: again API → validate → success/fail
    //    - 모바일: redirect 페이지에서 처리되므로 여기서는 no-op
    onSuccess: async ({ preparePayment, response, requestBody }) => {
      if (deps.isMobile) {
        // 모바일: IMP가 m_redirect_url로 이동하므로 여기서 추가 처리는 하지 않음
        return;
      }

      // again 결제에 필요한 바디 구성
      const orderData: CreateIamportSubscriptionPaymentRequest = {
        customer_uid: response.customer_uid,
        merchant_uid: preparePayment.merchantUid,
        amount: requestBody.paymentInfo.paymentPrice,
        name: deps.sheet.subscribeInfo.recipeList
          .map((recipe) => recipe.name)
          .join(", "),
        buyer_name: requestBody.deliveryInfo.address.recipientName,
        buyer_tel: requestBody.deliveryInfo.address.phoneNumber,
        buyer_email: "", // TODO: API 스펙 확인 후 수정
        buyer_addr: `${requestBody.deliveryInfo.address.street}, ${requestBody.deliveryInfo.address.detailAddress}`,
        buyer_postcode: requestBody.deliveryInfo.address.zipcode,
      };

      // (1) 포트원 again 호출
      const iamportResp = await deps.billingAgainPayment(orderData);
      if (iamportResp.code !== 0) {
        throw new Error(
          `again 결제 실패: ${iamportResp.message ?? "알 수 없음"}`
        );
      }

      const final = iamportResp.response;
      if (!final || final.status !== "paid") {
        const reason = final?.fail_reason ?? "알 수 없는 결제 실패";
        throw new Error(`결제 실패: ${reason}`);
      }

      // (2) 서버 검증

      const isValid = await deps.validatePayment({
        orderId: preparePayment.id,
        impUid: final.imp_uid,
        customerUid: response.customer_uid,
      });

      console.log("isValid", isValid);

      const finalBody = {
        customerUid: response.customer_uid,
        impUid: final.imp_uid,
        merchantUid: preparePayment.merchantUid,
      };

      // (3) 성공/위변조 처리
      if (isValid) {
        await deps.successPayment({
          orderId: preparePayment.id,
          body: finalBody,
        });
      } else {
        await deps.failPayment(preparePayment.id);
      }
    },

    // 4) 취소 처리
    onCancel: async ({ preparePayment }) => {
      if (preparePayment.id > 0) {
        await deps.cancelPayment(preparePayment.id).catch(() => {});
      }
    },

    // 5) 실패 공통 처리
    onFail: async ({ preparePayment }) => {
      if (preparePayment.id > 0) {
        await deps.failPayment(preparePayment.id).catch(() => {});
      }
    },
  };
}
