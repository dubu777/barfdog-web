import axiosInstance from "../axiosInstance";
import {
  SaveGeneralOrderRequest,
  SaveOrderResponse,
  SaveSubscriptionOrderRequest,
  GeneralOrderSheetRequest,
  GeneralOrderSheetResponse,
  SubscriptionOrderDto,
  SubscriptionOrderSheetResponse,
  SuccessGeneralOrderResponse,
  SuccessGeneralPaymentRequest,
  SuccessSubscriptionPaymentRequest,
  ValidateSubscriptionPaymentResponse,
} from "@/types";
import {
  GeneralOrderData,
  MergeOrderAndRecipe,
  SubscriptionOrderData,
} from "@/types";
import {getCookie} from "@/utils/auth/cookie";

export {
  getOrderDetail,
  getSubscriptionOrderList,
  getGeneralOrderList,
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
};

// 구독 결제 주문 정보 조회
const getSubscriptionOrder = async (
  subscribeId: number
): Promise<SubscriptionOrderSheetResponse> => {
  
  const { data } = await axiosInstance.get(
    `/api/orders/sheet/subscribe/${subscribeId}?alliance=cb`
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
    `/api/orders/subscribe/${subscribeId}=`,
    body
  );

  return data;
};


// 주문 결제 검증: 요청 결제 금액과 실 결제 금액 비교
const validateSubscriptionPayment = async ({ orderId, impUid }: { orderId: number; impUid: string; }): Promise<ValidateSubscriptionPaymentResponse> => {
  const { data } = await axiosInstance.post(`/api/orders/${orderId}/validation`, { impUid });
  return data.valid;
};

// 정상 결제 요청: 최종 결제 완료
const successSubscriptionPayment = async ({
  orderId,
  body,
}: {
  orderId: number;
  body: SuccessSubscriptionPaymentRequest;
}): Promise<any> => {
  const { data } = await axiosInstance.post(`/api/orders/${orderId}/subscribe/success`, body);
  return data;
};

// 위변조 결제 취소 요청
const invalidSuccessSubscriptionPayment = async ({
  orderId,
  body,
}: {
  orderId: number;
  body: SuccessSubscriptionPaymentRequest; // 결제 취소 시에도 동일한 데이터 구조 사용 (추가 error_msg, error_code 포함)
}): Promise<any> => {
  const { data } = await axiosInstance.post(`/api/orders/${orderId}/subscribe/success/invalidPayment`, body);
  return data;
};

// 구독 결제 실패
const failSubscriptionPayment = async (orderId: number): Promise<any> => {
  const { data } = await axiosInstance.post(`/api/orders/${orderId}/subscribe/fail`);
  return data;
}


// 일반 결제 주문 정보 조회
const getGeneralOrder = async (
  body: GeneralOrderSheetRequest
): Promise<GeneralOrderSheetResponse> => {
  const alliance = getCookie('alliance');
  const { data } = await axiosInstance.post(`/api/orders/sheet/general?alliance=${alliance || ''}`, body);

  return data;
};

// 일반 결제 주문 정보 저장
const saveGeneralOrder = async (
  body: SaveGeneralOrderRequest
): Promise<SaveOrderResponse> => {
  const data = await axiosInstance.post("/api/orders/general?alliance=cb", body);

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
const failGeneralPayment = async (id: number): Promise<any> => {
  const { data } = await axiosInstance.post(`/api/orders/${id}/general/fail`);

  return data;
};



// SubscribeOrderDto 타입이 정의되어 있지 않음
const getSubscriptionOrderList = async (
  page: number,
  size: number
): Promise<SubscriptionOrderData[]> => {
  const { data } = await axiosInstance.get(
    `/api/orders/subscribe?page=${page}&size=${size}`
  );
  return (
    data._embedded?.querySubscribeOrdersDtoList.map(
      ({
        subscribeOrderDto,
        ...rest
      }: {
        subscribeOrderDto: SubscriptionOrderDto;
      }) => ({
        orderDto: subscribeOrderDto,
        ...rest,
      })
    ) || []
  );
};

const getGeneralOrderList = async (
  page: number,
  size: number
): Promise<GeneralOrderData[]> => {
  const { data } = await axiosInstance.get(
    `/api/orders/general?page=${page}&size=${size}`
  );
  return data._embedded?.queryGeneralOrdersDtoList || [];
};

const getOrderDetail = async (
  orderId: number,
  type: string
): Promise<MergeOrderAndRecipe> => {
  const { data } = await axiosInstance.get(`/api/orders/${orderId}/${type === 'subscription' ? 'subscribe' : type}`);
  const mergeOrderAndRecipe: MergeOrderAndRecipe = {
    ...data,
    orderItemDtoList: data.orderItemDtoList ? [...data.orderItemDtoList] : [],
    orderDto: {
      ...data.orderDto,
      ...data.recipeDto,
    },
    recipeDto: undefined,
  };

  return mergeOrderAndRecipe || null;
};
