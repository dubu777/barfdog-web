import { useState, useEffect } from "react";
import {
  GeneralOrderSheetResponse,
  GeneralPortOneRequest,
  OrderType,
  PaymentMethod,
  PaymentRequestParams,
  PortOneResponseMap,
  SubscriptionOrderSheetResponse,
  SubscriptionPortOneRequest,
  CreateGeneralOrderRequest,
  CreateSubscriptionOrderRequest,
} from "@/types";
import { ORDER_TYPE, PAYMENT_METHOD, PG_TYPE } from "@/constants";
import useDeviceState from "@/hooks/useDeviceState";
import {
  getNaverPayGeneralPaymentParam,
  getNaverPaySubscriptionPaymentParam,
} from "@/utils/order/naverPayParams";
import { getPaymentDisplayAmount } from "@/utils/order/getPaymentDisplayAmount";

interface GeneralPaymentDataParams {
  requestBody: CreateGeneralOrderRequest;
  id: number;
  merchantUid: string;
  generalOrderSheetData: GeneralOrderSheetResponse;
  isMobileDevice: boolean;
}

interface SubscriptionPaymentDataParams {
  requestBody: CreateSubscriptionOrderRequest;
  subscriptionOrderSheetData: SubscriptionOrderSheetResponse;
  isMobileDevice: boolean;
}


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
  const requestPayment = <T extends OrderType>({
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

    IMP.request_pay(paymentData, (response: PortOneResponseMap[T]) => {
      if (orderType === ORDER_TYPE.GENERAL) {
        callback(response);
      } else if (orderType === ORDER_TYPE.SUBSCRIPTION) {
        callback(response);
      } else {
        console.error("결제 응답 데이터가 올바르지 않습니다.");
      }
    });
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
  isMobileDevice,
}: GeneralPaymentDataParams): GeneralPortOneRequest {
  const { paymentMethod, paymentPrice, deliveryDto } = requestBody;
  const { orderItemDtoList, email, name } = generalOrderSheetData;

  const itemList = orderItemDtoList;
  const itemName = itemList.map((item) => item.name).join(", ");

  const baseData = {
    pg: PG_TYPE.GENERAL[paymentMethod],
    pay_method: PAYMENT_METHOD[paymentMethod],
    merchant_uid: merchantUid,
    amount: paymentPrice,
    name: itemName,
    buyer_email: email,
    buyer_name: name,
    buyer_tel: deliveryDto.phone ?? "",
    buyer_addr: `${deliveryDto.street}, ${deliveryDto.detailAddress}`,
    buyer_postcode: deliveryDto.zipcode ?? "",
    m_redirect_url: `${window.location.origin}/order/loading/${id}`,
  };

  if (paymentMethod === "NAVER_PAY") {
    const naverPayData = getNaverPayGeneralPaymentParam({
      items: orderItemDtoList,
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
  subscriptionOrderSheetData,
  isMobileDevice,
}: SubscriptionPaymentDataParams): SubscriptionPortOneRequest {
  const { paymentMethod, paymentPrice, deliveryDto, customerUid } = requestBody;
  const { email, name, subscribeDto, recipeNameList } =
    subscriptionOrderSheetData;

  const baseData = {
    pg: PG_TYPE.SUBSCRIPTION[paymentMethod],
    pay_method: PAYMENT_METHOD["CREDIT_CARD"],
    merchant_uid: null,
    customer_uid: customerUid,
    amount: getPaymentDisplayAmount({
      paymentMethod: paymentMethod,
      originAmount: paymentPrice,
    }),
    name: recipeNameList.join(", "),
    buyer_email: email,
    buyer_name: name,
    buyer_tel: deliveryDto.phone ?? "",
    buyer_addr: `${deliveryDto.street}, ${deliveryDto.detailAddress}`,
    buyer_postcode: deliveryDto.zipcode ?? "",
    m_redirect_url: `${window.location.origin}/order/loading/subscribe`,
  };

  if (paymentMethod === "NAVER_PAY") {
    const naverPayData = getNaverPaySubscriptionPaymentParam({
      subscribeId: subscribeDto.id,
      isMobile: isMobileDevice,
    });

    if (!naverPayData) throw new Error("네이버페이 구독 데이터 생성 실패");

    return { ...baseData, ...naverPayData };
  }

  return baseData;
}