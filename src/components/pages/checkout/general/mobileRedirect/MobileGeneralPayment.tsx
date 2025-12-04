"use client";

import { useEffect, useMemo, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Spinner from "@/components/ui/spinner/Spinner";
import { useToastStore } from "@/store/useToastStore";
import { useSuccessGeneralPayment } from "@/api/checkout/mutations/general/useSuccessGeneralPayment";
import { useFailGeneralPayment } from "@/api/checkout/mutations/general/useFailGeneralPayment";
import { useCancelGeneralPayment } from "@/api/checkout/mutations/general/useCancelGeneralPayment";
import { parseGeneralParams } from "@/utils/checkout/redirectParams";
import { CHECKOUT_ROUTES } from "@/constants";
import { commonWrapper } from "@/styles/common.css";
import { isPortoneUserCancel } from "@/utils/checkout/isPortoneUserCancel";

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
        console.log(params);
        if (!params) throw new Error("필수 결제 정보가 누락되었습니다.");

        const {
          impUid,
          impSuccess,
          merchantUid,
          orderId,
          basketIdList,
          errorMsg,
        } = params;

        if (isPortoneUserCancel(errorMsg)) {
          await cancelPayment(orderId);
          addToast("결제를 취소하였습니다.", "above-button");
          router.push(CHECKOUT_ROUTES.GENERAL.order);
          return;
        }

        // 성공/실패
        if (impSuccess) {
          await successPayment({
            orderId,
            body: {
              impUid,
              merchantUid,
              basketInfo: basketIdList.length > 0 ? { basketIdList } : null,
            },
          });
          router.push(CHECKOUT_ROUTES.GENERAL.completed(orderId));
        } else {
          await failPayment(orderId);
          router.push(CHECKOUT_ROUTES.GENERAL.failed);
        }
      } catch (e) {
        console.error("[MobileGeneralPaymentRedirect] 처리 실패:", e);
        router.push(CHECKOUT_ROUTES.GENERAL.failed);
      }
    };

    run();
  }, [params, router, addToast, cancelPayment, successPayment, failPayment]);

  return (
    <div
      className={commonWrapper({
        height: "full",
        align: "center",
        justify: "center",
      })}
    >
      <Spinner />
    </div>
  );
}
