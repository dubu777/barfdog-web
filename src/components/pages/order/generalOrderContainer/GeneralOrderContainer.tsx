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

interface GeneralOrderContainerProps {}


export default function GeneralOrderContainer({}: GeneralOrderContainerProps) {
  // 상태관리
  const { generalOrderBody, getRequestBody } = useOrderStore();
  const { orderItemDtoList, clearOrderItemDtoList } = usePersistOrderStore();
  const { mutate: createGeneralOrder } = useSaveGeneralOrder();
  const { mutate: fetchGeneralOrder } = useGetGeneralOrder();
  const { mutate: successGeneralPayment } = useSuccessGeneralPayment();
  const { mutate: failGeneralPayment } = useFailGeneralPayment();
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

  // console.log("generalOrderSheetData", generalOrderSheetData);
// 결제 요청 함수
const handlePaymentSubmit = () => {
  const requestBody = getRequestBody(ORDER_TYPE.GENERAL);
  console.log("requestBody", requestBody);
  
  // 일반 주문 생성 후 결제 요청
  createGeneralOrder(requestBody as SaveGeneralOrderRequest, {
    onSuccess: (data) => {
      if (data.status === 200) {
        const paymentData = buildGeneralPaymentRequest({
          requestBody: requestBody as SaveGeneralOrderRequest,
          id: data.data.id,
          merchantUid: data.data.merchantUid,
          generalOrderSheetData,
          isMobileDevice,
        });

        requestIamportPayment({
          orderType: ORDER_TYPE.GENERAL,
          paymentData,
          callback: (response) => {
            const res = response as GeneralIamportResponse;
            
            // 포트원 결제 성공 시 
            if (res.success) {
              console.log("결제 성공:", res);
              
              successGeneralPayment(
                {
                  id: data.data.id,
                  body: {
                    impUid: res.imp_uid,
                    merchantUid: res.merchant_uid,
                    discountReward: requestBody.discountReward,
                  },
                },
                {
                  onSuccess: () => {
                    // window.location.href = `/order/order-completed`;
                    // clearOrderItemDtoList();
                  },
                }
              );
            } else {
              failGeneralPayment(data.data.id);
              console.error("결제 실패:", res);
              // window.location.href = `/order/order-failed`;
            }
          },
        });
      } else {
        console.error("결제 요청 실패: 서버 검증 실패");
      }
    },
    onError: (err) => {
      console.error("createGeneralOrder-error", err);
    },
  });
};

  return (
    <div>
      <DeliveryAddress
        orderType={ORDER_TYPE.GENERAL}
      />
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