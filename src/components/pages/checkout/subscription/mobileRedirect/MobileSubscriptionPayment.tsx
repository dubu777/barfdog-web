"use client";

import { useEffect, useMemo, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Spinner from "@/components/ui/spinner/Spinner";
import { useToastStore } from "@/store/useToastStore";
import { useBillingAgainPayment } from "@/api/iamport/mutations/useBillingAgainPayment";
import { useValidateSubscriptionPayment } from "@/api/checkout/mutations/subscription/useValidateSubscriptionPayment";
import { useSuccessSubscriptionPayment } from "@/api/checkout/mutations/subscription/useSuccessSubscriptionPayment";
import { useFailSubscriptionPayment } from "@/api/checkout/mutations/subscription/useFailSubscriptionPayment";
import { parseSubscriptionParams } from "@/utils/checkout/redirectParams";
import { mobilePaymentResultContainer } from "@/app/checkout/mobile-payment-redirect/MobilePaymentRedirect.css";
import { useCancelSubscriptionPayment } from "@/api/checkout/mutations/subscription/useCancelSubscriptionPayment";
import { CHECKOUT_ROUTES } from "@/constants";
import { isPortoneUserCancel } from "@/utils/checkout/isPortoneUserCancel";
import { PaymentMethod } from "@/types";

export default function MobileSubscriptionPayment() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const addToast = useToastStore((s) => s.addToast);

  const { mutateAsync: billingAgainPayment } = useBillingAgainPayment();
  const { mutateAsync: validatePayment } = useValidateSubscriptionPayment();
  const { mutateAsync: successPayment } = useSuccessSubscriptionPayment();
  const { mutateAsync: failPayment } = useFailSubscriptionPayment();
  const { mutateAsync: cancelPayment } = useCancelSubscriptionPayment();

  const processedRef = useRef(false);
  const params = useMemo(
    () => parseSubscriptionParams(searchParams),
    [searchParams]
  );

  useEffect(() => {
    const run = async () => {
      if (processedRef.current) return;
      processedRef.current = true;

      try {
        if (!params) throw new Error("필수 결제 정보가 누락되었습니다.");

        const {
          // 1차 응답/부가정보
          errorMsg,
          subscribeId,
          // again/검증용 데이터
          orderId,
          customerUid,
          merchantUid,
          amount,
          name,
          buyer_name,
          buyer_tel,
          buyer_email,
          buyer_addr,
          buyer_postcode,
          paymentMethod,
        } = params;

        // 취소 체크: isPortoneUserCancel 함수 사용
        if (isPortoneUserCancel(errorMsg)) {
          await cancelPayment(orderId);
          addToast("결제를 취소하였습니다.", "above-button");
          if (subscribeId) {
            router.push(CHECKOUT_ROUTES.SUBSCRIPTION.order(subscribeId));
          } else {
            router.push("/");
          }
          return;
        }

        // 모바일: again API로 실과금 → validate
        const iamportResp = await billingAgainPayment({
          customer_uid: customerUid,
          merchant_uid: merchantUid,
          amount,
          name,
          buyer_name,
          buyer_tel,
          buyer_email,
          buyer_addr,
          buyer_postcode,
        });

        if (iamportResp.code !== 0) {
          throw new Error(`서버 결제 완료 처리 실패: ${iamportResp.message}`);
        }

        const final = iamportResp.response;
        if (!final || final.status !== "paid" || !final.imp_uid) {
          const reason = final?.fail_reason || "알 수 없는 결제 실패";
          throw new Error(`결제 실패: ${reason}`);
        }

        // 검증 (훅 반환 타입 편차 대비)
        const isValid = await validatePayment({
          orderId,
          impUid: final.imp_uid,
          customerUid,
        });

        const finalBody = {
          customerUid,
          impUid: final.imp_uid,
          merchantUid,
          paymentMethod: paymentMethod as PaymentMethod,
        };

        if (isValid) {
          await successPayment({ orderId, body: finalBody });
          router.push(CHECKOUT_ROUTES.SUBSCRIPTION.completed(orderId));
        } else {
          // 재 검증 실패
          await failPayment(orderId);
          if (subscribeId) {
            router.push(CHECKOUT_ROUTES.SUBSCRIPTION.failed(subscribeId));
          } else {
            router.push("/");
          }
        }
      } catch (e) {
        console.error("[MobileSubscriptionPaymentRedirect] 처리 실패:", e);

        if (params?.subscribeId) {
          router.push(CHECKOUT_ROUTES.SUBSCRIPTION.failed(params.subscribeId));
        } else {
          router.push("/");
        }
      }
    };

    run();
  }, [
    params,
    router,
    addToast,
    billingAgainPayment,
    validatePayment,
    successPayment,
    failPayment,
  ]);

  return (
    <div className={mobilePaymentResultContainer}>
      <Spinner fullscreen />
    </div>
  );
}
