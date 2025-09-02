"use client";

import { Suspense, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSuccessGeneralPayment } from "@/api/order/mutations/useSuccessGeneralPayment";
import { useFailGeneralPayment } from "@/api/order/mutations/useFailGeneralPayment";
import { useToastStore } from "@/store/useToastStore";
import { mobilePaymentResultContainer } from "../MobilePaymentRedirect.css";
import Spinner from "@/components/common/spinner/Spinner";
import { useCancelGeneralPayment } from "@/api/order/mutations/useCancelGeneralPayment";

export default function Page() {
  return (
    <Suspense fallback={<Spinner />}>
      <MobileGeneralPaymentRedirect />
    </Suspense>
  );
}

function MobileGeneralPaymentRedirect() {
  const processedRef = useRef(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const addToast = useToastStore((state) => state.addToast);

  const { mutateAsync: successPayment } = useSuccessGeneralPayment();
  const { mutateAsync: failPayment } = useFailGeneralPayment();
  const { mutateAsync: cancelPayment } = useCancelGeneralPayment();

  useEffect(() => {
    const processFinalPayment = async () => {
      if (processedRef.current) return;
      processedRef.current = true;
      try {
        const impUid = searchParams.get("imp_uid");
        const impSuccess = searchParams.get("imp_success");
        const merchantUid = searchParams.get("merchantUid");
        const orderIdStr = searchParams.get("order_id");
        const discountRewardStr = searchParams.get("discount_reward");
        const memberCouponIdStr = searchParams.get("member_coupon_id");
        const errorMsg = searchParams.get("error_msg") ?? "";

        if (
          !impUid ||
          !impSuccess ||
          !merchantUid ||
          !orderIdStr ||
          !discountRewardStr ||
          !memberCouponIdStr
        ) {
          throw new Error("필수 결제 정보가 누락되었습니다.");
        }

        const orderId = Number(orderIdStr);
        const discountReward = Number(discountRewardStr);
        const memberCouponId = Number(memberCouponIdStr);

        if (impSuccess === "true") {
          await successPayment({
            id: orderId,
            body: { impUid, merchantUid, discountReward, memberCouponId },
          });
          router.push("/order/checkout/completed");
          return;
        }

        // 2) 사용자가 결제창을 닫거나 취소 버튼 클릭한 경우
        if (errorMsg === "결제를 취소하였습니다.") {
          addToast("결제를 취소하였습니다.", "above-button");
          await cancelPayment(orderId);
          router.push("/order/checkout/general");
          return;
        }

        // 3) 그 외 결제 실패
        await failPayment(orderId);
        console.error("모바일 결제 실패:", errorMsg);
        router.push("/order/checkout/failed");
      } catch (e) {
        console.error("모바일 결제 처리 실패:", e);
        router.push("/order/checkout/failed");
      }
    };

    processFinalPayment();
  }, [searchParams, router, successPayment, failPayment, addToast]);

  return (
    <div className={mobilePaymentResultContainer}>
      <Spinner />
    </div>
  );
}
