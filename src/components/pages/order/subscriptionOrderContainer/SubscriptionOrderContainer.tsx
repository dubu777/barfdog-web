"use client";

import PaymentMethod from "../paymentMethod/PaymentMethod";
import { useEffect, useState } from "react";
import { ORDER_TYPE, PAYMENT_METHOD, PG_TYPE } from "@/constants";

import OrderSummary from "../orderSummary/OrderSummary";
import DeliveryAddress from "../deliveryAddress/DeliveryAddress";
import OrderItem from "../orderItem/OrderItem";
import Divider from "@/components/common/divider/Divider";
import RewardUsage from "../reward/RewardUsage";
import { useOrderStore } from "@/store/order/useOrderStore";
import {
  CreateSubscriptionOrderRequest,
  SubscriptionPortOneResponse,
} from "@/types";
import { usePaymentStore } from "@/store/order/usePaymentStore";
import { useUpdateSubscriptionOrderBody } from "@/hooks/useUpdateSubscriptionOrderBody";
import { getPaymentDisplayAmount } from "@/utils/order/getPaymentDisplayAmount";
import { createSubscriptionPaymentData, usePayment } from "@/hooks/usePayment";
import { generateCustomerUid } from "@/utils/order/generateCustomerUid";
import useDeviceState from "@/hooks/useDeviceState";
import { useGetSubscriptionOrder } from "@/api/order/queries/useGetSubscriptionOrder";
import { useCreateSubscriptionOrder } from "@/api/order/mutations/useCreateSubscriptionOrder";

interface SubscriptionOrderContainerProps {
  subscribeId: number;
}

interface SubscriptionPaymentProps {
  requestBody: CreateSubscriptionOrderRequest;
  id: number;
  merchantUid: string;
  customerUid: string;
  subscribeId: string;
}

export default function SubscriptionOrderContainer({
  subscribeId,
}: SubscriptionOrderContainerProps) {
  const { subscriptionOrderBody, updateOrderBody, getRequestBody } =
    useOrderStore();

  const { data: subscriptionOrderSheetData } =
    useGetSubscriptionOrder(subscribeId);
  const { mutate: createSubscriptionOrder } = useCreateSubscriptionOrder();

  const { requestPayment } = usePayment();
  const { isMobileDevice } = useDeviceState();
  // 구독 구매 페이지 정보 초기값 없데이트
  useUpdateSubscriptionOrderBody(subscriptionOrderSheetData);

  // 결제 요청
  const handlePaymentSubmit = () => {
    const requestBody = getRequestBody(
      ORDER_TYPE.SUBSCRIPTION
    ) as CreateSubscriptionOrderRequest;

    createSubscriptionOrder(
      { subscribeId, body: requestBody },
      {
        onSuccess: (data) => {
          console.log("createSubscriptionOrder", data);

          // if (data.status === 200) {
          //   const paymentData = createSubscriptionPaymentData({
          //     requestBody: requestBody as CreateSubscriptionOrderRequest,
          //     id: data.data.id,
          //     merchantUid: data.data.merchantUid,
          //     customerUid: requestBody.customerUid,
          //     subscribeId: subscribeId,
          //   });
          //   requestPayment({
          //     orderType: ORDER_TYPE.SUBSCRIPTION,
          //     paymentData,
          //     callback: (res: SubscriptionPortOneResponse) => {
          //       if (res.success) {
          //         console.log("결제 성공");
          //       } else {
          //         console.error("결제 실패");
          //       }
          //     },
          // }
          //   });
        },
      }
    );
  };

  // console.log("subscriptionOrderSheetData", subscriptionOrderSheetData);
  // console.log("subscriptionOrderBody", subscriptionOrderBody);

  // useEffect(() => {
  //   const script = document.createElement("script");
  //   script.src = "https://cdn.iamport.kr/v1/iamport.js";
  //   script.async = true;

  //   script.onload = () => {
  //     setIsScriptLoaded(true);
  //   };

  //   document.body.appendChild(script);

  //   return () => {
  //     document.body.removeChild(script);
  //   };
  // }, []);

  // const subscriptionPayment = ({
  //   requestBody,
  //   id,
  //   merchantUid,
  //   customerUid,
  //   subscribeId,
  // }: SubscriptionPaymentProps) => {
  //   if (!isScriptLoaded || !window.IMP) {
  //     console.error("IMP 스크립트가 로드되지 않았습니다.");
  //     return;
  //   }
  //   const IMP = window.IMP;
  //   IMP.init(process.env.NEXT_PUBLIC_IAMPORT_CODE);

  //   const itemName = subscriptionOrderSheetData.recipeNameList.join(", ");

  //   // 포트원 request
  //   const paymentData = {
  //     pg: PG_TYPE.SUBSCRIPTION[paymentMethod],
  //     pay_method: PAYMENT_METHOD["CREDIT_CARD"],
  //     merchant_uid: null, // 주문번호
  //     amount: getPaymentDisplayAmount({
  //       paymentMethod,
  //       originAmount: requestBody.paymentPrice,
  //     }),
  //     customer_uid: customerUid,
  //     name: itemName,
  //     buyer_email: subscriptionOrderSheetData.email,
  //     buyer_name: subscriptionOrderSheetData.name,
  //     buyer_tel: requestBody.deliveryDto.phone,
  //     buyer_addr: `${requestBody.deliveryDto.street}, ${requestBody.deliveryDto.detailAddress}`,
  //     buyer_postcode: requestBody.deliveryDto.zipcode,
  //     m_redirect_url: `${window.location.origin}/order/loading/subscribe`,
  //   };

  //   IMP.request_pay(paymentData, async (res: SubscriptionPortOneResponse) => {
  //     const { success, customer_uid, error_code, error_msg } = res;
  //     if (success) {
  //       // 결제 성공
  //       try {
  //       } catch (error) {
  //         console.error("결제 성공 처리 에러", error);
  //       }
  //     } else {
  //       // 결제 실패 시 처리
  //       try {
  //         console.error("결제 실패:", error_msg);
  //         window.location.href = `/order/order-failed`;
  //       } catch (error) {
  //         console.error("결제 실패 처리 에러", error);
  //       }
  //     }
  //   });
  // };

  // const handlePaymentSubmit = () => {
  //   const requestBody = getRequestBody(ORDER_TYPE.SUBSCRIPTION);
  //   createSubscriptionOrder(requestBody as CreateSubscriptionOrderRequest, {
  //     onSuccess: (data) => {
  //       console.log("createGeneralOrder????????????????", data);
  //       if (data.status === 200) {
  //         subscriptionPayment({
  //           requestBody: requestBody as CreateSubscriptionOrderRequest,
  //           id: data.data.id,
  //           merchantUid: data.data.merchantUid,
  //           customerUid: customerUid,
  //           subscribeId: subscribeId,
  //         });
  //       } else {
  //         console.error("결제 요청 실패: 서버 검증 실패");
  //       }
  //     },
  //     onError: (err) => {
  //       console.log("createGeneralOrder-error", err);
  //     },
  //   });
  // };
  return (
    <div>
      <DeliveryAddress orderType={ORDER_TYPE.GENERAL} />
      <Divider />
      <OrderItem
        orderType={ORDER_TYPE.GENERAL}
        subscriptionOrderSheetData={subscriptionOrderSheetData}
      />
      <Divider />
      <OrderSummary
        orderType={ORDER_TYPE.GENERAL}
        orderPrice={subscriptionOrderSheetData.subscribeDto.nextPaymentPrice}
        freeCondition={undefined}
        deliveryPrice={undefined}
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
