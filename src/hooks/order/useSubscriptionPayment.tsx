// src/hooks/useSubscriptionPayment.ts
import { useState, useCallback } from 'react';
import { usePayment } from '../usePayment';
import { 
  SaveSubscriptionOrderRequest, 
  SubscriptionOrderSheetResponse,
  SubscriptionIamportResponse,
  PaymentRequestParams,
  CreateIamportSubscriptionPaymentRequest,
  OrderType
} from '@/types';
import { useRouter } from 'next/navigation';
import { ORDER_TYPE } from '@/constants';
import { useSaveSubscriptionOrder } from '@/api/order/mutations/useSaveSubscriptionOrder';
import { useCreateIamportSubscriptionPayment } from '@/api/iamport/mutations/useCreateIamportSubscriptionPayment';
import { useValidateSubscriptionPayment } from '@/api/order/mutations/useValidateSubscriptionPayment';
import { useInvalidSubscriptionPayment } from '@/api/order/mutations/useInvalidSubscriptionPayment';
import { useSuccessSubscriptionPayment } from '@/api/order/mutations/useSuccessSubscriptionPayment';
import { useFailSubscriptionPayment } from '@/api/order/mutations/useFailSubscriptionPayment';
import { buildSubscriptionPaymentRequest } from '@/store/order/paymentUtils';

interface UseSubscriptionPaymentProps {
  subscribeId: number;
  subscriptionOrderSheetData: SubscriptionOrderSheetResponse;
  isMobileDevice: boolean;
}

export function useSubscriptionPayment({
  subscribeId,
  subscriptionOrderSheetData,
  isMobileDevice,
}: UseSubscriptionPaymentProps) {
  const router = useRouter();
  const { requestIamportPayment } = usePayment();
  const [isProcessing, setIsProcessing] = useState(false);

  // React Query mutations
  const { mutateAsync: saveOrder } = useSaveSubscriptionOrder();
  const { mutateAsync: createIamportPayment } = useCreateIamportSubscriptionPayment();
  const { mutateAsync: validatePayment } = useValidateSubscriptionPayment();
  const { mutateAsync: invalidPayment } = useInvalidSubscriptionPayment();
  const { mutateAsync: successPayment } = useSuccessSubscriptionPayment();
  const { mutateAsync: failPayment } = useFailSubscriptionPayment();

  const handlePaymentResponse = useCallback(async (
    response: SubscriptionIamportResponse,
    saveResponse: { data: { merchantUid: string; id: number } },
    paymentData: CreateIamportSubscriptionPaymentRequest,
    requestBody: SaveSubscriptionOrderRequest
  ) => {
    if (!response.success) {
      console.error("아임포트 결제 실패", response.error_msg);
      router.push("/order/order-failed");
      return;
    }

    try {
      const orderData = {
        customer_uid: response.customer_uid,
        merchant_uid: saveResponse.data.merchantUid,
        amount: requestBody.paymentPrice,
        name: paymentData.name,
        buyer_name: paymentData.buyer_name,
        buyer_tel: paymentData.buyer_tel,
        buyer_email: paymentData.buyer_email,
        buyer_addr: paymentData.buyer_addr,
        buyer_postcode: paymentData.buyer_postcode,
      };

      const iamportResponse = await createIamportPayment(orderData);
      
      if (iamportResponse.code !== 0) {
        throw new Error(`서버 결제 완료 처리 실패: ${iamportResponse.message}`);
      }

      const { response: finalResponse } = iamportResponse;
      if (!finalResponse || finalResponse.status !== "paid") {
        const failReason = finalResponse?.fail_reason || "알 수 없는 결제 실패";
        throw new Error(`결제 실패: ${failReason}`);
      }

      const isValidPayment = await validatePayment({
        orderId: saveResponse.data.id,
        impUid: finalResponse.imp_uid,
      });

      const finalBody = {
        customerUid: response.customer_uid,
        discountReward: requestBody.discountReward,
        impUid: finalResponse.imp_uid,
        merchantUid: saveResponse.data.merchantUid,
      };

      if (isValidPayment) {
        await successPayment({
          orderId: saveResponse.data.id,
          body: finalBody,
        });
        router.push("/order/order-completed");
      } else {
        await invalidPayment({
          orderId: saveResponse.data.id,
          body: finalBody,
        });
        await failPayment(saveResponse.data.id);
        router.push("/order/order-failed");
      }
    } catch (error) {
      console.error("결제 처리 실패", error);
      router.push("/order/order-failed");
    }
  }, [router, createIamportPayment, validatePayment, successPayment, invalidPayment, failPayment]);

  const processPayment = useCallback(async (requestBody: SaveSubscriptionOrderRequest) => {
    if (isProcessing) return;
    setIsProcessing(true);

    try {
      const saveResponse = await saveOrder({
        subscribeId,
        body: requestBody,
      });

      if (saveResponse.status !== 200) {
        throw new Error(`구독 주문 저장 실패 (status: ${saveResponse.status})`);
      }

      const paymentData = buildSubscriptionPaymentRequest({
        requestBody,
        subscriptionOrderSheetData,
        isMobileDevice,
      });

      const paymentParams: PaymentRequestParams<OrderType> = {
        orderType: ORDER_TYPE.SUBSCRIPTION,
        paymentData,
        callback: (response) => {
          const subscriptionResponse = response as SubscriptionIamportResponse;
          handlePaymentResponse(subscriptionResponse, saveResponse, paymentData, requestBody);
        },
      };

      requestIamportPayment(paymentParams);
    } catch (error) {
      console.error("결제 요청 실패", error);
      router.push("/order/order-failed");
    } finally {
      setIsProcessing(false);
    }
  }, [subscribeId, subscriptionOrderSheetData, isMobileDevice, isProcessing, handlePaymentResponse, saveOrder, requestIamportPayment]);

  return {
    processPayment,
    isProcessing,
  };
}