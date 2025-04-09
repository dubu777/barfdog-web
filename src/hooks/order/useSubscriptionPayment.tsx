// src/hooks/useSubscriptionPayment.ts
import { useState, useCallback } from 'react';
import { usePayment } from './usePayment';
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
  const { requestIamportPayment } = usePayment(); // 포트원 호출
  const [isProcessing, setIsProcessing] = useState(false);

  const { mutateAsync: saveSubscriptionOrder } = useSaveSubscriptionOrder(); // 서버에 구독 주문 정보 저장
  const { mutateAsync: createIamportPayment } = useCreateIamportSubscriptionPayment(); // 포트원 결제 요청 /subscribe/payments/again 호출
  const { mutateAsync: validatePayment } = useValidateSubscriptionPayment();
  const { mutateAsync: invalidPayment } = useInvalidSubscriptionPayment();
  const { mutateAsync: successPayment } = useSuccessSubscriptionPayment();
  const { mutateAsync: failPayment } = useFailSubscriptionPayment();

  // 데스크탑에서만 사용될 최종 결제 처리 로직
  const handlePaymentResponse = useCallback(async (
    response: SubscriptionIamportResponse, // 포트원 결제 요청의 Response
    saveOrderResponse: { data: { merchantUid: string; id: number } }, // 구독 결제 정보 저장 요청의 Response
    paymentData: CreateIamportSubscriptionPaymentRequest,
    requestBody: SaveSubscriptionOrderRequest // 구독 결제 정보 저장 요청의 Request
  ) => {
    if (!response.success) {
      console.error("아임포트 결제 실패", response.error_msg);
      // router.push("/order/failed");
      return;
    }

    try {
      const orderData = {
        customer_uid: response.customer_uid,
        merchant_uid: saveOrderResponse.data.merchantUid,
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
        orderId: saveOrderResponse.data.id,
        impUid: finalResponse.imp_uid,
      });

      const finalBody = {
        customerUid: response.customer_uid,
        discountReward: requestBody.discountReward,
        impUid: finalResponse.imp_uid,
        merchantUid: saveOrderResponse.data.merchantUid,
      };

      if (isValidPayment) {
        await successPayment({
          orderId: saveOrderResponse.data.id,
          body: finalBody,
        });
        router.push("/order/completed");
      } else {
        await invalidPayment({
          orderId: saveOrderResponse.data.id,
          body: finalBody,
        });
        await failPayment(saveOrderResponse.data.id);
        // router.push("/order/failed");
      }
    } catch (error) {
      console.error("결제 처리 실패", error);
      // router.push("/order/failed");
    }
  }, [router, createIamportPayment, validatePayment, successPayment, invalidPayment, failPayment]);

  const processPayment = useCallback(async (requestBody: SaveSubscriptionOrderRequest) => {
    if (isProcessing) return;
    setIsProcessing(true);

    try {
      const saveOrderResponse = await saveSubscriptionOrder({
        subscribeId,
        body: requestBody,
      });

      if (saveOrderResponse.status !== 200) {
        throw new Error(`구독 주문 저장 실패 (status: ${saveOrderResponse.status})`);
      }

      // 포트원 결제 요청 데이터 빌드
      const paymentData = buildSubscriptionPaymentRequest({
        requestBody,
        subscriptionOrderSheetData,
        isMobileDevice,
        orderId: saveOrderResponse.data.id,
        merchantUid: saveOrderResponse.data.merchantUid,
      });

      const paymentParams: PaymentRequestParams<OrderType> = {
        orderType: ORDER_TYPE.SUBSCRIPTION,
        paymentData,
        callback: (response) => {
          if (!isMobileDevice) {
            // 데스크탑인 경우에만: 콜백에서 바로 최종 처리 진행, 모바일은 리다리엑트 경로에서 처리
            const subscriptionResponse = response as SubscriptionIamportResponse;
            handlePaymentResponse(subscriptionResponse, saveOrderResponse, paymentData, requestBody);
          }
        },
      };

      requestIamportPayment(paymentParams);
    } catch (error) {
      console.error("결제 요청 실패", error);
      // router.push("/order/failed");
    } finally {
      setIsProcessing(false);
    }
  }, [subscribeId, subscriptionOrderSheetData, isMobileDevice, isProcessing, handlePaymentResponse, saveSubscriptionOrder, requestIamportPayment]);

  return {
    processPayment,
    isProcessing,
  };
}