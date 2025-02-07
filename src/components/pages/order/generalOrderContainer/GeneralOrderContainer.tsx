"use client";

import { useEffect } from "react";
import { usePersistOrderStore } from "@/store/order/usePersistOrderStore";
import {
  useCachedGeneralOrder,
  useGetGeneralOrder,
} from "@/api/order/queries/useGetGeneralOrder";
import { useSaveGeneralOrder } from "@/api/order/mutations/useSaveGeneralOrder";
import { SaveGeneralOrderRequest, GeneralIamportResponse } from "@/types";
import BundleDeliverySelector from "../bundleDeliverySelector/BundleDeliverySelector";
import DeliveryAddress from "../deliveryAddress/DeliveryAddress";
import Divider from "@/components/common/divider/Divider";

import { ORDER_TYPE } from "@/constants";
import { useSuccessGeneralPayment } from "@/api/order/mutations/useSuccessGeneralPayment";
import { useFailGeneralPayment } from "@/api/order/mutations/useFailGeneralPayment";
import { useOrderStore } from "@/store/order/useOrderStore";
import PaymentMethod from "../paymentMethod/PaymentMethod";
import RewardUsage from "../reward/RewardUsage";
import OrderSummary from "../orderSummary/OrderSummary";
import OrderItem from "../orderItem/OrderItem";
import { buildGeneralPaymentRequest, usePayment } from "@/hooks/usePayment";
import useDeviceState from "@/hooks/useDeviceState";
import { useRouter } from "next/navigation";

interface GeneralOrderContainerProps {}

interface handleIamportResponseParams {
  res: GeneralIamportResponse;
  orderId: number;
  requestBody: SaveGeneralOrderRequest;
}
export default function GeneralOrderContainer({}: GeneralOrderContainerProps) {
  const router = useRouter();
  // 상태관리
  const { generalOrderBody, getRequestBody } = useOrderStore();
  const { orderItemDtoList, clearOrderItemDtoList } = usePersistOrderStore();
  const { mutateAsync: createGeneralOrder } = useSaveGeneralOrder();
  const { mutateAsync: fetchGeneralOrder } = useGetGeneralOrder();
  const { mutateAsync: successGeneralPayment } = useSuccessGeneralPayment();
  const { mutateAsync: failGeneralPayment } = useFailGeneralPayment();
  const { data: generalOrderSheetData } = useCachedGeneralOrder({
    orderItemDtoList,
  });
  const { isMobileDevice } = useDeviceState();
  const { requestIamportPayment } = usePayment();

  useEffect(() => {
    if (orderItemDtoList && orderItemDtoList.length > 0) {
      fetchGeneralOrder({ orderItemDtoList });
    }
  }, [orderItemDtoList]);


  // 아임포트 결제 응답 처리
  const handleIamportResponse = async ({
    res,
    orderId,
    requestBody,
  }: handleIamportResponseParams) => {
    if (res.success) {
      console.log("결제 성공:", res);
      // 최종 결제 성공 처리
      await successGeneralPayment({
        id: orderId,
        body: {
          impUid: res.imp_uid,
          merchantUid: res.merchant_uid,
          discountReward: requestBody.discountReward,
        },
      });
      // 결제 성공 후 추가 작업(예: 페이지 이동, 상태 초기화)
      router.push('/order/order-completed')
      clearOrderItemDtoList();
    } else {
      // 결제 실패 처리
      await failGeneralPayment(orderId);
      console.error("결제 실패:", res);
      // 결제 실패 후 추가 작업(예: 페이지 이동)
      router.push('/order/order-failed')
    }
  };

  // 결제 요청
  const handlePaymentSubmit = async () => {
    const requestBody = getRequestBody(
      ORDER_TYPE.GENERAL
    ) as SaveGeneralOrderRequest;
    console.log("requestBody", requestBody);

    try {
      // 일반 주문 생성(저장) 요청
      const createOrderResponse = await createGeneralOrder(requestBody);

      if (createOrderResponse.status !== 200) {
        throw new Error("결제 요청 실패: 서버 검증 실패")
      }

      // 결제 요청 데이터 생성
      const paymentData = buildGeneralPaymentRequest({
        requestBody: requestBody,
        id: createOrderResponse.data.id,
        merchantUid: createOrderResponse.data.merchantUid,
        generalOrderSheetData,
        isMobileDevice,
      });

      // iamport 결제 요청: 콜백 내 로직은 별도 함수로 분리
      requestIamportPayment({
        orderType: ORDER_TYPE.GENERAL,
        paymentData,
        callback: async (response) => {
          const res = response as GeneralIamportResponse;
          await handleIamportResponse({
            res,
            orderId: createOrderResponse.data.id,
            requestBody,
          });
        },
      });
    } catch (error) {
      console.error("createGeneralOrder 에러:", error);
      router.push("/order/order-failed");
    }
  };

  return (
    <div>
      <DeliveryAddress orderType={ORDER_TYPE.GENERAL} />
      <Divider />
      <BundleDeliverySelector
        deliveryId={generalOrderBody.deliveryId}
        deliveryDto={generalOrderBody.deliveryDto}
      />
      <Divider />
      <OrderItem
        orderType={ORDER_TYPE.GENERAL}
        generalOrderSheetData={generalOrderSheetData}
      />
      <Divider />
      <OrderSummary
        orderType={ORDER_TYPE.GENERAL}
        orderPrice={generalOrderSheetData.orderPrice}
        freeCondition={generalOrderSheetData.freeCondition}
        deliveryPrice={generalOrderSheetData.deliveryPrice}
        orderItemDtoList={generalOrderSheetData.orderItemDtoList}
      />
      <Divider />
      <RewardUsage />
      <Divider />
      <PaymentMethod />
      <button
        style={{ width: "100%", height: "50px", backgroundColor: "gray" }}
        onClick={handlePaymentSubmit}
      >
        결제하기
      </button>
    </div>
  );
}
