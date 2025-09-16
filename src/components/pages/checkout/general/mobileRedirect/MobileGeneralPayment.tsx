"use client";

import { useEffect, useMemo, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Spinner from "@/components/common/spinner/Spinner";
import { useToastStore } from "@/store/useToastStore";
import { useSuccessGeneralPayment } from "@/api/checkout/mutations/general/useSuccessGeneralPayment";
import { useFailGeneralPayment } from "@/api/checkout/mutations/general/useFailGeneralPayment";
import { useCancelGeneralPayment } from "@/api/checkout/mutations/general/useCancelGeneralPayment";
import { parseGeneralParams } from "@/utils/checkout/redirectParams";
import { mobilePaymentResultContainer } from "@/app/checkout/mobile-payment-redirect/MobilePaymentRedirect.css";

export default function MobileGeneralPayment() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const addToast = useToastStore((s) => s.addToast);

  const { mutateAsync: successPayment } = useSuccessGeneralPayment();
  const { mutateAsync: failPayment } = useFailGeneralPayment();
  const { mutateAsync: cancelPayment } = useCancelGeneralPayment();

  const processedRef = useRef(false);

  const params = useMemo(
    () => parseGeneralParams(searchParams),
    [searchParams]
  );

  useEffect(() => {
    const run = async () => {
      if (processedRef.current) return;
      processedRef.current = true;

      try {
        if (!params) throw new Error("필수 결제 정보가 누락되었습니다.");

        const {
          impUid,
          impSuccess,
          merchantUid,
          orderId,
          discountReward,
          memberCouponId,
          errorMsg,
        } = params;

        // 취소
        if (errorMsg === "결제를 취소하였습니다.") {
          await cancelPayment(orderId);
          addToast("결제를 취소하였습니다.", "above-button");
          router.push("/checkout/general");
          return;
        }

        // 성공/실패
        if (impSuccess) {
          await successPayment({
            id: orderId,
            body: { impUid, merchantUid, discountReward, memberCouponId },
          });
          router.push("/checkout/completed?type=subscription");
        } else {
          await failPayment(orderId);
          router.push("/checkout/failed?type=subscription");
        }
      } catch (e) {
        console.error("[MobileGeneralPaymentRedirect] 처리 실패:", e);
        router.push("/checkout/failed?type=subscription");
      }
    };

    run();
  }, [params, router, addToast, cancelPayment, successPayment, failPayment]);

  return (
    <div className={mobilePaymentResultContainer}>
      <Spinner />
    </div>
  );
}
