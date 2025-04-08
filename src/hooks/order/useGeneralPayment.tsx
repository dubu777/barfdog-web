import { useState, useCallback } from 'react';
import { 
  SaveGeneralOrderRequest, 
  GeneralOrderSheetResponse,
  GeneralIamportResponse,
  PaymentRequestParams,
  OrderType,
} from '@/types';
import { useRouter } from 'next/navigation';
import { ORDER_TYPE } from '@/constants';
import { useSaveGeneralOrder } from '@/api/order/mutations/useSaveGeneralOrder';
import { useSuccessGeneralPayment } from '@/api/order/mutations/useSuccessGeneralPayment';
import { useFailGeneralPayment } from '@/api/order/mutations/useFailGeneralPayment';
import useDeviceState from '@/hooks/useDeviceState';
import { buildGeneralPaymentRequest } from '@/store/order/paymentUtils';
import { usePayment } from '../usePayment';

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

  // React Query mutations
  const { mutateAsync: saveOrder } = useSaveGeneralOrder();
  const { mutateAsync: successPayment } = useSuccessGeneralPayment();
  const { mutateAsync: failPayment } = useFailGeneralPayment();

  const handlePaymentResponse = useCallback(async (
    response: GeneralIamportResponse,
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
    } else {
      try {
        await failPayment(orderId);
        console.error("결제 실패:", response);
        router.push("/order/order-failed");
      } catch (error) {
        console.error("결제 실패 처리 실패:", error);
        router.push("/order/order-failed");
      }
    }
  }, [router, successPayment, failPayment]);

  const processPayment = useCallback(async (requestBody: SaveGeneralOrderRequest) => {
    if (isProcessing) return;
    setIsProcessing(true);

    try {
      const saveResponse = await saveOrder(requestBody);

      if (saveResponse.status !== 200) {
        throw new Error("결제 요청 실패: 서버 검증 실패");
      }

      const paymentData = buildGeneralPaymentRequest({
        requestBody,
        id: saveResponse.data.id,
        merchantUid: saveResponse.data.merchantUid,
        generalOrderSheetData,
        isMobileDevice,
      });

      const paymentParams: PaymentRequestParams<OrderType> = {
        orderType: ORDER_TYPE.GENERAL,
        paymentData,
        callback: (response) => {
          handlePaymentResponse(response, saveResponse.data.id, requestBody);
        },
      };

      requestIamportPayment(paymentParams);
    } catch (error) {
      console.error("결제 요청 실패:", error);
      router.push("/order/order-failed");
    } finally {
      setIsProcessing(false);
    }
  }, [generalOrderSheetData, isMobileDevice, isProcessing, handlePaymentResponse, saveOrder, requestIamportPayment]);

  return {
    processPayment,
    isProcessing,
  };
}