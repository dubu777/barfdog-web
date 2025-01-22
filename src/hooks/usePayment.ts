import { useState, useEffect } from "react";
import { GeneralOrderSheetResponse, GeneralPortOneResponse, PaymentMethod, SubscriptionOrderSheetResponse, SubscriptionPortOneResponse } from "@/types";
import { CreateGeneralOrderRequest, CreateSubscriptionOrderRequest } from "@/types";
import { PAYMENT_METHOD, PG_TYPE } from "@/constants";
import useDeviceState from "@/hooks/useDeviceState";
import { getNaverPayGeneralPaymentParam, getNaverPaySubscriptionPaymentParam } from "@/utils/order/naverPayParams";
import { getPaymentDisplayAmount } from "@/utils/order/getPaymentDisplayAmount";

interface GeneralPaymentDataParams {
  requestBody: CreateGeneralOrderRequest;
  id: number;
  merchantUid: string;
  generalOrderSheetData: GeneralOrderSheetResponse;
  paymentMethod: PaymentMethod;
}

interface SubscriptionPaymentDataParams {
  requestBody: CreateSubscriptionOrderRequest;
  customerUid: string;
  subscriptionOrderSheetData: SubscriptionOrderSheetResponse;
  paymentMethod: PaymentMethod;
}

/**
 * 공통 훅: 결제 처리 (일반 및 구독 결제)
 */
export function usePayment() {
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);

  // 아임포트 스크립트 로드
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

  // 결제 요청 함수
  const requestPayment = (
    paymentData: any,
    callback: (response: GeneralPortOneResponse | SubscriptionPortOneResponse) => void
  ) => {
    if (!isScriptLoaded || !window.IMP) {
      console.error("IMP 스크립트가 로드되지 않았습니다.");
      return;
    }

    const IMP = window.IMP;
    IMP.init(process.env.NEXT_PUBLIC_IAMPORT_CODE);

    IMP.request_pay(paymentData, callback);
  };

  return { requestPayment };
}

/**
 * 일반 결제 데이터 생성
 */
export function createGeneralPaymentData({
  requestBody,
  id,
  merchantUid,
  generalOrderSheetData,
  paymentMethod,
}: GeneralPaymentDataParams) {
  const { isMobileDevice } = useDeviceState();
  const itemList = generalOrderSheetData.orderItemDtoList;
  const itemName = itemList.map((item) => item.name).join(", ");

  const baseData = {
    pg: PG_TYPE.GENERAL[paymentMethod],
    pay_method: PAYMENT_METHOD[paymentMethod],
    merchant_uid: merchantUid,
    amount: requestBody.paymentPrice,
    name: itemName,
    buyer_email: generalOrderSheetData.email,
    buyer_name: generalOrderSheetData.name,
    buyer_tel: requestBody.deliveryDto.phone,
    buyer_addr: `${requestBody.deliveryDto.street}, ${requestBody.deliveryDto.detailAddress}`,
    buyer_postcode: requestBody.deliveryDto.zipcode,
    m_redirect_url: `${window.location.origin}/order/loading/${id}`,
  };

  if (paymentMethod === "NAVER_PAY") {
    const naverPayData = getNaverPayGeneralPaymentParam({
      items: generalOrderSheetData.orderItemDtoList,
      isMobile: isMobileDevice,
    });

    if (!naverPayData) throw new Error("네이버페이 결제 데이터 생성 실패");

    return { ...baseData, ...naverPayData };
  }

  return baseData;
}

/**
 * 구독 결제 데이터 생성
 */
export function createSubscriptionPaymentData({
  requestBody,
  customerUid,
  subscriptionOrderSheetData,
  paymentMethod,
}: SubscriptionPaymentDataParams) {
  const { isMobileDevice } = useDeviceState();

  const baseData = {
    pg: PG_TYPE.SUBSCRIPTION[paymentMethod],
    pay_method: PAYMENT_METHOD["CREDIT_CARD"],
    merchant_uid: null,
    customer_uid: customerUid,
    amount: getPaymentDisplayAmount({
      paymentMethod,
      originAmount: requestBody.paymentPrice,
    }),
    name: subscriptionOrderSheetData.recipeNameList.join(", "),
    buyer_email: subscriptionOrderSheetData.email,
    buyer_name: subscriptionOrderSheetData.name,
    buyer_tel: requestBody.deliveryDto.phone,
    buyer_addr: `${requestBody.deliveryDto.street}, ${requestBody.deliveryDto.detailAddress}`,
    buyer_postcode: requestBody.deliveryDto.zipcode,
    m_redirect_url: `${window.location.origin}/order/loading/subscribe`,
  };

  if (paymentMethod === "NAVER_PAY") {
    const naverPayData = getNaverPaySubscriptionPaymentParam({
      subscribeId: subscriptionOrderSheetData.subscribeDto.id,
      isMobile: isMobileDevice,
    });

    if (!naverPayData) throw new Error("네이버페이 구독 데이터 생성 실패");

    return { ...baseData, ...naverPayData };
  }

  return baseData;
}
