"use client";
import { Suspense, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useCreateIamportSubscriptionPayment } from "@/api/iamport/mutations/useCreateIamportSubscriptionPayment";
import { useValidateSubscriptionPayment } from "@/api/order/mutations/useValidateSubscriptionPayment";
import { useInvalidSubscriptionPayment } from "@/api/order/mutations/useInvalidSubscriptionPayment";
import { useSuccessSubscriptionPayment } from "@/api/order/mutations/useSuccessSubscriptionPayment";
import { useFailSubscriptionPayment } from "@/api/order/mutations/useFailSubscriptionPayment";
import { useToastStore } from "@/store/useToastStore";
import { mobilePaymentResultContainer } from "../MobilePaymentRedirect.css";
import DotSpinner from "@/components/common/spinner/DotSpinner";

export default function Page() {
  return (
    <Suspense fallback={<DotSpinner /> }>
      <MobileSubscriptionPaymentRedirect />
    </Suspense>
  )
}

function MobileSubscriptionPaymentRedirect() {
  const processedRef = useRef(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const addToast = useToastStore((state) => state.addToast);

  const { mutateAsync: createIamportPayment } =
    useCreateIamportSubscriptionPayment();
  const { mutateAsync: validatePayment } = useValidateSubscriptionPayment();
  const { mutateAsync: invalidPayment } = useInvalidSubscriptionPayment();
  const { mutateAsync: successPayment } = useSuccessSubscriptionPayment();
  const { mutateAsync: failPayment } = useFailSubscriptionPayment();

  useEffect(() => {
    const processPayment = async () => {
      if (processedRef.current) return; // 중복 호출 방지
      processedRef.current = true;

      try {
        // URL 파라미터에서 필요한 데이터 추출
        const impUid = searchParams.get("imp_uid");
        const impSuccess = searchParams.get("imp_success");
        const merchantUid = searchParams.get("merchantUid");
        const orderIdStr = searchParams.get("order_id");
        const customerUid = searchParams.get("customer_uid");
        const amountStr = searchParams.get("amount");
        const discountRewardStr = searchParams.get("discount_reward");
        const name = searchParams.get("name") ?? "";
        const buyerName = searchParams.get("buyer_name") ?? "";
        const buyerTel = searchParams.get("buyer_tel") ?? "";
        const buyerEmail = searchParams.get("buyer_email") ?? "";
        const buyerAddr = searchParams.get("buyer_addr") ?? "";
        const buyerPostcode = searchParams.get("buyer_postcode") ?? "";
        const errorMsg = searchParams.get("error_msg") ?? "";
        const subscriptionId = searchParams.get("subscription_Id") ?? "";

        console.log(
          errorMsg,
          impUid,
          impSuccess,
          merchantUid,
          orderIdStr,
          customerUid,
          amountStr,
          discountRewardStr,
          name,
          buyerName,
          buyerTel,
          buyerEmail,
          buyerAddr,
          buyerPostcode
        );

        if (
          !impUid ||
          !merchantUid ||
          !orderIdStr ||
          !customerUid ||
          !impSuccess ||
          !amountStr ||
          !discountRewardStr
        ) {
          throw new Error("필수 결제 정보가 누락되었습니다.");
        }

        // 2) 사용자가 결제창을 닫거나 취소 버튼 클릭한 경우
        if (errorMsg === "결제를 취소하였습니다.") {
          addToast("결제를 취소하였습니다.", "above-button");
          router.push(
            `/order/checkout/subscription?subscribeId=${subscriptionId}`
          );
          return;
        }

        const orderId = Number(orderIdStr);
        const discountReward = Number(discountRewardStr);
        const amount = Number(amountStr);

        const iamportResponse = await createIamportPayment({
          customer_uid: customerUid,
          merchant_uid: merchantUid,
          amount,
          name,
          buyer_name: buyerName,
          buyer_tel: buyerTel,
          buyer_email: buyerEmail,
          buyer_addr: buyerAddr,
          buyer_postcode: buyerPostcode,
        });

        if (iamportResponse.code !== 0) {
          throw new Error(
            `서버 결제 완료 처리 실패: ${iamportResponse.message}`
          );
        }

        const { response: finalResponse } = iamportResponse;
        if (!finalResponse || finalResponse.status !== "paid") {
          const failReason =
            finalResponse?.fail_reason || "알 수 없는 결제 실패";
          throw new Error(`결제 실패: ${failReason}`);
        }

        // 결제 검증
        const isValidPayment = await validatePayment({
          orderId,
          impUid: finalResponse.imp_uid,
        });

        const finalBody = {
          customerUid,
          discountReward: Number(discountReward),
          impUid: finalResponse.imp_uid,
          merchantUid,
        };

        if (isValidPayment) {
          await successPayment({
            orderId,
            body: finalBody,
          });
          router.push("/order/checkout/completed");
        } else {
          await invalidPayment({
            orderId,
            body: finalBody,
          });
          console.log("invalidPayment");
          await failPayment(orderId);
          console.log("failPayment");

          router.push("/order/checkout/failed");
        }
      } catch (error) {
        console.error("결제 처리 실패", error);
        router.push("/order/checkout/failed");
      }
    };

    processPayment();
  }, [
    searchParams,
    router,
    createIamportPayment,
    validatePayment,
    successPayment,
    invalidPayment,
    failPayment,
    addToast,
  ]);

  return (
    <div className={mobilePaymentResultContainer}>
      <DotSpinner />
    </div>
  );
}
