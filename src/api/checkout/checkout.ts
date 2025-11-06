import { AxiosInstance } from "axios";
import axiosInstance from "../axiosInstance";
import {
  SaveGeneralOrderRequest,
  SaveOrderResponse,
  SaveSubscriptionOrderRequest,
  GeneralOrderSheetRequest,
  GeneralOrderSheetResponse,
  SubscriptionOrderSheetResponse,
  SuccessGeneralOrderResponse,
  SuccessGeneralPaymentRequest,
  SuccessSubscriptionPaymentRequest,
  SubscriptionCheckoutSheetResponse,
} from "@/types";

// 구독 결제 페이지 조회 - v2
const getSubscriptionCheckoutSheet = async (
  subscribeId: number,
  instance: AxiosInstance = axiosInstance
): Promise<SubscriptionCheckoutSheetResponse> => {
  const { data } = await instance.get(
    `/api/v2/orders/payment/sheet/subscription/${subscribeId}`
  );
  if (data.success) {
    return data.data;
  }
  const message = data.detailMessage ?? "결제 정보를 불러오지 못했습니다";
  throw new Error(message);
};

// 구독 결제 주문 정보 조회 - 레거시
const getSubscriptionOrder = async (
  subscribeId: number
): Promise<SubscriptionOrderSheetResponse> => {
  const { data } = await axiosInstance.get(
    `/api/orders/sheet/subscribe/${subscribeId}`
  );

  return data;
};

// 구독 결제 주문 정보 저장 - v2
const saveSubscriptionOrder = async ({
  subscribeId,
  body,
}: {
  subscribeId: number;
  body: SaveSubscriptionOrderRequest;
}): Promise<SaveOrderResponse> => {
  const { data } = await axiosInstance.post(
    `/api/v2/orders/subscription/${subscribeId}`,
    body
  );
  if (data.success) {
    return data.data;
  }
  const message = data.detailMessage ?? "결제 정보를 저장하지 못했습니다";
  throw new Error(message);
};

// 주문 결제 검증: 요청 결제 금액과 실 결제 금액 비교
const validateSubscriptionPayment = async ({
  orderId,
  impUid,
}: {
  orderId: number;
  impUid: string;
}): Promise<boolean> => {
  const { data } = await axiosInstance.post(
    `/api/orders/${orderId}/validation`,
    { impUid }
  );
  return data.valid;
};

// 정상 결제 요청: 최종 결제 완료 - v2
const successSubscriptionPayment = async ({
  orderId,
  body,
}: {
  orderId: number;
  body: SuccessSubscriptionPaymentRequest;
}) => {
  const { data } = await axiosInstance.post(
    `/api/v2/orders/${orderId}/subscription/success`,
    body
  );
  if (data.success) {
    return data.data;
  }
  const message = data.detailMessage ?? "결제 성공 처리에 실패했습니다";
  throw new Error(message);
};

// 구독 결제 실패 - v2
const failSubscriptionPayment = async (orderId: number) => {
  const { data } = await axiosInstance.post(
    `/api/v2/orders/${orderId}/subscription/fail`
  );
  if (data.success) {
    return data.data;
  }
  const message = data.detailMessage ?? "결제 실패 처리에 실패했습니다";
  throw new Error(message);
};

// 구독 결제 취소 - v2
const cancelSubscriptionPayment = async (orderId: number) => {
  const { data } = await axiosInstance.post(
    `/api/orders/${orderId}/subscribe/cancel`
  );
  if (data.success) {
    return data.data;
  }
  const message = data.detailMessage ?? "결제 취소 처리에 실패했습니다";
  throw new Error(message);
};

// 일반 결제 주문 정보 조회 - v2
const getGeneralCheckoutSheet = async (
  body: GeneralOrderSheetRequest
): Promise<GeneralOrderSheetResponse> => {
  const { data } = await axiosInstance.post(
    "/api/v2/orders/sheet/general",
    body
  );
  if (data.success) {
    return data.data;
  }
  const message = data.detailMessage ?? "결제 페이지 정보 조회에 실패했습니다";
  throw new Error(message);
};

// 일반 결제 주문 정보 조회
const getGeneralOrder = async (
  body: GeneralOrderSheetRequest
): Promise<GeneralOrderSheetResponse> => {
  const { data } = await axiosInstance.post("/api/orders/sheet/general", body);

  return data;
};

// 일반 결제 주문 정보 저장 - v2
const saveGeneralOrder = async (
  body: SaveGeneralOrderRequest
): Promise<SaveOrderResponse> => {
  const { data } = await axiosInstance.post("/api/v2/orders/general", body);

  if (data.success) {
    return data.data;
  }
  const message = data.detailMessage ?? "결제 정보를 저장하지 못했습니다";
  throw new Error(message);
};

// 일반 결제 주문 성공 - v2
const successGeneralPayment = async ({
  id,
  body,
}: {
  id: number;
  body: SuccessGeneralPaymentRequest;
}): Promise<SuccessGeneralOrderResponse> => {
  const { data } = await axiosInstance.post(
    `/api/v2/orders/${id}/general/success`,
    body
  );
  if (data.success) {
    return data.data;
  }
  const message = data.detailMessage ?? "결제 성공 처리에 실패했습니다";
  throw new Error(message);
};

// 일반 결제 주문 실패 - v2
const failGeneralPayment = async (id: number) => {
  const { data } = await axiosInstance.post(
    `/api/v2/orders/${id}/general/fail`
  );

  return data;
};

// 일반 결제 주문 취소
const cancelGeneralPayment = async (id: number) => {
  const { data } = await axiosInstance.post(
    `/api/v2/orders/${id}/general/cancel`
  );

  return data;
};

export {
  getSubscriptionOrder,
  getGeneralOrder,
  saveGeneralOrder,
  successGeneralPayment,
  failGeneralPayment,
  saveSubscriptionOrder,
  validateSubscriptionPayment,
  successSubscriptionPayment,
  failSubscriptionPayment,
  cancelGeneralPayment,
  cancelSubscriptionPayment,
  getSubscriptionCheckoutSheet,
  getGeneralCheckoutSheet,
};
