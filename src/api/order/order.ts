import axiosInstance from "../axiosInstance";
import { AddressResponse, CreateGeneralOrderRequest, CreateGeneralOrderResponse, GeneralOrderSheetRequest, GeneralOrderSheetResponse, SubscriptionOrderDto, SubscriptionOrderSheetResponse } from "@/types";
import { GeneralOrderData, MergeOrderAndRecipe, SubscriptionOrderData } from "@/types";

export { getOrderDetail, getSubscriptionOrderList, getGeneralOrderList, getSubscriptionOrderSheet, getAddress, getGeneralOrderSheet, createGeneralOrderSheet };

const getSubscriptionOrderSheet = async (subscribeId: number): Promise<SubscriptionOrderSheetResponse> => {
  const {data} = await axiosInstance.get(`/api/orders/sheet/subscribe/${subscribeId}`);

  return data
}

// request body가 복잡해서 get 대신 post로 요청했다고 하는데 괜찮은지 확인 필요
const getGeneralOrderSheet = async (body: GeneralOrderSheetRequest): Promise<GeneralOrderSheetResponse> => {
  const {data} = await axiosInstance.post('/api/orders/sheet/general', body);

  return data
}

const createGeneralOrderSheet = async (body: CreateGeneralOrderRequest): Promise<CreateGeneralOrderResponse> => {
  const {data} = await axiosInstance.post('/api/orders/general', body);

  return data
}


const getAddress = async (): Promise<AddressResponse[]> => {
  const {data} = await axiosInstance.get(`/api/address`);

  return data._embedded.addressResponseDtoList
}

// SubscribeOrderDto 타입이 정의되어 있지 않음
const getSubscriptionOrderList = async (page: number, size: number): Promise<SubscriptionOrderData[]> => {
  const { data } = await axiosInstance.get(`/api/orders/subscribe?page=${page}&size=${size}`);
  return (
    data._embedded?.querySubscribeOrdersDtoList.map(({ subscribeOrderDto, ...rest }: { subscribeOrderDto: SubscriptionOrderDto }) => ({
      orderDto: subscribeOrderDto,
      ...rest,
    })) || []
  );
}

const getGeneralOrderList = async (page: number, size: number): Promise<GeneralOrderData[]> => {
  const { data } = await axiosInstance.get(`/api/orders/general?page=${page}&size=${size}`);
  return data._embedded?.queryGeneralOrdersDtoList || [];
}

const getOrderDetail = async (orderId: string, type: string): Promise<MergeOrderAndRecipe> => {
  const { data } = await axiosInstance.get(`/api/orders/${orderId}/${type}`);
  const mergeOrderAndRecipe: MergeOrderAndRecipe = {
      ...data,
      orderItemDtoList: data.orderItemDtoList ? [...data.orderItemDtoList] : [],
      orderDto: {
        ...data.orderDto,
        ...data.recipeDto
      },
      recipeDto: undefined
  }

  return mergeOrderAndRecipe || null;
}