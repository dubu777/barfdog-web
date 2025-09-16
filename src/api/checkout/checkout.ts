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
} from "@/types";

// 구독 결제 주문 정보 조회
const getSubscriptionOrder = async (
  subscribeId: number
): Promise<SubscriptionOrderSheetResponse> => {
  const { data } = await axiosInstance.get(
    `/api/orders/sheet/subscribe/${subscribeId}`
  );

  return data;
};

// 구독 결제 주문 정보 저장
const saveSubscriptionOrder = async ({
  subscribeId,
  body,
}: {
  subscribeId: number;
  body: SaveSubscriptionOrderRequest;
}): Promise<SaveOrderResponse> => {
  const data = await axiosInstance.post(
    `/api/orders/subscribe/${subscribeId}`,
    body
  );

  return data;
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

// 정상 결제 요청: 최종 결제 완료
const successSubscriptionPayment = async ({
  orderId,
  body,
}: {
  orderId: number;
  body: SuccessSubscriptionPaymentRequest;
}) => {
  const { data } = await axiosInstance.post(
    `/api/orders/${orderId}/subscribe/success`,
    body
  );
  return data;
};

// 주문 결제 검증에 실패 하였을때 재검증 하는 로직.
const invalidSuccessSubscriptionPayment = async ({
  orderId,
  body,
}: {
  orderId: number;
  body: SuccessSubscriptionPaymentRequest; // 결제 취소 시에도 동일한 데이터 구조 사용 (추가 error_msg, error_code 포함)
}) => {
  const { data } = await axiosInstance.post(
    `/api/orders/${orderId}/subscribe/success/invalidPayment`,
    body
  );
  return data;
};

// 구독 결제 실패
const failSubscriptionPayment = async (orderId: number) => {
  const { data } = await axiosInstance.post(
    `/api/orders/${orderId}/subscribe/fail`
  );
  return data;
};

// 구독 결제 실패
const cancelSubscriptionPayment = async (orderId: number) => {
  const { data } = await axiosInstance.post(
    `/api/orders/${orderId}/subscribe/cancel`
  );
  return data;
};

// 일반 결제 주문 정보 조회
const getGeneralOrder = async (
  body: GeneralOrderSheetRequest
): Promise<GeneralOrderSheetResponse> => {
  const { data } = await axiosInstance.post("/api/orders/sheet/general", body);

  return data;
};

// 일반 결제 주문 정보 저장
const saveGeneralOrder = async (
  body: SaveGeneralOrderRequest
): Promise<SaveOrderResponse> => {
  const data = await axiosInstance.post("/api/orders/general", body);

  return data;
};

// 일반 결제 주문 성공
const successGeneralPayment = async ({
  id,
  body,
}: {
  id: number;
  body: SuccessGeneralPaymentRequest;
}): Promise<SuccessGeneralOrderResponse> => {
  const { data } = await axiosInstance.post(
    `/api/orders/${id}/general/success`,
    body
  );
  return data;
};

// 일반 결제 주문 실패
const failGeneralPayment = async (id: number) => {
  const { data } = await axiosInstance.post(`/api/orders/${id}/general/fail`);

  return data;
};
// 일반 결제 주문 취소
const cancelGeneralPayment = async (id: number) => {
  const { data } = await axiosInstance.post(`/api/orders/${id}/general/cancel`);

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
  invalidSuccessSubscriptionPayment,
  failSubscriptionPayment,
  cancelGeneralPayment,
  cancelSubscriptionPayment,
};
