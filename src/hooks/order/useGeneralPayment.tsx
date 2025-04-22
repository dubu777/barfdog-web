import { useState, useCallback } from "react";
import {
  SaveGeneralOrderRequest,
  GeneralOrderSheetResponse,
  GeneralIamportResponse,
  PaymentRequestParams,
  OrderType,
} from "@/types";
import { useRouter } from "next/navigation";
import { ORDER_TYPE } from "@/constants";
import { useSaveGeneralOrder } from "@/api/order/mutations/useSaveGeneralOrder";
import { useSuccessGeneralPayment } from "@/api/order/mutations/useSuccessGeneralPayment";
import { useFailGeneralPayment } from "@/api/order/mutations/useFailGeneralPayment";
import useDeviceState from "@/hooks/useDeviceState";
import { buildGeneralPaymentRequest } from "@/store/order/paymentUtils";
import { usePayment } from "./usePayment";
import { useToastStore } from "@/store/useToastStore";

interface UseGeneralPaymentProps {
  generalOrderSheetData: GeneralOrderSheetResponse;
}

export function useGeneralPayment({
  generalOrderSheetData,
}: UseGeneralPaymentProps) {
  const router = useRouter();
  const { requestIamportPayment } = usePayment();
  const { isMobileDevice } = useDeviceState();
  const [isProcessing, setIsProcessing] = useState(false);
  const addToast = useToastStore((state) => state.addToast);

  // React Query mutations
  const { mutateAsync: saveGeneralOrder } = useSaveGeneralOrder();
  const { mutateAsync: successPayment } = useSuccessGeneralPayment();
  const { mutateAsync: failPayment } = useFailGeneralPayment();

  const handlePaymentResponse = useCallback(
    async (
      response: GeneralIamportResponse, // 포트원 결제 요청 Response
      orderId: number,
      requestBody: SaveGeneralOrderRequest
    ) => {
      if (response.success) {
        try {
          await successPayment({
            id: orderId,
            body: {
              impUid: response.imp_uid,
              merchantUid: response.merchant_uid,
              discountReward: requestBody.discountReward,
            },
          });
          router.push("/order/order-completed");
        } catch (error) {
          console.error("결제 성공 처리 실패:", error);
          router.push("/order/order-failed");
        }
        return;
      }

      // 사용자가 팝업을 닫아서 취소한 경우
      if (response.error_msg === "사용자가 결제를 취소하였습니다.") {
        addToast("결제를 취소하였습니다.", "above-button");
        return;
      }

      // 그 외 진짜 결제 실패(거절, 인증 오류 등)
      try {
        await failPayment(orderId);
        console.error("결제 실패:", response);
      } catch (e) {
        console.error("결제 실패 처리 실패:", e);
      }
      router.push("/order/order-failed");
    },
    [router, successPayment, failPayment, addToast]
  );

  const processPayment = useCallback(
    async (requestBody: SaveGeneralOrderRequest) => {
      if (isProcessing) return;
      setIsProcessing(true);

      try {
        const saveOrderResponse = await saveGeneralOrder(requestBody);

        if (saveOrderResponse.status !== 200) {
          throw new Error("결제 요청 실패: 서버 검증 실패");
        }

        const paymentData = buildGeneralPaymentRequest({
          requestBody,
          orderId: saveOrderResponse.data.id,
          merchantUid: saveOrderResponse.data.merchantUid,
          generalOrderSheetData,
          isMobileDevice,
        });

        const paymentParams: PaymentRequestParams<OrderType> = {
          orderType: ORDER_TYPE.GENERAL,
          paymentData,
          callback: (response) => {
            handlePaymentResponse(
              response,
              saveOrderResponse.data.id,
              requestBody
            );
          },
        };

        requestIamportPayment(paymentParams);
      } catch (error) {
        console.error("결제 요청 실패:", error);
        router.push("/order/order-failed");
      } finally {
        setIsProcessing(false);
      }
    },
    [
      generalOrderSheetData,
      isMobileDevice,
      isProcessing,
      handlePaymentResponse,
      saveGeneralOrder,
      requestIamportPayment,
    ]
  );

  return {
    processPayment,
    isProcessing,
  };
}
