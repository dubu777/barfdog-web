import { useState, useEffect } from "react";
import {
  OrderType,
  PaymentRequestParams,
  IamportResponseMap,
} from "@/types";
import { ORDER_TYPE } from "@/constants";


// 공통 훅: 결제 처리
export function usePayment() {
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);

  // IMP 스크립트 로드
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.iamport.kr/v1/iamport.js";
    script.async = true;
    script.onload = () => setIsScriptLoaded(true);
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // 결제 요청
  const requestIamportPayment = <T extends OrderType>({
    orderType,
    paymentData,
    callback, // 결제 완료 후 콜백 함수
  }: PaymentRequestParams<T>) => {
    if (!isScriptLoaded || !window.IMP) {
      console.error("IMP 스크립트가 로드되지 않았습니다.");
      return;
    }

    const IMP = window.IMP;
    IMP.init(process.env.NEXT_PUBLIC_IAMPORT_CODE);

    IMP.request_pay(paymentData, (response: IamportResponseMap[T]) => {
      if (orderType === ORDER_TYPE.GENERAL) {
        callback(response);
      } else if (orderType === ORDER_TYPE.SUBSCRIPTION) {
        callback(response);
      } else {
        console.error("결제 응답 데이터가 올바르지 않습니다.");
      }
    });
  };

  return { requestIamportPayment };
}
