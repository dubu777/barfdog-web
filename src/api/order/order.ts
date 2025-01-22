import axiosInstance from "../axiosInstance";
import {
  AddressResponse,
  CreateGeneralOrderRequest,
  CreateGeneralOrderResponse,
  CreateSubscriptionOrderRequest,
  GeneralOrderSheetRequest,
  GeneralOrderSheetResponse,
  SubscriptionOrderDto,
  SubscriptionOrderSheetResponse,
  SuccessGeneralOrderResponse,
  SuccessGeneralPaymentRequest,
} from "@/types";
import {
  GeneralOrderData,
  MergeOrderAndRecipe,
  SubscriptionOrderData,
} from "@/types";

export {
  getOrderDetail,
  getSubscriptionOrderList,
  getGeneralOrderList,
  getSubscriptionOrder,
  getAddress,
  getGeneralOrder,
  createGeneralOrder,
  successGeneralPayment,
  failGeneralPayment,
  createSubscriptionOrder,
};

const getSubscriptionOrder = async (
  subscribeId: number
): Promise<SubscriptionOrderSheetResponse> => {
  const { data } = await axiosInstance.get(
    `/api/orders/sheet/subscribe/${subscribeId}`
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
const createGeneralOrder = async (
  body: CreateGeneralOrderRequest
): Promise<CreateGeneralOrderResponse> => {
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
const failGeneralPayment = async (id: number): Promise<any> => {
  const { data } = await axiosInstance.post(`/api/orders/${id}/general/fail`);

  return data;
};

// 구독 결제 주문 정보 저장
const createSubscriptionOrder = async ({
  subscribeId,
  body,
}: {
  subscribeId: number;
  body: CreateSubscriptionOrderRequest;
}): Promise<any> => {
  const data = await axiosInstance.post(
    `/api/orders/subscribe/${subscribeId}`,
    body
  );

  return data;
};

const getAddress = async (): Promise<AddressResponse[]> => {
  const { data } = await axiosInstance.get(`/api/address`);

  return data._embedded.addressResponseDtoList;
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
  orderId: string,
  type: string
): Promise<MergeOrderAndRecipe> => {
  const { data } = await axiosInstance.get(`/api/orders/${orderId}/${type}`);
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
