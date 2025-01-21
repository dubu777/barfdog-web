"use client";

import { useGetSubscriptionOrderSheet } from "@/api/order/queries/useGetSubscriptionOrderSheet";
// import * as styles from "./OrderInfo.css";
import PaymentMethod from "../paymentMethod/PaymentMethod";
import { useEffect, useState } from "react";
import { usePaymentStore } from "@/store/order/usePaymentStore";
import { ORDER_TYPE } from "@/constants";

import OrderSummary from "../orderSummary/OrderSummary";

interface SubscriptionOrderContainerProps {
  subscribeId: number;
}

export default function SubscriptionOrderContainer({
  subscribeId,
}: SubscriptionOrderContainerProps) {
  const { data: subscriptionOrderSheetData } =
    useGetSubscriptionOrderSheet(subscribeId);
  const { paymentMethod } = usePaymentStore();
  const [isScriptLoaded, setIsScriptLoaded] = useState<boolean>(false);

  console.log("subscriptionOrderSheetData", subscriptionOrderSheetData);

  // 결제 관련 코드 ========================================================
  // 포트원 스크립트 로드 및 로드 확인
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.iamport.kr/v1/iamport.js";
    script.async = true;

    script.onload = () => {
      setIsScriptLoaded(true); // 스크립트 로드 완료 상태 업데이트
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handlePaymentSubmit = () => {};

  const generalPayment = () => {
    if (!isScriptLoaded || !window.IMP) {
      console.error("IMP 스크립트가 로드되지 않았습니다.");
      return;
    }

  };

  return (
    <div>

      <OrderSummary
        orderType={ORDER_TYPE.SUBSCRIPTION}
        orderPrice={subscriptionOrderSheetData.subscribeDto.nextPaymentPrice}
        freeCondition={undefined} // 구독 결제는 배송비 무료
        deliveryPrice={undefined} // 구독 결제는 배송비 무료
        plan={subscriptionOrderSheetData.subscribeDto.plan}
        // setMaxAvailableDiscount={setMaxAvailableDiscount}
        // setMaxAvailableReward={setMaxAvailableReward}

      />
      <PaymentMethod />
      <button onClick={handlePaymentSubmit}>결제하기</button>
    </div>
  );
}
